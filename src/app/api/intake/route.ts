import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from 'payload'
import config from '@payload-config'
import ConnieIntakeConfirmation from '../../../../emails/templates/connie-intake-confirmation'
import ConnieIntakeInternalNotification from '../../../../emails/templates/connie-intake-internal-notification'
import { buildEmailSections, buildPPLeadDescription } from './format'
import { findDuplicate, type PPLead } from './dedupe'

// ---------------------------------------------------------------------------
// Testing Partner Intake Form V2 submission pipeline (S25).
// Order is load-bearing (QA LB1 — "a submission is never lost"):
//   1. spam gate  2. validate  3. DURABLE STORE (Payload)  4. PP lead (retry
//   once, failure recorded, never fatal)  5. respondent confirmation
//   6. internal notification (incl. CareTeam task address)
// Everything after step 3 degrades gracefully: the submission always survives.
// ---------------------------------------------------------------------------

const PP_API_BASE = 'https://connie.peopleperson.app/api'
const PP_LEAD_SOURCE = '4' // "Web to lead" style source used by existing form leads
const PP_LEAD_STATUS = '2' // matches existing inbound web-form leads
const INTERNAL_RECIPIENTS = [
  'cberno@nevadaseniorservices.org',
  'admin@connie.direct',
  'careteam@connie.support', // P2 — creates the CareTeam Flex task via the email channel
]

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

const getPPToken = (): string | null => {
  const t = process.env.PP_API_TOKEN
  if (!t || t === 'default' || t.length < 20) return null
  return t
}

