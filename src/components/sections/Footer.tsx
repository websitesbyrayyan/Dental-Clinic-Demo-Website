import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import type { Weekday } from "../../types/clinic";

import { clinic } from "../../data/clinic";

import { formatPhoneNumber, formatTime } from "../../lib/format";

import { buildWhatsAppUrl } from "../../lib/whatsapp";

import { getTodayHoursLabel, isOpenNow } from "../../lib/hours";

import { SocialIcons } from "../graphics/SocialIcons";

import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const WEEKDAYS: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const FOOTER_LINKS = clinic.nav.flatMap((item) =>
  "children" in item ? item.children : [item],
);

export function Footer() {
  const isOpen = isOpenNow(
    clinic.hours,
    clinic.timeZone,
  );

  const todayHours = getTodayHoursLabel(
    clinic.hours,
    clinic.timeZone,
  );

  const phoneHref = `tel:${clinic.phone.replace(/[^\d+]/g, "")}`;

  const whatsappLink = buildWhatsAppUrl(
    clinic.whatsappNumber,
    clinic.banner.whatsappMessage,
  );

  return (
    <footer className="focus-on-dark bg-forest text-warmwhite">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:gap-10 lg:py-20">
          {/* Brand and description */}

          <div>
            <a
              href="#home"
              aria-label={`Go to ${clinic.name} homepage`}
              className="inline-flex items-center"
            >
              <span className="font-serif text-2xl font-semibold text-warmwhite">
                {clinic.name}
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-lightsage">
              {clinic.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {clinic.socialLinks.map((social) => {
                if (!social.href) {
                  return null;
                }

                return (
                  <Button
                    key={social.platform}
                    href={social.href}
                    external
                    variant="inverse-outline"
                    className="!h-11 !w-11 !p-0"
                    ariaLabel={social.ariaLabel}
                  >
                    <SocialIcons
                      platform={social.platform}
                      className="h-5 w-5"
                    />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}

          <div>
            <h2 className="text-editorial text-xl text-warmwhite">
              Explore
            </h2>

            <nav
              aria-label="Footer navigation"
              className="mt-6"
            >
              <ul className="space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-9 items-center text-sm text-lightsage transition-colors hover:text-warmwhite"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}

          <div>
            <h2 className="text-editorial text-xl text-warmwhite">
              Get in touch
            </h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-lightsage"
                  aria-hidden="true"
                />

                <address className="text-sm not-italic leading-7 text-lightsage">
                  {clinic.address.streetAddress}
                  <br />
                  {clinic.address.area}
                  <br />
                  {clinic.address.city},{" "}
                  {clinic.address.region}
                  <br />
                  {clinic.address.country}
                </address>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={17}
                  className="mt-1 shrink-0 text-lightsage"
                  aria-hidden="true"
                />

                <a
                  href={phoneHref}
                  aria-label={`Call ${clinic.name} on ${clinic.phone}`}
                  className="min-h-9 text-sm text-lightsage underline underline-offset-4 hover:text-warmwhite"
                >
                  {formatPhoneNumber(clinic.phone)}
                </a>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={17}
                  className="mt-1 shrink-0 text-lightsage"
                  aria-hidden="true"
                />

                <a
                  href={`mailto:${clinic.email}`}
                  className="min-h-9 break-all text-sm text-lightsage underline underline-offset-4 hover:text-warmwhite"
                >
                  {clinic.email}
                </a>
              </div>

              <div>
                <Button
                  href={whatsappLink}
                  external
                  variant="inverse-outline"
                  className="w-fit"
                  ariaLabel={clinic.banner.whatsappAriaLabel}
                >
                  {clinic.banner.whatsappLabel}
                </Button>
              </div>
            </div>
          </div>

          {/* Opening hours */}

          <div>
            <h2 className="text-editorial text-xl text-warmwhite">
              {clinic.booking.openingHoursTitle}
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  isOpen ? "bg-lightsage" : "bg-warmwhite/50",
                ].join(" ")}
              />

              <p className="text-sm font-semibold text-warmwhite">
                {isOpen
                  ? clinic.booking.openNowLabel
                  : clinic.booking.closedNowLabel}
              </p>
            </div>

            <p className="mt-2 text-sm leading-6 text-lightsage">
              {todayHours}
            </p>

            <div className="mt-5 space-y-3">
              {WEEKDAYS.map((day) => {
                const schedule = clinic.hours[day];

                const isClosed = "closed" in schedule;

                return (
                  <div
                    key={day}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="text-warmwhite">
                      {day}
                    </span>

                    <span className="text-right text-lightsage">
                      {isClosed
                        ? clinic.booking.closedTodayLabel
                        : `${formatTime(schedule.open)} – ${formatTime(schedule.close)}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sample notice and bottom bar */}

        <div className="flex flex-col gap-5 border-t border-warmwhite/20 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-6 text-lightsage">
            {clinic.banner.prefix}{" "}
            {clinic.banner.studioNamePlaceholder}.{" "}
            {clinic.banner.notice}
          </p>

          <Button
            href="#home"
            variant="inverse-outline"
            className="w-fit"
            ariaLabel="Back to top"
          >
            Back to top

            <ArrowUp
              size={16}
              aria-hidden="true"
            />
          </Button>
        </div>

        <p className="pb-7 text-center text-xs text-lightsage/80">
          {clinic.name}
        </p>
      </Container>
    </footer>
  );
}