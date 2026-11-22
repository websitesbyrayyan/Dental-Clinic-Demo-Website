import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  animate,
  useInView,
} from "framer-motion";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface CountUpProps {
  value: number;
  suffix?: string;
  label: string;
  sample?: string;
}

export function CountUp({
  value,
  suffix = "",
  label,
  sample,
}: CountUpProps) {
  const reducedMotion = usePrefersReducedMotion();

  const numberRef = useRef<HTMLSpanElement | null>(null);

  const isInView = useInView(numberRef, {
    once: true,
    amount: 0.5,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion || !isInView) {
      return;
    }

    const animation = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
    });

    return () => {
      animation.stop();
    };
  }, [isInView, reducedMotion, value]);

  const displayedCount = reducedMotion ? value : count;

  return (
    <div className="flex flex-col gap-2">
      {/* Complete value available to screen readers immediately */}

      <span className="sr-only">
        {value}
        {suffix} {label}
        {sample ? `. ${sample}.` : ""}
      </span>

      {/* Animated visual value */}

      <span
        ref={numberRef}
        aria-hidden="true"
        className="text-editorial text-5xl text-warmwhite sm:text-6xl"
      >
        {displayedCount}
        {suffix}
      </span>

      <p className="text-sm font-medium leading-6 text-warmwhite">
        {label}
      </p>

      {sample && (
        <span className="text-xs text-lightsage">
          {sample}
        </span>
      )}
    </div>
  );
}