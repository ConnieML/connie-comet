import { NextResponse } from 'next/server'

// Connie sales webchat availability endpoint.
//
// Currently runs in "always-available" mode — the widget opens unconditionally.
// If no agent is on shift when a visitor submits the pre-engagement form,
// Twilio's own Studio Flow fallback handles the hand-off (e.g. offline message).
//
// To upgrade to a real TaskRouter-backed check, replace the body with a call
// to the Twilio REST API that queries the sales TaskQueue
// (WQ22cad65afd5e3f2e8649e4d88e0de49b) for Workers with Activity=Available.
// That path requires TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN env vars set
// server-side in Amplify — do NOT use NEXT_PUBLIC_* for auth-bearing secrets.
export async function POST() {
  return NextResponse.json({ available: true, agentCount: 1 })
}

// Some monitoring/debug tools hit the endpoint with GET — respond the same way
// so it's obvious from curl that the route is live.
export async function GET() {
  return NextResponse.json({ available: true, agentCount: 1 })
}
