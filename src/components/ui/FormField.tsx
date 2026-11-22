import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  hint,
  error,
  required = false,
  children,
}: FormFieldProps) {
  const errorMessage =
    error && !error.startsWith("Error:")
      ? `Error: ${error}`
      : error;

  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div
      className="flex min-w-0 flex-col"
      data-required={required ? "true" : undefined}
    >
      <label
        htmlFor={id}
        className="form-label"
      >
        {label}

        {required && !label.includes("*") && (
          <span className="ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {hint && (
        <p
          id={hintId}
          className="form-hint"
        >
          {hint}
        </p>
      )}

      {errorMessage && (
        <p
          id={errorId}
          className="form-error"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}