import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthCard } from '@/components/auth-card'
import { SignOutButton } from '@/components/sign-out-button'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Admin | Revs Freelancing',
  robots: { index: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  if (!supabase) {
    return (
      <AuthCard
        title="Admin"
        description="Login is not set up yet. Add the Supabase settings to this site and try again."
      >
        <></>
      </AuthCard>
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // The role lives in the profiles table, which people cannot edit themselves.
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return (
      <AuthCard
        title="No admin access"
        description={`${user.email} is signed in, but is not an administrator.`}
      >
        <SignOutButton />
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Admin"
      description={`Signed in as ${user.email}. You are an administrator.`}
    >
      <p className="mb-6 text-sm text-muted-foreground">
        This is the starting point for the admin area. CRM tools can be added here.
      </p>
      <SignOutButton />
    </AuthCard>
  )
}
