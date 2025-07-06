export const generateAuthUrl = async (): Promise<string> => {
  const authUrl = new URL(`${process.env.OKTA_ISSUER}/oauth2/v1/authorize`)
  
  authUrl.searchParams.set('client_id', process.env.OKTA_CLIENT_ID!)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'openid email profile groups')
  authUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/callback`)
  authUrl.searchParams.set('state', 'auth-state')
  
  return authUrl.toString()
}

export const handleCallback = async (code: string, state: string) => {
  // Exchange authorization code for tokens
  const tokenResponse = await fetch(`${process.env.OKTA_ISSUER}/oauth2/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.OKTA_CLIENT_ID}:${process.env.OKTA_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/callback`,
    }),
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Token exchange failed: ${errorText}`)
  }

  const tokens = await tokenResponse.json()

  // Get user info from Okta
  const userInfoResponse = await fetch(`${process.env.OKTA_ISSUER}/oauth2/v1/userinfo`, {
    headers: {
      'Authorization': `Bearer ${tokens.access_token}`,
    },
  })

  if (!userInfoResponse.ok) {
    const errorText = await userInfoResponse.text()
    throw new Error(`User info fetch failed: ${errorText}`)
  }

  const userInfo = await userInfoResponse.json()
  
  // Try to get groups from ID token if not in userInfo
  let groups = userInfo.groups || []
  
  if (groups.length === 0 && tokens.id_token) {
    try {
      // Decode ID token to check for groups claim
      const idTokenPayload = JSON.parse(Buffer.from(tokens.id_token.split('.')[1], 'base64').toString())
      console.log('ID Token payload:', idTokenPayload)
      groups = idTokenPayload.groups || []
    } catch (error) {
      console.error('Error decoding ID token:', error)
    }
  }
  
  return {
    userInfo: { ...userInfo, groups },
    tokens,
  }
}