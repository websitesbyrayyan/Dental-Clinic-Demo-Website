import { clinic } from "../../data/clinic";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

interface QuoteMarkProps {
  className?: string;
}

function QuoteMark({
  className = "",
}: QuoteMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 25C8 17 12 9 20 5V12C16 15 15 19 15 22H22V39H8V25ZM28 25C28 17 32 9 40 5V12C36 15 35 19 35 22H42V39H28V25Z" />
    </svg>
  );
}

export function Testimonials() {
  const { testimonials } = clinic;

  return (
    <Section
      id="testimonials"
      labelledBy="testimonials-heading"
      tone="warm"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={testimonials.eyebrow}
            title={testimonials.heading}
            align="center"
            id="testimonials-heading"
          />
        </Reveal>

        {/* Featured testimonial */}

        <Reveal>
          <article className="relative mx-auto mt-12 overflow-hidden rounded-3xl bg-forest p-8 text-warmwhite shadow-elevated focus-on-dark sm:p-12 lg:p-16">
            <QuoteMark className="mb-8 h-12 w-12 text-lightsage" />

            <blockquote>
              <p className="text-editorial text-2xl leading-relaxed text-warmwhite sm:text-3xl lg:text-4xl">
                “{testimonials.featured.quote}”
              </p>
            </blockquote>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-warmwhite/20 pt-7">
              <div>
                <p className="font-semibold text-warmwhite">
                  {testimonials.featured.name}
                </p>

                <p className="mt-1 text-sm text-lightsage">
                  {testimonials.featured.context}
                </p>
              </div>

              <span className="rounded-full border border-warmwhite/30 px-4 py-2 text-xs font-medium text-lightsage">
                {testimonials.featured.sampleLabel}
              </span>
            </div>
          </article>
        </Reveal>

        {/* Supporting testimonials */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 0.09}
            >
              <article className="flex h-full flex-col rounded-3xl border border-forest/10 bg-lightsage/50 p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
                <QuoteMark className="mb-5 h-8 w-8 text-sage" />

                <blockquote className="flex-1">
                  <p className="text-base leading-8 text-charcoal">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                <div className="mt-7 border-t border-forest/15 pt-5">
                  <p className="font-semibold text-forest">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs text-charcoal">
                    {testimonial.context}
                  </p>

                  <span className="mt-4 inline-block rounded-full bg-warmwhite px-3 py-2 text-xs font-medium text-forest">
                    {testimonial.sampleLabel}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}