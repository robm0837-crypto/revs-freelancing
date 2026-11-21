import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseEnv } from './env'

// Server-side Supabase client (server components, route handlers).
// Returns null if Supabase is not configured.
export async function createClient() {
  const env = getSupabaseEnv()
  if (!env) return null

  const cookieStore = await cookies()

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Called from a server component, where cookies are read-only.
          // The proxy refreshes the session, so this is safe to ignore.
        }
      },
    },
  })
}
