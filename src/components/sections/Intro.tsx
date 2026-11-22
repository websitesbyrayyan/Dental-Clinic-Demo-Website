import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";

import { clinic } from "../../data/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { LeafLine } from "../graphics/LeafLine";
import { OrganicBlob } from "../graphics/OrganicBlob";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

export function Intro() {
  const reducedMotion = usePrefersReducedMotion();

  const { intro } = clinic;

  return (
    <Section
      id="about"
      labelledBy="about-heading"
      tone="sage"
      className="overflow-hidden"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image composition */}

          <div className="relative mx-auto w-full max-w-[520px]">
            <OrganicBlob className="absolute -left-16 -top-12 h-64 w-64 opacity-70" />

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      clipPath: "inset(0 0 100% 0 round 28px)",
                    }
              }
              whileInView={
                reducedMotion
                  ? undefined
                  : {
                      clipPath: "inset(0 0 0% 0 round 28px)",
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.9,
                ease: "easeInOut",
              }}
              className="relative z-10 overflow-hidden rounded-3xl"
            >
              <SmartImage
                image={clinic.images[intro.image]}
                shape="rounded"
                className="shadow-elevated"
              />
            </motion.div>

            <LeafLine className="absolute -bottom-16 -right-12 z-20 h-48 w-48 text-sage opacity-70 sm:h-60 sm:w-60" />

            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 z-0 h-32 w-32 rounded-3xl border border-forest/20"
            />
          </div>

          {/* Text content */}

          <div className="relative">
            <Reveal>
              <SectionHeading
                eyebrow={intro.eyebrow}
                title={intro.heading}
                description={intro.paragraph}
                id="about-heading"
              />
            </Reveal>

            <div className="mt-10 space-y-7">
              {intro.principles.map((principle, index) => (
                <Reveal
                  key={principle.id}
                  delay={index * 0.1}
                >
                  <div className="flex gap-5 border-b border-forest/15 pb-6 last:border-b-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/25 font-serif text-lg text-forest">
                      0{index + 1}
                    </span>

                    <div>
                      <h3 className="text-xl font-medium text-forest">
                        {principle.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-7 text-charcoal sm:text-base">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <a
                href="#team"
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest underline decoration-sage underline-offset-8 transition-colors hover:text-charcoal"
              >
                Get to know our team

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}