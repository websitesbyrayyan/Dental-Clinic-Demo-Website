import type { PillarIconName } from "../../types/clinic";

import { clinic } from "../../data/clinic";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";

interface PillarIconProps {
  name: PillarIconName;
  className?: string;
}

function PillarIcon({
  name,
  className = "",
}: PillarIconProps) {
  let artwork;

  switch (name) {
    case "expertise":
      artwork = (
        <>
          <path d="M12 3L19 6V11C19 16 16 19 12 21C8 19 5 16 5 11V6L12 3Z" />
          <path d="M9 12L11 14L15 10" />
        </>
      );
      break;

    case "technology":
      artwork = (
        <>
          <rect x="4" y="4" width="16" height="13" rx="2" />
          <path d="M9 21H15M12 17V21" />
          <path d="M8 10H16M12 7V13" />
        </>
      );
      break;

    case "comfort":
      artwork = (
        <>
          <path d="M12 20S4 15.5 4 9.5C4 5.5 9 4 12 8C15 4 20 5.5 20 9.5C20 15.5 12 20 12 20Z" />
          <path d="M8 12H10L12 9L14 14L16 12H17" />
        </>
      );
      break;

    case "transparency":
      artwork = (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12L11 15L16 9" />
          <path d="M12 3V5M21 12H19M12 21V19M3 12H5" />
        </>
      );
      break;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {artwork}
    </svg>
  );
}

export function WhyChooseUs() {
  const { whyChooseUs } = clinic;

  return (
    <Section
      id="why-us"
      labelledBy="why-us-heading"
      tone="forest"
    >
      <Container>
        {/* Accessible light-on-dark heading */}

        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-lightsage sm:text-sm">
              {whyChooseUs.eyebrow}
            </p>

            <h2
              id="why-us-heading"
              className="text-editorial text-4xl text-warmwhite sm:text-5xl lg:text-6xl"
            >
              {whyChooseUs.heading}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-lightsage sm:text-lg">
              {whyChooseUs.description}
            </p>
          </div>
        </Reveal>

        {/* Four pillars */}

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.pillars.map((pillar, index) => (
            <Reveal
              key={pillar.id}
              delay={index * 0.08}
            >
              <article className="group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-warmwhite/20 bg-warmwhite/10 text-lightsage transition-colors duration-300 group-hover:bg-warmwhite/20">
                  <PillarIcon
                    name={pillar.icon}
                    className="h-8 w-8"
                  />
                </div>

                <h3 className="text-editorial text-2xl text-warmwhite">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-lightsage sm:text-base">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Sample statistics */}

        <div className="mt-20 border-t border-warmwhite/20 pt-12">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-editorial text-2xl text-warmwhite sm:text-3xl">
              A considered approach
            </h3>

            <span className="rounded-full border border-warmwhite/30 px-4 py-2 text-xs font-semibold text-lightsage">
              {whyChooseUs.sampleLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {whyChooseUs.stats.map((stat, index) => (
              <Reveal
                key={stat.id}
                delay={index * 0.08}
              >
                <div className="border-l border-warmwhite/20 pl-5">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    sample={whyChooseUs.sampleLabel}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}