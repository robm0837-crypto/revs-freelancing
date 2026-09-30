import { Briefcase, Building2, Church, ExternalLink } from 'lucide-react'

const servers = [
  {
    icon: Briefcase,
    title: "Rev's Freelancing Hub",
    description:
      'A community for freelancers to share tips, platforms, and support.',
    link: { href: 'https://discord.gg/dtXtNxB62', label: 'Join the Hub' },
  },
  {
    icon: Church,
    title: 'Grace Community Hub',
    description: 'Example server for a church community.',
  },
  {
    icon: Building2,
    title: 'Lakewood Chamber of Commerce',
    description: 'Example server for a local business group.',
  },
]

export function ServersSection() {
  return (
    <section
      id="discord"
      aria-labelledby="servers-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2
          id="servers-heading"
          className="font-serif text-3xl font-semibold text-balance sm:text-4xl"
        >
          {"Servers I've Built"}
        </h2>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          A look at Discord communities set up for different groups.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {servers.map((server) => (
            <li
              key={server.title}
              className="flex flex-col rounded-lg border bg-card p-6 shadow-sm sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <server.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{server.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {server.description}
              </p>
              {server.link && (
                <a
                  href={server.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-11 items-center justify-center gap-2 self-start rounded-md bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  {server.link.label}
                  <ExternalLink className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
