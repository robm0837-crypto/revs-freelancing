'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { validateContact, type ContactState } from '@/lib/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
// Web3Forms access keys are designed to be public; submissions must come from the browser on the free plan.
const WEB3FORMS_ACCESS_KEY = '2de5c55e-b324-45cf-b4a1-596ecbb3bf90'

export function ContactSection() {
  const [state, setState] = useState<ContactState>({ status: 'idle' })
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    }

    const errors = validateContact(values)
    if (Object.keys(errors).length > 0) {
      setState({ status: 'error', errors, message: 'Please fix the fields below.' })
      return
    }

    setPending(true)
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${values.name} via Revs Freelancing`,
          from_name: 'Revs Freelancing Website',
          replyto: values.email,
          botcheck: formData.get('botcheck') === 'on',
          ...values,
        }),
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null

      if (!response.ok || !result?.success) {
        setState({
          status: 'error',
          message: 'Sorry, your message could not be sent. Please try again in a moment.',
        })
        return
      }

      setState({
        status: 'success',
        message: `Thanks, ${values.name}! Your message has been sent. Rev will get back to you soon.`,
      })
    } catch {
      setState({
        status: 'error',
        message: 'Sorry, your message could not be sent. Please check your connection and try again.',
      })
    } finally {
      setPending(false)
    }
  }

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
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5 rounded-lg border bg-card p-6 sm:p-8">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
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
