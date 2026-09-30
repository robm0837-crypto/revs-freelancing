'use server'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const errors: ContactState['errors'] = {}
  if (!name) errors.name = 'Please enter your name.'
  else if (name.length > 100) errors.name = 'Name is too long.'
  if (!EMAIL_PATTERN.test(email) || email.length > 254)
    errors.email = 'Please enter a valid email address.'
  if (message.length < 10)
    errors.message = 'Please write a message of at least 10 characters.'
  else if (message.length > 5000) errors.message = 'Message is too long.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, message: 'Please fix the fields below.' }
  }

  // TODO: deliver the message (e.g. via Resend email or save to a database).

  return {
    status: 'success',
    message: `Thanks, ${name}! Your message has been sent. Rev will get back to you soon.`,
  }
}
