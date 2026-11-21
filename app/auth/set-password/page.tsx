import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthCard } from '@/components/auth-card'
import { SetPasswordForm } from '@/components/set-password-form'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Set your password | Revs Freelancing',
  robots: { index: false },
}

export const dynamic = 'force-dynamic'

export default async function SetPasswordPage() {
  const supabase = await createClient()
  if (!supabase) redirect('/login')

  // Only reachable after clicking a valid invite link.
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login?error=link')

  return (
    <AuthCard
      title="Welcome. Set your password"
      description={`Signing in as ${user.email}.`}
    >
      <SetPasswordForm />
    </AuthCard>
  )
}
