import type { ReactNode } from "react";

interface VisuallyHiddenProps {
  children: ReactNode;
  as?: "span" | "div";
}

export function VisuallyHidden({
  children,
  as = "span",
}: VisuallyHiddenProps) {
  const Element = as;

  return (
    <Element className="sr-only">
      {children}
    </Element>
  );
}