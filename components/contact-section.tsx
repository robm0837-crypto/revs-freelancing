'use client'

import { useActionState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const initialState: ContactState = { status: 'idle' }

export function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <h2
          id="contact-heading"
          className="font-serif text-3xl font-semibold text-balance sm:text-4xl"
        >
          Contact
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          {"Have a project in mind? Send a message and I'll get back to you."}
        </p>

        {state.status === 'success' ? (
          <div
            role="status"
            className="mt-8 flex items-start gap-3 rounded-lg border bg-card p-6"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="leading-relaxed">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} noValidate className="mt-8 space-y-5 rounded-lg border bg-card p-6 sm:p-8">
            {state.status === 'error' && state.message && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {state.message}
              </p>
            )}

            <Field id="name" label="Name" error={state.errors?.name}>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                className="h-12 text-base"
                aria-invalid={Boolean(state.errors?.name)}
                aria-describedby={state.errors?.name ? 'name-error' : undefined}
              />
            </Field>

            <Field id="email" label="Email" error={state.errors?.email}>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                className="h-12 text-base"
                aria-invalid={Boolean(state.errors?.email)}
                aria-describedby={state.errors?.email ? 'email-error' : undefined}
              />
            </Field>

            <Field id="message" label="Message" error={state.errors?.message}>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                maxLength={5000}
                className="min-h-36 text-base"
                aria-invalid={Boolean(state.errors?.message)}
                aria-describedby={state.errors?.message ? 'message-error' : undefined}
              />
            </Field>

            <Button type="submit" disabled={pending} className="h-12 w-full text-base sm:w-auto sm:px-8">
              {pending ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
