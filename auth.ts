import NextAuth from "next-auth"
import Okta from "next-auth/providers/okta"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Okta({
      clientId: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      issuer: process.env.OKTA_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist Okta user info and groups in JWT
      if (account && profile) {
        token.oktaGroups = profile.groups || []
        token.oktaId = profile.sub
      }
      return token
    },
    async session({ session, token }) {
      // Make Okta groups available in session
      if (token.oktaGroups) {
        session.user.oktaGroups = token.oktaGroups
        session.user.oktaId = token.oktaId
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
})