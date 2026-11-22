import { useEffect } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getFocusableElements(
  container: HTMLElement,
): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    ),
  ).filter((item) => {
    const disabled =
      item.hasAttribute("disabled") ||
      item.getAttribute("aria-disabled") === "true";

    const hidden =
      item.hidden ||
      item.getAttribute("aria-hidden") === "true";

    const hasNoLayout =
      item.getClientRects().length === 0;

    return !disabled && !hidden && !hasNoLayout;
  });
}

/**
 * Attaches keyboard and focus handlers to a guaranteed
 * non-null HTML element.
 */
function attachFocusTrap(
  container: HTMLElement,
  onEscape: () => void,
): () => void {
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onEscape();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements =
      getFocusableElements(container);

    if (focusableElements.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const first = focusableElements[0];
    const last =
      focusableElements[focusableElements.length - 1];

    if (!first || !last) {
      return;
    }

    const activeElement = document.activeElement;

    const focusIsOutside =
      !container.contains(activeElement);

    if (
      event.shiftKey &&
      (activeElement === first || focusIsOutside)
    ) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (
      !event.shiftKey &&
      (activeElement === last || focusIsOutside)
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleFocusIn(event: FocusEvent): void {
    const target = event.target;

    if (
      target instanceof Node &&
      !container.contains(target)
    ) {
      const first = getFocusableElements(container)[0];

      if (first) {
        first.focus();
      } else {
        container.focus();
      }
    }
  }

  container.addEventListener(
    "keydown",
    handleKeyDown,
  );

  document.addEventListener(
    "focusin",
    handleFocusIn,
  );

  return () => {
    container.removeEventListener(
      "keydown",
      handleKeyDown,
    );

    document.removeEventListener(
      "focusin",
      handleFocusIn,
    );
  };
}

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void,
): void {
  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;

    if (container === null) {
      return;
    }

    const first = getFocusableElements(container)[0];

    if (first) {
      first.focus();
    } else {
      container.focus();
    }

    return attachFocusTrap(container, onEscape);
  }, [containerRef, active, onEscape]);
}