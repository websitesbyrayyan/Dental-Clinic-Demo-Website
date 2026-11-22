import { useState } from "react";

import { Plus } from "lucide-react";

import type { ClinicImage } from "../../types/clinic";

type ImageShape = "arch" | "rounded" | "portrait";

interface SmartImageProps {
  image: ClinicImage;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  shape?: ImageShape;
}

export function SmartImage({
  image,
  className = "",
  imageClassName = "",
  priority = false,
  shape = "rounded",
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const shapeClasses: Record<ImageShape, string> = {
    arch: "rounded-t-[48%] rounded-b-[2rem]",
    rounded: "rounded-[2rem]",
    portrait: "rounded-3xl",
  };

  const developmentMode = import.meta.env.DEV;

  return (
    <div
      className={[
        "relative isolate w-full overflow-hidden bg-lightsage",
        shapeClasses[shape],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        aspectRatio: `${image.width} / ${image.height}`,
      }}
      aria-busy={!loaded && !failed}
    >
      {!failed && (
        <>
          {!loaded && (
            <div
              className="absolute inset-0 animate-pulse bg-lightsage"
              aria-hidden="true"
            />
          )}

          <img
            ref={(node) => {
              if (node && priority) {
                node.setAttribute("fetchpriority", "high");
              }
            }}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0",
              imageClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </>
      )}

      {failed && (
        <div className="image-fallback absolute inset-0">
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0 220 C100 160 140 280 240 180 C300 120 350 170 400 100"
              stroke="#183D35"
              strokeWidth="1.5"
              opacity="0.25"
            />

            <path
              d="M0 250 C100 190 180 300 280 210 C330 160 360 180 400 150"
              stroke="#568477"
              strokeWidth="1.5"
              opacity="0.4"
            />

            <circle
              cx="320"
              cy="65"
              r="30"
              stroke="#183D35"
              strokeWidth="1.5"
              opacity="0.2"
            />

            <circle
              cx="75"
              cy="75"
              r="20"
              fill="#F5F7F2"
              opacity="0.35"
            />
          </svg>

          <Plus
            size={36}
            strokeWidth={1.25}
            className="relative z-10 text-forest"
            aria-hidden="true"
          />

          {developmentMode && (
            <span className="absolute bottom-3 left-3 right-3 z-10 truncate rounded-lg bg-forest/90 px-3 py-2 text-center text-xs text-warmwhite">
              {image.src.split("/").pop()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}