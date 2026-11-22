import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-warmwhite/70 bg-warmwhite/85 p-5 shadow-card backdrop-blur-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}