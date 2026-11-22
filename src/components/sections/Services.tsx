import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";

import type { Treatment } from "../../types/clinic";

import { clinic } from "../../data/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { TreatmentIcons } from "../graphics/TreatmentIcons";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Marquee } from "../ui/Marquee";

interface ServicesProps {
  onSelectTreatment: (treatmentId: string) => void;
}

export function Services({
  onSelectTreatment,
}: ServicesProps) {
  const reducedMotion = usePrefersReducedMotion();

  const { services } = clinic;

  function handleTreatmentSelection(
    treatment: Treatment,
  ): void {
    onSelectTreatment(treatment.id);

    document.getElementById("contact")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <Section
      id="services"
      labelledBy="services-heading"
      tone="warm"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={services.eyebrow}
            title={services.heading}
            description={services.description}
            id="services-heading"
          />
        </Reveal>

        {/* Treatment cards */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((treatment, index) => (
            <Reveal
              key={treatment.id}
              delay={(index % 4) * 0.07}
            >
              <motion.article
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -7,
                      }
                }
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="group flex h-full min-h-[290px] flex-col rounded-3xl border border-forest/10 bg-lightsage p-6 shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-7"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-warmwhite/75 text-forest transition-colors duration-300 group-hover:bg-warmwhite">
                  <TreatmentIcons
                    name={treatment.icon}
                    className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-editorial text-xl leading-snug text-forest sm:text-2xl">
                  {treatment.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-charcoal">
                  {treatment.description}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleTreatmentSelection(treatment)
                  }
                  className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-charcoal focus-visible:rounded-md"
                >
                  {services.askAboutLabel}

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Treatment marquee */}

        <div className="mt-20">
          <div className="mb-6 flex items-center gap-3">
            <span
              className="decorative-line"
              aria-hidden="true"
            />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest">
              {services.marqueeLabel}
            </p>
          </div>

          <Marquee
            items={services.marqueeItems}
          />
        </div>
      </Container>
    </Section>
  );
}