import type { SocialPlatform } from "../../types/clinic";

interface SocialIconsProps {
  platform: SocialPlatform;
  className?: string;
}

export function SocialIcons({
  platform,
  className = "",
}: SocialIconsProps) {
  let artwork;

  switch (platform) {
    case "instagram":
      artwork = (
        <>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <circle
            cx="17.5"
            cy="6.5"
            r="1.1"
            fill="currentColor"
          />
        </>
      );
      break;

    case "facebook":
      artwork = (
        <path
          d="M13.2 21V13.1H16L16.4 10H13.2V8C13.2 7.1 13.5 6.5 14.9 6.5H16.5V3.7C16.2 3.6 15.1 3.5 13.8 3.5C11.1 3.5 9.3 5.1 9.3 8V10H6.5V13.1H9.3V21H13.2Z"
          fill="currentColor"
        />
      );
      break;

    case "whatsapp":
      artwork = (
        <>
          <path
            d="M20.2 11.6C20.2 16.1 16.5 19.7 12 19.7C10.5 19.7 9 19.3 7.8 18.5L4 19.7L5.2 16.1C4.4 14.8 4 13.2 4 11.7C4 7.2 7.6 3.5 12.1 3.5C16.5 3.5 20.2 7.1 20.2 11.6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          <path
            d="M8.2 8.2C8.5 7.7 8.8 7.7 9.2 7.7C9.4 7.7 9.6 7.7 9.8 8.2L10.7 10.1C10.8 10.4 10.7 10.6 10.5 10.9L9.9 11.6C10.5 12.8 11.5 13.8 12.8 14.4L13.5 13.8C13.7 13.5 14 13.5 14.3 13.7L16.2 14.6C16.5 14.8 16.5 15 16.5 15.2C16.5 15.6 16.4 15.9 15.9 16.2C15.3 16.6 14.6 16.8 14 16.6C10.7 15.8 8.2 13.3 7.5 10C7.3 9.4 7.6 8.7 8.2 8.2Z"
            fill="currentColor"
          />
        </>
      );
      break;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {artwork}
    </svg>
  );
}