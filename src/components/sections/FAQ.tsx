import type { AccordionItem } from "../../types/clinic";

import { clinic } from "../../data/clinic";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Accordion } from "../ui/Accordion";

export function FAQ() {
  const { faqs } = clinic;

  const accordionItems: AccordionItem[] =
    faqs.items.map((item) => ({
      id: item.id,
      title: item.question,
      content: item.answer,
    }));

  return (
    <Section
      id="faq"
      labelledBy="faq-heading"
      tone="warm"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Heading */}

          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={faqs.eyebrow}
                title={faqs.heading}
                description={faqs.description}
                id="faq-heading"
              />

              <a
                href="#contact"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest underline decoration-sage underline-offset-8 transition-colors hover:text-charcoal"
              >
                Have another question?

                <span aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </Reveal>

          {/* FAQ accordion */}

          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-forest/10 bg-lightsage/40 px-5 py-3 sm:px-8 sm:py-5">
              <Accordion
                items={accordionItems}
                label="Frequently asked questions"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}