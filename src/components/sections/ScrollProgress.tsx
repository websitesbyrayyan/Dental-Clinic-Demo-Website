import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function ScrollProgress() {
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-warmwhite/90"
    >
      <motion.div
        className="h-full w-full origin-left bg-sage"
        style={{
          scaleX: reducedMotion
            ? scrollYProgress
            : smoothProgress,
        }}
      />
    </div>
  );
}