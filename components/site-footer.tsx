import { Lock } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="inline-flex items-center gap-2">
          <Lock className="size-4 shrink-0" aria-hidden="true" />
          Coming soon: Member board for approved members.
        </p>
        <p>
          {'© '}
          {new Date().getFullYear()} Revs Freelancing · Texas
        </p>
      </div>
    </footer>
  )
}
