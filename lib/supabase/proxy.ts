import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabaseEnv } from './env'

// Keeps the Supabase login session fresh on every matched request.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const env = getSupabaseEnv()
  if (!env) return response

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        )
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  // Validates the session with Supabase and refreshes it if needed.
  await supabase.auth.getUser()

  return response
}
