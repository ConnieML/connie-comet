import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  // Protect admin routes
  if (nextUrl.pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return Response.redirect(new URL('/auth/signin', nextUrl))
    }
    
    // Check if user is in "Connie Admins" group
    const userGroups = req.auth?.user?.oktaGroups || []
    const isAdmin = userGroups.includes('Connie Admins')
    
    if (!isAdmin) {
      return Response.redirect(new URL('/auth/unauthorized', nextUrl))
    }
  }

  // Protect dataroom routes
  if (nextUrl.pathname.startsWith('/dataroom')) {
    if (!isAuthenticated) {
      return Response.redirect(new URL('/auth/signin', nextUrl))
    }
    
    // For now, allow all authenticated users to access dataroom
    // Later we can add specific group checking
  }
})

export const config = {
  matcher: ['/admin/:path*', '/dataroom/:path*']
}