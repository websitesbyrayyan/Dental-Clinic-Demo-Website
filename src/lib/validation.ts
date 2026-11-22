import type {
  BookingFieldErrors,
  BookingFormValues,
  BookingTimeWindow,
} from "../types/clinic";

/* ========================================
   PAKISTANI MOBILE NUMBER
======================================== */

/**
 * Removes spaces, hyphens and brackets.
 *
 * Examples:
 * 0300 0000000  -> 03000000000
 * +92 (300) 0000000 -> +923000000000
 */
export function normalizePakistanMobile(
  phone: string,
): string {
  return phone
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/[()[\]{}]/g, "");
}

/**
 * Valid formats:
 *
 * 03000000000
 * 3000000000
 * 923000000000
 * +923000000000
 *
 * Returns null when valid.
 * Returns an Error-prefixed message when invalid.
 */
export function validatePakistanMobile(
  phone: string,
): string | null {
  const normalized = normalizePakistanMobile(phone);

  const pattern = /^(?:\+?92|0)?3\d{9}$/;

  if (!pattern.test(normalized)) {
    return "Error: Enter a valid Pakistani mobile number, such as 0300 0000000.";
  }

  return null;
}

/* ========================================
   KARACHI LOCAL DATE
======================================== */

/**
 * Returns today's date in the supplied timezone.
 *
 * Format: YYYY-MM-DD
 *
 * Uses formatToParts rather than relying on
 * the visitor's device timezone.
 */
export function getKarachiTodayDate(
  timeZone = "Asia/Karachi",
): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());

  const year = parts.find(
    (part) => part.type === "year",
  )?.value;

  const month = parts.find(
    (part) => part.type === "month",
  )?.value;

  const day = parts.find(
    (part) => part.type === "day",
  )?.value;

  if (!year || !month || !day) {
    throw new Error(
      `Unable to determine today's date in ${timeZone}.`,
    );
  }

  return `${year}-${month}-${day}`;
}

/* ========================================
   BOOKING FORM VALIDATION
======================================== */

const VALID_TIME_WINDOWS: readonly BookingTimeWindow[] = [
  "Morning",
  "Afternoon",
  "Evening",
];

/**
 * Validates all required booking fields.
 *
 * Optional fields:
 * - email
 * - message
 *
 * Every returned error starts with "Error:".
 */
export function validateBookingForm(
  values: BookingFormValues,
  timeZone = "Asia/Karachi",
): BookingFieldErrors {
  const errors: BookingFieldErrors = {};

  /* Full name */

  const fullName = values.fullName.trim();

  if (!fullName) {
    errors.fullName = "Error: Enter your full name.";
  } else if (fullName.length < 2) {
    errors.fullName =
      "Error: Your name must contain at least two characters.";
  }

  /* Mobile number */

  if (!values.mobileNumber.trim()) {
    errors.mobileNumber =
      "Error: Enter your mobile number.";
  } else {
    const phoneError = validatePakistanMobile(
      values.mobileNumber,
    );

    if (phoneError) {
      errors.mobileNumber = phoneError;
    }
  }

  /* Email address */

  const email = values.email.trim();

  if (email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      errors.email =
        "Error: Enter a valid email address.";
    }
  }

  /* Treatment */

  if (!values.treatment.trim()) {
    errors.treatment =
      "Error: Select a treatment of interest.";
  }

  /* Preferred date */

  const today = getKarachiTodayDate(timeZone);
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!values.preferredDate) {
    errors.preferredDate =
      "Error: Select your preferred appointment date.";
  } else if (!datePattern.test(values.preferredDate)) {
    errors.preferredDate =
      "Error: Enter a valid appointment date.";
  } else if (values.preferredDate < today) {
    errors.preferredDate =
      "Error: The appointment date cannot be in the past.";
  } else {
    const parsedDate = new Date(
      `${values.preferredDate}T00:00:00Z`,
    );

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !==
        values.preferredDate
    ) {
      errors.preferredDate =
        "Error: Enter a valid appointment date.";
    }
  }

  /* Preferred time */

  if (
    !VALID_TIME_WINDOWS.includes(
      values.preferredTime as BookingTimeWindow,
    )
  ) {
    errors.preferredTime =
      "Error: Select a preferred time window.";
  }

  return errors;
}