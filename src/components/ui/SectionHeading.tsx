interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center"
      : "text-left";

  return (
    <div className={`mb-12 max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-forest sm:text-sm">
          {eyebrow}
        </p>
      )}

      <h2
        id={id}
        className="text-editorial text-4xl sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-charcoal sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}