import { BookOpen, Bot, Handshake, PenLine } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'AI training and evaluation',
    description:
      'Careful, consistent review of AI responses for accuracy, clarity, and safety, with thoughtful feedback that helps models improve.',
  },
  {
    icon: PenLine,
    title: 'Writing and editing',
    description:
      'Clear, well-organized writing and thorough editing for reports, articles, letters, and everyday business documents.',
  },
  {
    icon: BookOpen,
    title: 'English tutoring',
    description:
      'Patient, one-on-one help with reading, writing, grammar, and conversation, drawing on a decade in education.',
  },
  {
    icon: Handshake,
    title: 'Consulting',
    description:
      'Practical advice grounded in decades of public service, from procedures and training to communication and planning.',
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-y bg-secondary py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2
          id="services-heading"
          className="font-serif text-3xl font-semibold text-balance sm:text-4xl"
        >
          Services
        </h2>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Dependable support across a range of projects.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col rounded-lg border bg-card p-6 shadow-sm sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <service.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
