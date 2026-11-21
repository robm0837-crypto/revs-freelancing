import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
  return updateSession(request)
}

// Only the login/admin routes need session handling. The public site is untouched.
export const config = {
  matcher: ['/admin/:path*', '/login', '/auth/:path*'],
}
