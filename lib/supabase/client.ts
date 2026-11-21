import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv } from './env'

// Browser-side Supabase client. Returns null if Supabase is not configured.
export function createClient() {
  const env = getSupabaseEnv()
  if (!env) return null
  return createBrowserClient(env.url, env.key)
}
