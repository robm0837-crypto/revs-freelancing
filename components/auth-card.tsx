import Link from 'next/link'

export function AuthCard({
  title,
  description,
  children,
  wide = false,
}: {
  title: string
  description?: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <main className="flex min-h-screen flex-col bg-muted/40">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="font-serif text-lg font-semibold">
            Revs Freelancing
          </Link>
        </div>
      </header>
      <div
        className={`mx-auto flex w-full flex-1 flex-col px-5 py-12 ${
          wide ? 'max-w-3xl' : 'max-w-md justify-center'
        }`}
      >
        <div className="rounded-xl border bg-background p-6 shadow-sm sm:p-8">
          <h1 className="font-serif text-2xl font-semibold">{title}</h1>
          {description ? (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          ) : null}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  )
}
