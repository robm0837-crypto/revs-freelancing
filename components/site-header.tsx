const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-5xl px-5 py-4 sm:px-8">
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <a href="#top" className="font-serif text-lg font-semibold">
            Revs Freelancing
          </a>
          <ul className="flex gap-5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-primary-foreground/80 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div id="top" className="mx-auto max-w-5xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <p className="text-sm font-medium tracking-widest text-accent uppercase">
          Texas-based freelancer
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-balance sm:text-6xl">
          Revs Freelancing
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-primary-foreground/85 sm:text-xl">
          Experienced, reliable help for your projects.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#services"
            className="inline-flex h-12 items-center justify-center rounded-md border border-primary-foreground/30 px-6 font-medium transition-colors hover:bg-primary-foreground/10"
          >
            View services
          </a>
        </div>
      </div>
    </header>
  )
}
