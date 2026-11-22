import type { TabItem } from "../../types/clinic";

import { motion } from "framer-motion";

import { ArrowUpRight, Check } from "lucide-react";

import { clinic } from "../../data/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";
import { Tabs } from "../ui/Tabs";

export function VirtualTour() {
  const reducedMotion = usePrefersReducedMotion();

  const { tour } = clinic;

  const tabItems: TabItem[] = tour.rooms.map((room) => ({
    id: room.id,
    label: room.label,

    content: (
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="overflow-hidden rounded-3xl">
          <SmartImage
            image={clinic.images[room.image]}
            shape="rounded"
            className="shadow-card"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-4 w-fit rounded-full bg-lightsage px-4 py-2 text-xs font-semibold text-forest">
            {tour.sampleLabel}
          </span>

          <h3 className="text-editorial text-3xl text-forest sm:text-4xl">
            {room.title}
          </h3>

          <p className="mt-5 text-sm leading-8 text-charcoal sm:text-base">
            {room.caption}
          </p>

          <ul className="mt-7 space-y-4">
            {room.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm font-medium leading-6 text-charcoal"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lightsage text-forest">
                  <Check
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>

                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  }));

  return (
    <Section
      id="virtual-tour"
      labelledBy="tour-heading"
      tone="sage"
      className="overflow-hidden"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={tour.eyebrow}
            title={tour.heading}
            description={tour.intro}
            id="tour-heading"
            align="center"
          />
        </Reveal>

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
          }}
          className="mx-auto mt-12 max-w-6xl rounded-3xl border border-forest/10 bg-warmwhite/80 p-4 shadow-soft sm:p-8"
        >
          <Tabs
            items={tabItems}
            label="Explore the clinic rooms"
          />
        </motion.div>

        {tour.tourUrl && (
          <div className="mt-8 flex justify-center">
            <Button
              href={tour.tourUrl}
              external
              variant="secondary"
              ariaLabel="Open the virtual clinic tour, opens in a new tab"
            >
              Explore the full virtual tour

              <ArrowUpRight
                size={17}
                aria-hidden="true"
              />
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}