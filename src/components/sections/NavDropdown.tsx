import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { FocusEvent } from "react";

import { ChevronDown } from "lucide-react";

import type { NavDropdownItem } from "../../types/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface NavDropdownProps {
  item: NavDropdownItem;
  activeSection: string;
}

export function NavDropdown({
  item,
  activeSection,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const closeTimerRef = useRef<number | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const dropdownId = "clinic-about-dropdown";

  const isActive = item.children.some(
    (child) => child.href.slice(1) === activeSection,
  );

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeDropdown = useCallback(() => {
    clearCloseTimer();
    setIsOpen(false);
  }, [clearCloseTimer]);

  function handleEscape(): void {
    closeDropdown();
    buttonRef.current?.focus();
  }

  function handleMouseEnter(): void {
    clearCloseTimer();
    setIsOpen(true);
  }

  function handleMouseLeave(): void {
    clearCloseTimer();

    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, 180);
  }

  function handleBlur(
    event: FocusEvent<HTMLDivElement>,
  ): void {
    const nextTarget = event.relatedTarget;

    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      closeDropdown();
    }
  }

  /* Close when the user clicks outside. */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleOutsidePointer(
      event: PointerEvent,
    ): void {
      const wrapper = wrapperRef.current;
      const target = event.target;

      if (
        wrapper &&
        target instanceof Node &&
        !wrapper.contains(target)
      ) {
        closeDropdown();
      }
    }

    document.addEventListener(
      "pointerdown",
      handleOutsidePointer,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsidePointer,
      );
    };
  }, [isOpen, closeDropdown]);

  /* Clean up the hover timer on unmount. */

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          handleEscape();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-current={isActive ? "location" : undefined}
        onClick={() => {
          clearCloseTimer();
          setIsOpen((current) => !current);
        }}
        className={[
          "nav-link",
          isActive ? "nav-link-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span>{item.label}</span>

        <ChevronDown
          size={15}
          aria-hidden="true"
          className={[
            "ml-1 shrink-0",
            reducedMotion
              ? ""
              : "transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>

      {/* Dropdown panel */}

      <div
        id={dropdownId}
        hidden={!isOpen}
        className="glass-panel focus-on-dark absolute left-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-3"
      >
        <ul className="space-y-1">
          {item.children.map((child) => {
            const childIsActive =
              child.href.slice(1) === activeSection;

            return (
              <li key={child.href}>
                <a
                  href={child.href}
                  aria-current={
                    childIsActive ? "location" : undefined
                  }
                  onClick={closeDropdown}
                  className={[
                    "flex min-h-14 flex-col justify-center rounded-xl px-4 py-3 transition-colors",
                    childIsActive
                      ? "bg-sage/30"
                      : "hover:bg-sage/30",
                  ].join(" ")}
                >
                  <span className="text-sm font-semibold text-warmwhite">
                    {child.label}
                  </span>

                  <span className="mt-1 text-xs leading-5 text-lightsage">
                    {child.description}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}