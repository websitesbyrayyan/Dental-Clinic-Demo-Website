interface OrganicBlobProps {
  className?: string;
}

export function OrganicBlob({
  className = "",
}: OrganicBlobProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M414 100C460 155 445 243 412 316C378 390 327 453 251 457C175 461 111 417 66 357C21 297 3 221 39 153C75 85 164 26 247 39C330 52 368 45 414 100Z"
        fill="#BFD8CB"
      />

      <path
        d="M394 116C431 162 416 239 384 301C351 365 307 420 244 426"
        fill="none"
        stroke="#568477"
        strokeWidth="1.5"
        opacity="0.3"
      />
    </svg>
  );
}