import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth-card'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Sign in | Revs Freelancing',
  robots: { index: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <AuthCard title="Sign in" description="Admin access for Revs Freelancing.">
      <LoginForm
        initialError={
          error === 'link'
            ? 'That link is invalid or has expired. Ask for a new invite.'
            : undefined
        }
      />
    </AuthCard>
  )
}
