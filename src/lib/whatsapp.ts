export function buildWhatsAppUrl(
  phoneNumber: string,
  message: string,
): string {
  const digits = phoneNumber.replace(/\D/g, "");

  if (!digits) {
    throw new Error("A valid WhatsApp phone number is required.");
  }

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${digits}?text=${encodedMessage}`;
}