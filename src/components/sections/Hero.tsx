import { useRef, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  Check,
  Clock,
  Pause,
  Play,
} from "lucide-react";

import { clinic } from "../../data/clinic";

import {
  getTodayClosingTime,
  getTodayHoursLabel,
  isOpenNow,
} from "../../lib/hours";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { OrganicBlob } from "../graphics/OrganicBlob";
import { ArcDecoration } from "../graphics/ArcDecoration";

import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { GlassCard } from "../ui/GlassCard";
import { SmartImage } from "../ui/SmartImage";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const [floatPaused, setFloatPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const mainImageOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 55],
  );

  const secondaryImageOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -35],
  );

  const blobOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 28],
  );

  const { hero } = clinic;

  const words = hero.heading.split(" ");

  const openNow = isOpenNow(
    clinic.hours,
    clinic.timeZone,
  );

  const closingTime = getTodayClosingTime(
    clinic.hours,
    clinic.timeZone,
  );

  const todayHoursLabel = getTodayHoursLabel(
    clinic.hours,
    clinic.timeZone,
  );

  const availabilityLabel = openNow
    ? hero.openNowLabel
    : hero.closedNowLabel;

  const availabilityDetails =
    openNow && closingTime
      ? `${hero.closesAtLabel} ${closingTime}`
      : todayHoursLabel;

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-heading"
      className="section-anchor relative isolate overflow-hidden bg-warmwhite pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Editorial text */}

          <div className="relative z-10 max-w-2xl">
            <motion.p
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
              }}
              className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-forest sm:text-sm"
            >
              <span
                className="decorative-line"
                aria-hidden="true"
              />

              {hero.eyebrow}
            </motion.p>

            <h1
              id="hero-heading"
              aria-label={hero.heading}
              className="text-editorial max-w-3xl text-[clamp(3rem,6.4vw,6rem)] leading-[1.04] text-forest"
            >
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  aria-hidden="true"
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 22,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.55,
                    delay: reducedMotion
                      ? 0
                      : 0.08 + index * 0.055,
                    ease: "easeOut",
                  }}
                  className="mr-[0.24em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.65,
                delay: reducedMotion ? 0 : 0.5,
              }}
              className="mt-7 max-w-xl text-base leading-8 text-charcoal sm:text-lg"
            >
              {hero.supportingText}
            </motion.p>

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.65,
                delay: reducedMotion ? 0 : 0.65,
              }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                href="#contact"
                variant="primary"
              >
                {hero.primaryCta}
              </Button>

              <Button
                href="#services"
                variant="secondary"
              >
                {hero.secondaryCta}
              </Button>
            </motion.div>
          </div>

          {/* Hero image composition */}

          <div className="relative mx-auto w-full max-w-[570px]">
            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { y: blobOffset }
              }
              className="absolute -right-5 top-[-5%] h-[95%] w-[105%] sm:-right-8"
            >
              <OrganicBlob className="h-full w-full" />
            </motion.div>

            <ArcDecoration className="absolute -right-8 -top-8 z-0 h-36 w-36 text-sage sm:-right-12 sm:-top-12 sm:h-48 sm:w-48" />

            {/* Pause / Play decorative animation */}

            {!reducedMotion && (
              <button
                type="button"
                aria-label={
                  floatPaused
                    ? "Resume decorative movement"
                    : "Pause decorative movement"
                }
                aria-pressed={floatPaused}
                onClick={() =>
                  setFloatPaused((current) => !current)
                }
                className="absolute right-0 top-0 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 bg-warmwhite text-forest shadow-soft transition-colors hover:bg-lightsage"
              >
                {floatPaused ? (
                  <Play
                    size={17}
                    aria-hidden="true"
                  />
                ) : (
                  <Pause
                    size={17}
                    aria-hidden="true"
                  />
                )}
              </button>
            )}

            {/* Main image */}

            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { y: mainImageOffset }
              }
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.97,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.9,
                delay: reducedMotion ? 0 : 0.15,
                ease: "easeOut",
              }}
              className="relative z-10 ml-auto w-[82%] max-w-[440px]"
            >
              <SmartImage
                image={clinic.images[hero.mainImage]}
                priority
                shape="arch"
                className="shadow-elevated"
              />
            </motion.div>

            {/* Overlapping secondary image */}

            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { y: secondaryImageOffset }
              }
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -20,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                delay: reducedMotion ? 0 : 0.35,
              }}
              className="absolute -bottom-8 left-0 z-20 w-[37%] max-w-[190px]"
            >
              <SmartImage
                image={clinic.images[hero.secondaryImage]}
                shape="rounded"
                className="border-[5px] border-warmwhite shadow-card"
              />
            </motion.div>

            {/* Availability card */}

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={
                reducedMotion
                  ? undefined
                  : floatPaused
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 1,
                        y: [0, -7, 0],
                      }
              }
              transition={{
                duration: reducedMotion || floatPaused ? 0 : 5,
                delay: reducedMotion ? 0 : 0.4,
                repeat:
                  reducedMotion || floatPaused ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[-2%] top-[12%] z-30 w-[68%] max-w-[225px]"
            >
              <GlassCard className="p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <Clock
                    size={17}
                    className="text-forest"
                    aria-hidden="true"
                  />

                  <p className="text-xs font-semibold text-charcoal">
                    {hero.liveCardTitle}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={[
                      "h-2.5 w-2.5 shrink-0 rounded-full",
                      openNow
                        ? "bg-sage"
                        : "bg-charcoal/50",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <p className="text-sm font-bold text-forest">
                    {availabilityLabel}
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-charcoal">
                  {availabilityDetails}
                </p>
              </GlassCard>
            </motion.div>

            {/* Patient comfort card */}

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              animate={
                reducedMotion
                  ? undefined
                  : floatPaused
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 1,
                        y: [0, -6, 0],
                      }
              }
              transition={{
                duration: reducedMotion || floatPaused ? 0 : 5.5,
                delay: reducedMotion ? 0 : 0.65,
                repeat:
                  reducedMotion || floatPaused ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-7 right-[-1%] z-30 w-[60%] max-w-[220px]"
            >
              <GlassCard className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lightsage text-forest">
                  <Check
                    size={19}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                <p className="text-sm font-semibold leading-6 text-charcoal">
                  {hero.gentleCareTitle}
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Trust indicators */}

        <div className="mt-24 border-t border-forest/15 pt-7 sm:mt-28 lg:mt-32">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4">
            {hero.trustItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium leading-6 text-charcoal"
              >
                <Check
                  size={17}
                  strokeWidth={2}
                  className="shrink-0 text-sage"
                  aria-hidden="true"
                />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}