interface LogoMarkProps {
  className?: string;
}

export function LogoMark({
  className = "",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 42C24 27.5 17.5 14.5 6 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M24 42C24 25 30.5 13.5 42 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M11 13C18.5 12 23 17 24 25C16.5 24.5 12 20.5 11 13Z"
        fill="#BFD8CB"
      />

      <path
        d="M38 12C30.5 11.5 26 16 24 25C31.5 25 36.5 20.5 38 12Z"
        fill="#568477"
      />

      <path
        d="M24 41V28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M18 33L24 37L30 33"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="24"
        cy="6"
        r="2"
        fill="#BFD8CB"
      />
    </svg>
  );
}