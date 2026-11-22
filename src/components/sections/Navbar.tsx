import { useEffect, useState } from "react";

import { Phone } from "lucide-react";

import { clinic } from "../../data/clinic";

import { useActiveSection } from "../../hooks/useActiveSection";

import { LogoMark } from "../graphics/LogoMark";
import { Button } from "../ui/Button";

import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";

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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const activeSection = useActiveSection(SECTION_IDS);

  const callHref = `tel:${clinic.phone.replace(/[^\d+]/g, "")}`;

  const callLabel =
    `Call ${clinic.name} on ${clinic.phone}`;

  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  return (
    <header className="sticky top-3 z-[80] w-full px-3 sm:px-5 lg:px-6">
      <div
        className={[
          "glass-nav focus-on-dark mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 overflow-visible rounded-2xl px-4 transition-[height,box-shadow] duration-300 sm:px-5 lg:px-4",
          isScrolled ? "h-[58px]" : "h-16",
        ].join(" ")}
      >
        {/* Brand */}

        <a
          href="#home"
          aria-label={`Go to ${clinic.name} homepage`}
          className="flex shrink-0 items-center gap-2 text-warmwhite sm:gap-3"
        >
          <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />

          <span className="font-serif text-lg font-semibold tracking-tight sm:text-xl">
            {clinic.name}
          </span>
        </a>

        {/* Desktop navigation */}

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex items-center gap-0 whitespace-nowrap">
            {clinic.nav.map((item) => {
              if ("children" in item) {
                return (
                  <li key={item.label}>
                    <NavDropdown
                      item={item}
                      activeSection={activeSection}
                    />
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
                    className={[
                      "nav-link",
                      isActive ? "nav-link-active" : "",
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

        {/* Desktop actions */}

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <div
            aria-hidden="true"
            className="mr-1 h-8 w-px bg-warmwhite/20"
          />

          {/* Full Call button: 1280px and above */}

          <Button
            href={callHref}
            variant="inverse-outline"
            className="hidden xl:inline-flex"
            ariaLabel={callLabel}
          >
            <Phone
              size={16}
              aria-hidden="true"
            />

            <span>Call now</span>
          </Button>

          {/* Icon-only Call button: 1024–1279px */}

          <Button
            href={callHref}
            variant="inverse-outline"
            className="!h-11 !w-11 !rounded-full !p-0 xl:hidden"
            ariaLabel={callLabel}
          >
            <Phone
              size={17}
              aria-hidden="true"
            />
          </Button>

          <Button
            href="#contact"
            variant="inverse"
          >
            Book appointment
          </Button>
        </div>

        {/* Mobile navigation */}

        <MobileMenu />
      </div>
    </header>
  );
}