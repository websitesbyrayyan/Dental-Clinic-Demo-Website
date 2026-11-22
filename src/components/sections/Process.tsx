import { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { clinic } from "../../data/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Process() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const { process } = clinic;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 25%"],
  });

  const lineProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1],
  );

  return (
    <Section
      id="process"
      labelledBy="process-heading"
      tone="sage"
      className="overflow-hidden"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={process.eyebrow}
            title={process.heading}
            description={process.description}
            id="process-heading"
          />
        </Reveal>

        <div
          ref={timelineRef}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          {/* Timeline track */}

          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[23px] top-8 w-px bg-forest/20"
          />

          {/* Animated timeline */}

          <motion.div
            aria-hidden="true"
            className="absolute left-[23px] top-8 w-px origin-top bg-forest"
            style={{
              height: "calc(100% - 4rem)",
              scaleY: reducedMotion ? 1 : lineProgress,
            }}
          />

          <ol className="relative space-y-10 sm:space-y-14">
            {process.steps.map((step, index) => (
              <li key={step.id}>
                <Reveal delay={index * 0.08}>
                  <div className="relative flex gap-6 sm:gap-9">
                    {/* Number marker */}

                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-warmwhite font-serif text-base font-semibold text-forest shadow-soft sm:h-12 sm:w-12">
                      {step.number}
                    </div>

                    {/* Step content */}

                    <div className="min-w-0 flex-1 rounded-3xl border border-forest/10 bg-warmwhite/80 p-6 shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-8">
                      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-sage">
                        Step {index + 1}
                      </span>

                      <h3 className="text-editorial text-2xl text-forest sm:text-3xl">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-charcoal sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}