import type { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverse"
  | "inverse-outline";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ariaLabel,
  external = false,
}: ButtonProps) {
  const classes = [
    "button-base",
    `button-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const accessibleLabel =
    external && ariaLabel
      ? /opens in a new tab/i.test(ariaLabel)
        ? ariaLabel
        : `${ariaLabel}, opens in a new tab`
      : ariaLabel;

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        aria-label={accessibleLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={
          disabled
            ? (event) => event.preventDefault()
            : onClick
        }
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      aria-label={accessibleLabel}
    >
      {children}
    </button>
  );
}