interface ArcDecorationProps {
  className?: string;
}

export function ArcDecoration({
  className = "",
}: ArcDecorationProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M40 380V200C40 111.6 111.6 40 200 40C288.4 40 360 111.6 360 200V380"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />

      <path
        d="M80 380V200C80 133.7 133.7 80 200 80C266.3 80 320 133.7 320 200V380"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.3"
      />

      <path
        d="M120 380V200C120 155.8 155.8 120 200 120C244.2 120 280 155.8 280 200V380"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />

      <circle
        cx="200"
        cy="40"
        r="4"
        fill="#568477"
      />
    </svg>
  );
}