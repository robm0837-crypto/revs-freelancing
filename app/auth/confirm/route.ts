import type { EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Invite / password-reset emails link here. We verify the one-time token,
// which signs the person in, then send them on.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  // Invites and recovery links go to "set password"; anything else to /admin.
  const next =
    type === 'invite' || type === 'recovery' ? '/auth/set-password' : '/admin'

  const supabase = await createClient()
  if (supabase && tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    })
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/login?error=link`)
}
