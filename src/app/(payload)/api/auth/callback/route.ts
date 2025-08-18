import { NextRequest, NextResponse } from 'next/server'
import { handleCallback } from '@/lib/oidc'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!code || !state) {
      return NextResponse.redirect(new URL('/admin/login?error=missing_params', req.url))
    }

    // Exchange code for tokens and get user info
    const { userInfo } = await handleCallback(code, state)
    
    console.log('Okta user info:', userInfo)

    // Check if user is in "ConnieOne-Admins" group
    const groups = userInfo.groups || []
    const isConnieAdmin = groups.includes('ConnieOne-Admins')
    
    if (!isConnieAdmin) {
      console.error('User not in Connie Admins group:', groups)
      return NextResponse.redirect(new URL('/admin/login?error=unauthorized', req.url))
    }

    // Get Payload instance
    const payload = await getPayload({ config: configPromise })

    // Find or create user in Payload
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: { equals: userInfo.email as string },
      },
    })

    let user
    if (existingUser.docs.length === 0) {
      // Create new user
      user = await payload.create({
        collection: 'users',
        data: {
          email: userInfo.email as string,
          name: (userInfo.name || userInfo.preferred_username) as string,
          dataroomRole: 'admin',
          company: 'Connie',
          password: 'okta-managed', // Required by Payload auth but not used
        },
      })
      console.log('Created new user:', user.email)
    } else {
      user = existingUser.docs[0]
      console.log('Found existing user:', user.email)
    }

    // Use Payload's built-in login method with overrideAccess (without res to avoid type errors)
    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: user.email,
        password: 'okta-managed', // Required field but not validated due to overrideAccess
      },
      overrideAccess: true,
      req: {
        payload,
        user: null,
        headers: new Headers(),
        cookies: {},
      } as any,
    })

    console.log('Payload login successful for user:', user.email)
    console.log('Login result token exists:', !!loginResult.token)

    // Return an HTML page that sets the cookie and redirects
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Logging you in...</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>Authentication successful! Redirecting...</h2>
          <p>Please wait while we log you in...</p>
          <script>
            // Small delay to ensure cookie is processed, then redirect
            setTimeout(() => {
              window.location.href = '/admin';
            }, 500);
          </script>
        </body>
      </html>
    `

    // Create response and manually set the payload cookie
    const response = new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })

    // Manually set the payload-token cookie since we removed res from payload.login()
    if (loginResult.token) {
      response.cookies.set('payload-token', loginResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      })
    }

    return response

  } catch (error) {
    console.error('Authentication callback error:', error)
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', req.url))
  }
}