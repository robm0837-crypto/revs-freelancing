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

  // Only admins can read messages (enforced in the database, not just here).
  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('id, created_at, name, email, message')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <AuthCard
      wide
      title="Inbox"
      description={`Signed in as ${user.email}. Messages from your contact form, newest first.`}
    >
      {error ? (
        <p role="alert" className="mb-6 text-sm text-destructive">
          Could not load messages. The inbox database script may not have been run yet.
        </p>
      ) : !messages || messages.length === 0 ? (
        <p className="mb-6 text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <ul className="mb-8 space-y-4">
          {messages.map((m) => (
            <li key={m.id} className="rounded-lg border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-medium">{m.name}</p>
                <time
                  dateTime={m.created_at}
                  className="text-xs text-muted-foreground"
                >
                  {new Date(m.created_at).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: 'America/Chicago',
                  })}
                </time>
              </div>
              <a
                href={`mailto:${encodeURIComponent(m.email).replace('%40', '@')}`}
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {m.email}
              </a>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
      <SignOutButton />
    </AuthCard>
  )
}
