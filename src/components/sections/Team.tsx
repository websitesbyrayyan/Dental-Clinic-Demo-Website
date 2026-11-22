import { motion } from "framer-motion";

import { clinic } from "../../data/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

export function Team() {
  const reducedMotion = usePrefersReducedMotion();

  const { team } = clinic;

  return (
    <Section
      id="team"
      labelledBy="team-heading"
      tone="warm"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={team.eyebrow}
            title={team.heading}
            description={team.description}
            id="team-heading"
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, index) => (
            <Reveal
              key={member.id}
              delay={index * 0.12}
            >
              <article className="group">
                {/* Portrait with clip-path reveal */}

                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          clipPath:
                            "inset(0 0 100% 0 round 24px)",
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : {
                          clipPath:
                            "inset(0 0 0% 0 round 24px)",
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.85,
                    delay: reducedMotion ? 0 : index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden rounded-3xl bg-lightsage"
                >
                  <SmartImage
                    image={clinic.images[member.image]}
                    shape="portrait"
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Profile details */}

                <div className="px-2 pb-4 pt-6">
                  <h3 className="text-editorial text-2xl text-forest sm:text-3xl">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-sage">
                    {member.specialty}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-charcoal sm:text-base">
                    {member.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-charcoal/75">
          Team names and biographies are sample content. Portraits are illustrative stock photography and do not depict confirmed Sagewood clinicians.
        </p>
      </Container>
    </Section>
  );
}