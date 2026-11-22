/**
 * Formats a Pakistani mobile number for display.
 *
 * Examples:
 * +923000000000 -> +92 300 0000000
 * 03000000000   -> 0300 000 0000
 *
 * Unknown formats are returned unchanged.
 */
export function formatPhoneNumber(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("92")) {
    return `+92 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return trimmed;
}

/**
 * Converts 24-hour time into a 12-hour display format.
 *
 * Examples:
 * 10:00 -> 10:00 AM
 * 20:00 -> 8:00 PM
 */
export function formatTime(time: string): string {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);

  if (!match) {
    return time;
  }

  const hours = Number(match[1]);
  const minutes = match[2];

  const displayHours = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";

  return `${displayHours}:${minutes} ${period}`;
}