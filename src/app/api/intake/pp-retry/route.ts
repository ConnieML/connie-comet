import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { buildPPLeadDescription } from '../format'

// Re-push failed PP lead syncs (S25 LB1 recovery path).
// POST /api/intake/pp-retry  { refNumber?: string }
// Guarded by the PP token itself as a shared secret (x-retry-key header) —
// operators who can retry already hold the PP credential.

const PP_API_BASE = 'https://connie.peopleperson.app/api'

export async function POST(request: Request) {
  const token = process.env.PP_API_TOKEN
  if (!token || token === 'default' || token.length < 20) {
    return NextResponse.json({ error: 'PP not configured' }, { status: 503 })
  }
  if (request.headers.get('x-retry-key') !== token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const payload = await getPayload({ config })

    const where: import('payload').Where = body.refNumber
      ? { and: [{ refNumber: { equals: body.refNumber } }, { ppSyncStatus: { not_equals: 'synced' } }] }
      : { ppSyncStatus: { equals: 'failed' } }

    const pending = await payload.find({ collection: 'uat-submissions', where, limit: 20 })

    const results: Array<{ refNumber: string; outcome: string; ppLeadId?: string }> = []
    for (const doc of pending.docs) {
      const formData = (doc.data ?? {}) as Record<string, unknown>
      try {
        const params = new URLSearchParams({
          name: String(doc.contactName || ''),
          company: String(doc.orgName || ''),
          email: String(doc.email || ''),
          phonenumber: String(doc.phone || ''),
          source: '4',
          status: '2',
          assigned: '1',
          description: buildPPLeadDescription(formData, doc.refNumber),
        })
        const res = await fetch(`${PP_API_BASE}/leads`, {
          method: 'POST',
          headers: { authtoken: token, 'User-Agent': 'Mozilla/5.0 (compatible; ConnieIntake/1.0; +https://connie.one)', 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        })
        const json = (await res.json()) as { status?: boolean; message?: string; record_id?: number }
        if (!res.ok || !json.status || !json.record_id) {
          throw new Error(`HTTP ${res.status}: ${json.message || 'unknown'}`)
        }
        await payload.update({
          collection: 'uat-submissions',
          id: doc.id,
          data: { ppLeadId: String(json.record_id), ppSyncStatus: 'synced', ppSyncError: '' },
        })
        results.push({ refNumber: doc.refNumber, outcome: 'synced', ppLeadId: String(json.record_id) })
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown error'
        await payload.update({
          collection: 'uat-submissions',
          id: doc.id,
          data: { ppSyncStatus: 'failed', ppSyncError: msg },
        })
        results.push({ refNumber: doc.refNumber, outcome: `failed: ${msg}` })
      }
    }

    return NextResponse.json({ retried: results.length, results })
  } catch (error) {
    console.error('[intake/pp-retry] failed:', error)
    return NextResponse.json({ error: 'Retry failed' }, { status: 500 })
  }
}
