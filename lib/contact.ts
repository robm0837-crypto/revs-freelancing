export type ContactFields = 'name' | 'email' | 'message'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<ContactFields, string>>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(values: Record<ContactFields, string>) {
  const errors: Partial<Record<ContactFields, string>> = {}
  if (!values.name) errors.name = 'Please enter your name.'
  else if (values.name.length > 100) errors.name = 'Name is too long.'
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > 254)
    errors.email = 'Please enter a valid email address.'
  if (values.message.length < 10)
    errors.message = 'Please write a message of at least 10 characters.'
  else if (values.message.length > 5000) errors.message = 'Message is too long.'
  return errors
}
