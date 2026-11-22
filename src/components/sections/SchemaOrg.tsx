import { clinic } from "../../data/clinic";

import type { Weekday } from "../../types/clinic";

const SCHEMA_DAYS: Record<Weekday, string> = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

const WEEKDAYS: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function SchemaOrg() {
  if (clinic.isSample) {
    return null;
  }

  const openingHoursSpecification = WEEKDAYS.flatMap(
    (day) => {
      const schedule = clinic.hours[day];

      if ("closed" in schedule) {
        return [];
      }

      return [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: SCHEMA_DAYS[day],
          opens: schedule.open,
          closes: schedule.close,
        },
      ];
    },
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",

    name: clinic.name,

    telephone: clinic.phone,

    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.streetAddress,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.countryCode,
    },

    openingHoursSpecification,
  };

  const jsonLd = JSON.stringify(structuredData).replace(
    /</g,
    "\\u003c",
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
    />
  );
}