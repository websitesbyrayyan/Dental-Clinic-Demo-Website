import type { ReactNode } from "react";

type SectionTone = "warm" | "sage" | "forest";

interface SectionProps {
  id: string;
  labelledBy: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  labelledBy,
  tone = "warm",
  className = "",
  children,
}: SectionProps) {
  const toneClasses: Record<SectionTone, string> = {
    warm: "bg-warmwhite text-charcoal",
    sage: "bg-lightsage text-charcoal",
    forest: "bg-forest text-warmwhite focus-on-dark",
  };

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        "section-anchor relative py-20 sm:py-24 lg:py-28",
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}