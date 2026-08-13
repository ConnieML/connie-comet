// F17 — multi-dimension lead dedupe for the Testing Partner Intake pipeline (S25).
//
// Confidence tiers (asymmetric on purpose — a false FLAG costs staff ten
// seconds; a false MERGE pollutes a real prospect's record):
//   email exact            → append (highest confidence)
//   phone digits exact     → append
//   org name normalized    → append, marked "verify same organization"
//   org name fuzzy-similar → NEVER merges; new lead flagged "possible duplicate"
// Priority when dimensions disagree: email > phone > org name.

export type PPLead = {
  id: string
  name?: string | null
  title?: string | null
  company?: string | null
  email?: string | null
  phonenumber?: string | null
  website?: string | null
  source?: string | null
  status?: string | null
  assigned?: string | null
  description?: string | null
  dateadded?: string | null
}

export type DedupeResult =
  | { mode: 'append'; lead: PPLead; matchedBy: 'email' | 'phone' | 'org name'; others: string[] }
  | { mode: 'flag'; possibles: PPLead[] }
  | { mode: 'none' }

const normEmail = (v: unknown): string => String(v ?? '').trim().toLowerCase()

export const normPhone = (v: unknown): string => {
  let d = String(v ?? '').replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1)
  return d.length === 10 ? d : '' // only compare full 10-digit numbers
}

const ORG_SUFFIXES =
  /\b(inc|incorporated|llc|ltd|corp|corporation|foundation|fdn|nonprofit|non-profit|org|organization|the)\b/g

export const normOrg = (v: unknown): string =>
  String(v ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(ORG_SUFFIXES, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Token-overlap similarity for the advisory (flag-only) tier.
const orgSimilar = (a: string, b: string): boolean => {
  if (!a || !b) return false
  const ta = new Set(a.split(' ').filter((t) => t.length > 2))
  const tb = new Set(b.split(' ').filter((t) => t.length > 2))
  if (ta.size === 0 || tb.size === 0) return false
  let shared = 0
  for (const t of ta) if (tb.has(t)) shared++
  return shared / Math.min(ta.size, tb.size) >= 0.6
}

const newestFirst = (leads: PPLead[]): PPLead[] =>
  [...leads].sort((a, b) => String(b.dateadded ?? '').localeCompare(String(a.dateadded ?? '')))

export const findDuplicate = (
  leads: PPLead[],
  submission: { email: string; phone: string; orgName: string },
): DedupeResult => {
  const email = normEmail(submission.email)
  const phone = normPhone(submission.phone)
  const org = normOrg(submission.orgName)

  const byEmail = leads.filter((l) => email && normEmail(l.email) === email)
  const byPhone = leads.filter((l) => phone && normPhone(l.phonenumber) === phone)
  const byOrg = leads.filter((l) => org && normOrg(l.company) === org)

  for (const [matchedBy, matches] of [
    ['email', byEmail],
    ['phone', byPhone],
    ['org name', byOrg],
  ] as const) {
    if (matches.length > 0) {
      const sorted = newestFirst(matches)
      return {
        mode: 'append',
        lead: sorted[0],
        matchedBy,
        others: sorted.slice(1).map((l) => l.id),
      }
    }
  }

  const fuzzy = newestFirst(leads.filter((l) => orgSimilar(org, normOrg(l.company)))).slice(0, 3)
  if (fuzzy.length > 0) return { mode: 'flag', possibles: fuzzy }

  return { mode: 'none' }
}