// Best-effort per-instance rate limit (serverless instances each keep their own
// window — the honeypot is the primary abuse gate, this is a backstop).
const rateWindow = new Map<string, { count: number; start: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

const rateLimited = (ip: string): boolean => {
  const now = Date.now()
  const entry = rateWindow.get(ip)
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateWindow.set(ip, { count: 1, start: now })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const makeRefNumber = (): string => {
  const d = new Date()
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(
    d.getUTCDate(),
  ).padStart(2, '0')}`
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // no 0/O/1/I/L ambiguity
  let suffix = ''
  for (let i = 0; i < 3; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `UAT-${ymd}-${suffix}`
}

const createPPLead = async (
  token: string,
  formData: Record<string, unknown>,
  refNumber: string,
  flagNote?: string,
): Promise<{ leadId: string }> => {
  const description = (flagNote ? `${flagNote}\n` : '') + buildPPLeadDescription(formData, refNumber)
  const body = new URLSearchParams({
    name: String(formData.contactName || ''),
    title: String(formData.contactTitle || ''),
    company: String(formData.orgName || ''),
    email: String(formData.email || ''),
    phonenumber: String(formData.phone || ''),
    website: String(formData.websiteUrl || ''),
    source: PP_LEAD_SOURCE,
    status: PP_LEAD_STATUS,
    assigned: '1',
    description,
  })
  const res = await fetch(`${PP_API_BASE}/leads`, {
    method: 'POST',
    headers: { authtoken: token, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const json = (await res.json()) as { status?: boolean; message?: string; record_id?: number }
  if (!res.ok || !json.status || !json.record_id) {
    throw new Error(`PP lead create failed (HTTP ${res.status}): ${json.message || 'unknown'}`)
  }
  return { leadId: String(json.record_id) }
}

// F17 — fetch the lead book once per submission (~340 rows) for dedupe matching.
const fetchPPLeads = async (token: string): Promise<PPLead[]> => {
  const res = await fetch(`${PP_API_BASE}/leads`, { headers: { authtoken: token } })
  if (!res.ok) throw new Error(`PP leads fetch failed (HTTP ${res.status})`)
  const json = await res.json()
  return Array.isArray(json) ? (json as PPLead[]) : []
}

// F17 — append a follow-up intake to an existing lead (partial PUT: description
// only, other fields untouched — validated against the live API 2026-08-04).
const appendToPPLead = async (
  token: string,
  lead: PPLead,
  formData: Record<string, unknown>,
  refNumber: string,
  matchedBy: string,
  others: string[],
): Promise<void> => {
  const stamp = new Date().toISOString().slice(0, 10)
  const verifyNote =
    matchedBy === 'org name'
      ? ' — matched by org name, <strong>verify same organization</strong>'
      : ''
  const othersNote = others.length
    ? `<p><em>Same ${matchedBy} also on lead(s) #${others.join(', #')}.</em></p>`
    : ''
  const appended =
    `${lead.description || ''}\n<hr>` +
    `<p><strong>FOLLOW-UP: Testing Partner Intake ${refNumber}</strong> (${stamp}, matched by ${matchedBy}${verifyNote})</p>` +
    othersNote +
    buildPPLeadDescription(formData, refNumber)
  const body = new URLSearchParams({ description: appended })
  const res = await fetch(`${PP_API_BASE}/leads/${lead.id}`, {
    method: 'PUT',
    headers: { authtoken: token, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const json = (await res.json()) as { status?: boolean; message?: string }
  if (!res.ok || !json.status) {
    throw new Error(`PP lead append failed (HTTP ${res.status}): ${json.message || 'unknown'}`)
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // --- 1. Spam gates (F14) -------------------------------------------------
    // Honeypot: hidden "companyWebsiteConfirm" field — humans never see it.
    // Tripped → return a fake success and do NOTHING (LB5: no email, no record,
    // no lead).
    if (typeof formData.companyWebsiteConfirm === 'string' && formData.companyWebsiteConfirm !== '') {
      return NextResponse.json({ success: true, refNumber: makeRefNumber() })
    }
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    // --- 2. Validation (F11 server side) ------------------------------------
    if (!formData.orgName || !formData.contactName) {
      return NextResponse.json({ error: 'Organization and contact name are required.' }, { status: 400 })
    }
    if (!formData.email || !EMAIL_RE.test(String(formData.email))) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    // --- 3. Durable store (Payload) — the submission survives from here -----
    const payload = await getPayload({ config })

    let refNumber = makeRefNumber()
    for (let attempt = 0; attempt < 3; attempt++) {
      const existing = await payload.find({
        collection: 'uat-submissions',
        where: { refNumber: { equals: refNumber } },
        limit: 1,
      })
      if (existing.totalDocs === 0) break
      refNumber = makeRefNumber()
    }

    const record = await payload.create({
      collection: 'uat-submissions',
      data: {
        refNumber,
        orgName: String(formData.orgName),
        contactName: String(formData.contactName),
        email: String(formData.email),
        phone: String(formData.phone || ''),
        ppSyncStatus: 'skipped',
        data: formData,
      },
    })

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://connie.one'
    const payloadAdminUrl = `${serverUrl}/admin/collections/uat-submissions/${record.id}`

    // --- 4. PP lead (front door) — never fatal, one in-request retry --------
    // F17: multi-dimension dedupe first. email/phone/org-normalized match →
    // APPEND to the existing lead; fuzzy org similarity → NEW lead flagged
    // "possible duplicate" (advisory only, never auto-merged).
    let ppLeadId: string | undefined
    let ppSyncStatus: 'synced' | 'failed' | 'skipped' = 'skipped'
    let ppSyncError: string | undefined
    let ppDedupeNote: string | undefined
    const ppToken = getPPToken()
    if (ppToken) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          let dedupe: ReturnType<typeof findDuplicate> = { mode: 'none' }
          try {
            dedupe = findDuplicate(await fetchPPLeads(ppToken), {
              email: String(formData.email || ''),
              phone: String(formData.phone || ''),
              orgName: String(formData.orgName || ''),
            })
          } catch (fetchErr) {
            // Dedupe is best-effort: if the lead book can't be read, fall back
            // to plain create rather than losing the lead entirely.
            console.error('[intake] PP dedupe fetch failed, falling back to create:', fetchErr)
          }

          if (dedupe.mode === 'append') {
            await appendToPPLead(ppToken, dedupe.lead, formData, refNumber, dedupe.matchedBy, dedupe.others)
            ppLeadId = dedupe.lead.id
            ppDedupeNote = `follow-up appended to existing lead #${dedupe.lead.id} (matched by ${dedupe.matchedBy})`
          } else if (dedupe.mode === 'flag') {
            const ids = dedupe.possibles.map((l) => `#${l.id}`).join(', ')
            const { leadId } = await createPPLead(
              ppToken,
              formData,
              refNumber,
              `<p><strong>⚠ Possible duplicate</strong> — similar org name on lead(s) ${ids}. Please review and merge manually if same organization.</p>`,
            )
            ppLeadId = leadId
            ppDedupeNote = `new lead; possible duplicate of ${ids} (similar org name — review manually)`
          } else {
            const { leadId } = await createPPLead(ppToken, formData, refNumber)
            ppLeadId = leadId
          }
          ppSyncStatus = 'synced'
          break
        } catch (e) {
          ppSyncStatus = 'failed'
          ppSyncError = e instanceof Error ? e.message : 'Unknown PP error'
          console.error(`[intake] PP lead sync attempt ${attempt + 1} failed:`, ppSyncError)
        }
      }
    } else {
      console.error('[intake] PP_API_TOKEN not configured — PP sync skipped')
    }

    // --- 5 + 6. Emails — failures recorded, never fatal ---------------------
    const submittedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    })
    let confirmationSent = false
    let internalNotified = false

    try {
      const resend = getResendClient()

      const { error: confirmErr } = await resend.emails.send({
        from: 'Connie Team <intake@connie.one>',
        to: [String(formData.email)],
        replyTo: 'support@connie.team',
        subject: `Your Connie Testing Partner application — ${refNumber}`,
        react: ConnieIntakeConfirmation({
          refNumber,
          contactName: String(formData.contactName),
          orgName: String(formData.orgName),
          submittedAt,
          sections: buildEmailSections(formData),
        }),
      })
      if (confirmErr) {
        console.error('[intake] confirmation email failed:', confirmErr.name, confirmErr.message)
      } else {
        confirmationSent = true
      }

      const ppLeadUrl = ppLeadId
        ? `https://connie.peopleperson.app/admin/leads/index/${ppLeadId}`
        : undefined
      const { error: internalErr } = await resend.emails.send({
        from: 'Connie Intake <intake@connie.one>',
        to: INTERNAL_RECIPIENTS,
        subject:
          `New Testing Partner Intake — ${formData.orgName} (${refNumber})` +
          (ppDedupeNote ? ` — ${ppDedupeNote}` : ''),
        react: ConnieIntakeInternalNotification({
          refNumber,
          orgName: String(formData.orgName),
          contactName: String(formData.contactName),
          email: String(formData.email),
          phone: String(formData.phone || ''),
          submittedAt,
          ppLeadUrl,
          ppSyncStatus: ppSyncStatus === 'synced' ? 'synced' : 'failed',
          payloadAdminUrl,
        }),
      })
      if (internalErr) {
        console.error('[intake] internal notification failed:', internalErr.name, internalErr.message)
      } else {
        internalNotified = true
      }
    } catch (emailError) {
      console.error('[intake] email pipeline threw (record saved):', emailError)
    }

    // --- Record the outcome flags on the stored submission ------------------
    try {
      await payload.update({
        collection: 'uat-submissions',
        id: record.id,
        data: { ppLeadId, ppSyncStatus, ppSyncError, ppDedupeNote, confirmationSent, internalNotified },
      })
    } catch (updateErr) {
      console.error('[intake] outcome-flag update failed (record saved):', updateErr)
    }

    return NextResponse.json({
      success: true,
      refNumber,
      notified: internalNotified,
      confirmationSent,
      ppSyncStatus,
    })
  } catch (error) {
    console.error('[intake] submission failed:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
