const stats = [
  { value: '45', label: 'Years of public service' },
  { value: '30+', label: 'Years in law enforcement' },
  { value: '10', label: 'Years in education' },
]

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 md:grid-cols-5 md:gap-14">
        <div className="md:col-span-3">
          <h2
            id="about-heading"
            className="font-serif text-3xl font-semibold text-balance sm:text-4xl"
          >
            About Rev
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              {"I'm Robert Martin — most people call me Rev. I've spent 45 years in public service, including more than 30 years in law enforcement and 10 years in education."}
            </p>
            <p>
              Today I work as a freelancer and AI trainer/evaluator, bringing
              the same dependability, attention to detail, and clear
              communication to every project I take on.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-3 md:col-span-2 md:grid-cols-1 md:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse justify-end gap-1 rounded-lg border bg-card p-4 text-center md:flex-row-reverse md:items-center md:justify-end md:gap-5 md:p-5 md:text-left"
            >
              <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">
                {stat.label}
              </dt>
              <dd className="font-serif text-3xl font-semibold text-primary sm:text-4xl md:w-20 md:shrink-0">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
