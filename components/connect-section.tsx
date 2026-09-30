import { ExternalLink, MessagesSquare } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

function GitHubLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

type ConnectLink = {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  featured?: boolean
}

const links: ConnectLink[] = [
  { href: 'https://x.com/martin185203', label: 'X (Twitter)', icon: XLogo },
  {
    href: 'https://robm0837.github.io',
    label: 'Portfolio (GitHub)',
    icon: GitHubLogo,
  },
  {
    href: 'https://discord.gg/dtXtNxB62',
    label: "Join Rev's Freelancing Hub",
    icon: MessagesSquare,
    featured: true,
  },
]

export function ConnectSection() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="border-t py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2
          id="connect-heading"
          className="font-serif text-3xl font-semibold text-balance sm:text-4xl"
        >
          Connect
        </h2>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Follow along, see past work, or join the community.
        </p>

        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.featured
                    ? 'inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto'
                    : 'inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto'
                }
              >
                <link.icon className="size-5" aria-hidden="true" />
                {link.label}
                <ExternalLink className="size-4 opacity-70" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
