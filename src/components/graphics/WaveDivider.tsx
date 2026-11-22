interface WaveDividerProps {
  className?: string;
}

export function WaveDivider({
  className = "",
}: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 40C180 100 360 110 540 75C720 40 900 10 1080 30C1260 50 1360 75 1440 45V120H0V40Z"
        fill="currentColor"
      />
    </svg>
  );
}