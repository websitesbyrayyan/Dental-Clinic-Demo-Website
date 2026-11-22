import type { ReactNode } from "react";

import type { TreatmentIconName } from "../../types/clinic";

interface TreatmentIconsProps {
  name: TreatmentIconName;
  className?: string;
}

export function TreatmentIcons({
  name,
  className = "",
}: TreatmentIconsProps) {
  let artwork: ReactNode;

  switch (name) {
    case "checkup":
      artwork = (
        <g>
          <path
            d="M12 3C8 3 5 6 5 11C5 15 7 19 9 21C10 22 11 19 12 17C13 19 14 22 15 21C17 19 19 15 19 11C19 6 16 3 12 3Z"
          />
          <path d="M8 10C9.5 8.5 10.5 9 12 10C13.5 9 14.5 8.5 16 10" />
          <path d="M19 4V8M17 6H21" />
        </g>
      );
      break;

    case "whitening":
      artwork = (
        <g>
          <path
            d="M12 4L13.8 9.2L19 11L13.8 12.8L12 18L10.2 12.8L5 11L10.2 9.2L12 4Z"
          />
          <path d="M19 16L19.8 18.2L22 19L19.8 19.8L19 22L18.2 19.8L16 19L18.2 18.2L19 16Z" />
          <path d="M5 3V6M3.5 4.5H6.5" />
        </g>
      );
      break;

    case "implant":
      artwork = (
        <g>
          <path
            d="M7 4C5 5 5 8 6 11L9 18C10 21 12 21 12 17C12 21 14 21 15 18L18 11C19 8 19 5 17 4C15 3 13 5 12 5C11 5 9 3 7 4Z"
          />
          <path d="M12 8V18" />
          <path d="M10 13L12 15L14 13" />
          <path d="M9 20H15M10 23H14" />
        </g>
      );
      break;

    case "aligners":
      artwork = (
        <g>
          <path d="M4 8C8 5 16 5 20 8L18 16C14 19 10 19 6 16L4 8Z" />
          <path d="M5 10C8 12 16 12 19 10" />
          <path d="M8 12V16M12 12V17M16 12V16" />
          <path d="M8 4L12 2L16 4" />
        </g>
      );
      break;

    case "braces":
      artwork = (
        <g>
          <path d="M3 8C7 5 17 5 21 8L19 16C15 19 9 19 5 16L3 8Z" />
          <path d="M6 10H18" />
          <rect x="6" y="8.5" width="3" height="4" rx="0.6" />
          <rect x="10.5" y="8.5" width="3" height="4" rx="0.6" />
          <rect x="15" y="8.5" width="3" height="4" rx="0.6" />
          <path d="M7.5 12.5V15M12 12.5V15M16.5 12.5V15" />
        </g>
      );
      break;

    case "root-canal":
      artwork = (
        <g>
          <path d="M7 3C4 4 4 8 5 11C6 15 8 19 10 21C11 22 12 18 12 15C12 18 13 22 14 21C16 19 18 15 19 11C20 8 20 4 17 3C15 2 13 4 12 4C11 4 9 2 7 3Z" />
          <path d="M12 6V15" />
          <path d="M10 10H14" />
          <circle cx="12" cy="10" r="2.5" />
        </g>
      );
      break;

    case "veneer":
      artwork = (
        <g>
          <path d="M7 3C4.5 4 5 8 6 11L9 19C10 22 11 20 12 16C13 20 14 22 15 19L18 11C19 8 19.5 4 17 3C15 2 13 4 12 4C11 4 9 2 7 3Z" />
          <path d="M8 7C9 8 10 8 12 8C14 8 15 8 16 7" />
          <path d="M9 10C10.5 11 13.5 11 15 10" />
        </g>
      );
      break;

    case "children":
      artwork = (
        <g>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 10V10.5M16 10V10.5" />
          <path d="M8 14C10 17 14 17 16 14" />
          <path d="M5 4L3 2M19 4L21 2" />
        </g>
      );
      break;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {artwork}
    </svg>
  );
}