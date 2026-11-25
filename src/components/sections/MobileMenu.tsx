import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Menu,
  Phone,
  X,
} from "lucide-react";

import { clinic } from "../../data/clinic";

import { useActiveSection } from "../../hooks/useActiveSection";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";

import { Button } from "../ui/Button";

const SECTION_IDS = [
  "home",
  "about",
  "services",
  "why-us",
  "process",
  "team",
  "virtual-tour",
  "testimonials",
  "blog",
  "faq",
  "contact",
] as const;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const restoreFocusRef = useRef(false);

  const activeSection = useActiveSection(SECTION_IDS);

  const callHref = `tel:${clinic.phone.replace(/[^\d+]/g, "")}`;

  const callLabel =
    `Call ${clinic.name} on ${clinic.phone}`;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeMenuWithEscape = useCallback(() => {
    restoreFocusRef.current = true;
    setIsOpen(false);
  }, []);

  useBodyScrollLock(isOpen);

  useFocusTrap(
    panelRef,
    isOpen,
    closeMenuWithEscape,
  );

  useEffect(() => {
    if (!isOpen && restoreFocusRef.current) {
      toggleRef.current?.focus();
      restoreFocusRef.current = false;
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="clinic-mobile-menu"
        onClick={() => setIsOpen((current) => !current)}
        className="relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-warmwhite/30 text-warmwhite transition-colors hover:bg-sage/30 focus-visible:outline-warmwhite"
      >
        {isOpen ? (
          <X
            size={21}
            aria-hidden="true"
          />
        ) : (
          <Menu
            size={21}
            aria-hidden="true"
          />
        )}
      </button>

      <div
        hidden={!isOpen}
        className="fixed inset-0 z-[60] bg-forest/35 px-3 pb-4 pt-20 sm:px-5"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <div
          id="clinic-mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          className="glass-panel mobile-menu-panel focus-on-dark mx-auto max-h-[calc(100dvh-6rem)] w-full max-w-lg overflow-y-auto rounded-3xl p-5 sm:p-7"
        >
          <nav aria-label="Mobile main navigation">
            <ul className="space-y-1">
              {clinic.nav.map((item) => {
                if ("children" in item) {
                  return (
                    <li key={item.label} className="pt-4">
                      <p className="mb-2 px-4 text-xs font-bold uppercase tracking-[0.2em] text-lightsage">
                        {item.label}
                      </p>

                      <ul className="space-y-1">
                        {item.children.map((child) => {
                          const isActive =
                            child.href.slice(1) === activeSection;

                          return (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                aria-current={
                                  isActive ? "location" : undefined
                                }
                                onClick={closeMenu}
                                className={[
                                  "flex min-h-12 items-center rounded-xl px-4 py-3 text-lg font-medium text-warmwhite transition-colors hover:bg-sage/30",
                                  isActive ? "bg-sage/30" : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                {child.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }

                const isActive =
                  item.href.slice(1) === activeSection;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={
                        isActive ? "location" : undefined
                      }
                      onClick={closeMenu}
                      className={[
                        "flex min-h-12 items-center rounded-xl px-4 py-3 text-lg font-medium text-warmwhite transition-colors hover:bg-sage/30",
                        isActive ? "bg-sage/30" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="my-6 h-px bg-warmwhite/20" />

          <div className="flex flex-col gap-3">
            <Button
              href={callHref}
              variant="inverse-outline"
              className="w-full"
              ariaLabel={callLabel}
            >
              <Phone
                size={17}
                aria-hidden="true"
              />

              <span>Call now</span>
            </Button>

            <Button
              href="#contact"
              variant="inverse"
              className="w-full"
            >
              Book appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}