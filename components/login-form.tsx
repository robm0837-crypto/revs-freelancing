'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

export function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(initialError)
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(undefined)

    const supabase = createClient()
    if (!supabase) {
      setError('Login is not set up yet.')
      return
    }

    const form = new FormData(event.currentTarget)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get('email') ?? '').trim(),
      password: String(form.get('password') ?? ''),
    })
    setLoading(false)

    if (error) {
      setError('That email or password did not work.')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
