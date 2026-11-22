import { useId } from "react";

interface DotGridProps {
  className?: string;
}

export function DotGrid({
  className = "",
}: DotGridProps) {
  const patternId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={patternId}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="2"
            cy="2"
            r="1.25"
            fill="#183D35"
          />
        </pattern>
      </defs>

      <rect
        width="200"
        height="200"
        fill={`url(#${patternId})`}
        opacity="0.3"
      />
    </svg>
  );
}