import { useState } from "react";

import { motion } from "framer-motion";

import { Pause, Play } from "lucide-react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface MarqueeProps {
  items: string[];
}

export function Marquee({
  items,
}: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();

  const [paused, setPaused] = useState(false);

  if (items.length === 0) {
    return null;
  }

  const isStatic = reducedMotion || paused;

  return (
    <div
      className="flex items-center gap-5 overflow-hidden border-y border-forest/15 py-5"
      role="group"
      aria-label="Treatment highlights"
    >
      <div className="min-w-0 flex-1 overflow-hidden">
        <motion.div
          className="flex w-max items-center"
          animate={
            isStatic
              ? { x: "0%" }
              : { x: ["0%", "-50%"] }
          }
          transition={
            isStatic
              ? { duration: 0 }
              : {
                  duration: 32,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          <div className="flex shrink-0 items-center gap-8 px-4">
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="whitespace-nowrap text-sm font-semibold text-forest sm:text-base"
              >
                {item}
              </span>
            ))}
          </div>

          <div
            className="flex shrink-0 items-center gap-8 px-4"
            aria-hidden="true"
          >
            {items.map((item, index) => (
              <span
                key={`${item}-duplicate-${index}`}
                className="whitespace-nowrap text-sm font-semibold text-forest sm:text-base"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        disabled={reducedMotion}
        aria-label={
          reducedMotion
            ? "Marquee is static because reduced motion is enabled"
            : paused
              ? "Play treatment highlights"
              : "Pause treatment highlights"
        }
        onClick={() => setPaused((current) => !current)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/25 text-forest transition-colors hover:bg-lightsage disabled:cursor-not-allowed disabled:opacity-60"
      >
        {paused || reducedMotion ? (
          <Play size={17} aria-hidden="true" />
        ) : (
          <Pause size={17} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}