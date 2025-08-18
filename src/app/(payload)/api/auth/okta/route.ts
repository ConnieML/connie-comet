import { NextRequest, NextResponse } from 'next/server'
import { generateAuthUrl } from '@/lib/oidc'

export async function GET(req: NextRequest) {
  try {
    const authUrl = await generateAuthUrl()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error generating auth URL:', error)
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', req.url))
  }
}