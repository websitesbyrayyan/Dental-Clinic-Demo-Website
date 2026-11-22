import type {
  ClinicHours,
  Weekday,
} from "../types/clinic";

import { formatTime } from "./format";

/* ========================================
   INTERNAL TYPES
======================================== */

interface LocalTimeParts {
  weekday: Weekday;
  hour: string;
  minute: string;
}

const WEEKDAYS: readonly Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/* ========================================
   LOCAL TIME EXTRACTION
======================================== */

function getLocalTimeParts(
  timeZone: string,
  now: Date,
): LocalTimeParts | null {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(now);

  const weekdayValue = parts.find(
    (part) => part.type === "weekday",
  )?.value;

  const hour = parts.find(
    (part) => part.type === "hour",
  )?.value;

  const minute = parts.find(
    (part) => part.type === "minute",
  )?.value;

  const weekday = WEEKDAYS.find(
    (day) => day === weekdayValue,
  );

  if (!weekday || hour === undefined || minute === undefined) {
    return null;
  }

  return {
    weekday,
    hour,
    minute,
  };
}

/* ========================================
   OPEN STATUS
======================================== */

/**
 * Returns true when the clinic is currently open.
 *
 * The comparison uses the supplied timezone rather
 * than the visitor's device timezone.
 */
export function isOpenNow(
  hours: ClinicHours,
  timeZone: string,
  now: Date = new Date(),
): boolean {
  const localTime = getLocalTimeParts(timeZone, now);

  if (!localTime) {
    return false;
  }

  const todayHours = hours[localTime.weekday];

  if ("closed" in todayHours) {
    return false;
  }

  const currentMinutes =
    Number(localTime.hour) * 60 +
    Number(localTime.minute);

  const [openHour, openMinute] = todayHours.open
    .split(":")
    .map(Number);

  const [closeHour, closeMinute] = todayHours.close
    .split(":")
    .map(Number);

  const openingMinutes =
    openHour * 60 + openMinute;

  const closingMinutes =
    closeHour * 60 + closeMinute;

  return (
    currentMinutes >= openingMinutes &&
    currentMinutes < closingMinutes
  );
}

/* ========================================
   TODAY'S CLOSING TIME
======================================== */

/**
 * Returns today's formatted closing time.
 *
 * Returns null when the clinic is closed for the
 * entire day.
 */
export function getTodayClosingTime(
  hours: ClinicHours,
  timeZone: string,
  now: Date = new Date(),
): string | null {
  const localTime = getLocalTimeParts(timeZone, now);

  if (!localTime) {
    return null;
  }

  const todayHours = hours[localTime.weekday];

  if ("closed" in todayHours) {
    return null;
  }

  return formatTime(todayHours.close);
}

/* ========================================
   TODAY'S OPENING HOURS LABEL
======================================== */

/**
 * Returns today's scheduled opening hours.
 *
 * Examples:
 * 10:00 AM – 8:00 PM
 * Closed today
 */
export function getTodayHoursLabel(
  hours: ClinicHours,
  timeZone: string,
  now: Date = new Date(),
): string {
  const localTime = getLocalTimeParts(timeZone, now);

  if (!localTime) {
    return "Hours unavailable";
  }

  const todayHours = hours[localTime.weekday];

  if ("closed" in todayHours) {
    return "Closed today";
  }

  return `${formatTime(todayHours.open)} – ${formatTime(todayHours.close)}`;
}