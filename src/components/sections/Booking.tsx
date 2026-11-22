import {
  useRef,
  useState,
} from "react";

import type { FormEvent } from "react";

import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import type {
  BookingFieldErrors,
  BookingFormValues,
  Weekday,
} from "../../types/clinic";

import { clinic } from "../../data/clinic";

import { buildWhatsAppUrl } from "../../lib/whatsapp";

import {
  formatPhoneNumber,
  formatTime,
} from "../../lib/format";

import {
  getTodayHoursLabel,
  isOpenNow,
} from "../../lib/hours";

import {
  getKarachiTodayDate,
  normalizePakistanMobile,
  validateBookingForm,
} from "../../lib/validation";

import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { FormField } from "../ui/FormField";
import { Section } from "../ui/Section";

interface BookingProps {
  selectedTreatment: string;
  onTreatmentChange: (treatmentId: string) => void;
}

const WEEKDAYS: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const FIELD_IDS: Record<
  keyof BookingFormValues,
  string
> = {
  fullName: "full-name",
  mobileNumber: "mobile-number",
  email: "email",
  treatment: "treatment",
  preferredDate: "preferred-date",
  preferredTime: "preferred-time",
  message: "message",
};

export function Booking({
  selectedTreatment,
  onTreatmentChange,
}: BookingProps) {
  const errorSummaryRef =
    useRef<HTMLDivElement | null>(null);

  const [values, setValues] = useState<BookingFormValues>({
    fullName: "",
    mobileNumber: "",
    email: "",
    treatment: selectedTreatment,
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] =
    useState<BookingFieldErrors>({});

  const [statusMessage, setStatusMessage] =
    useState("");

  /*
   * The parent owns the selected treatment.
   * This keeps the form synchronized without an effect.
   */
  const formValues: BookingFormValues = {
    ...values,
    treatment: selectedTreatment,
  };

  const today = getKarachiTodayDate(clinic.timeZone);

  const isOpen = isOpenNow(
    clinic.hours,
    clinic.timeZone,
  );

  const todayHoursLabel = getTodayHoursLabel(
    clinic.hours,
    clinic.timeZone,
  );

  const { booking } = clinic;

  const phoneHref = `tel:${clinic.phone.replace(/[^\d+]/g, "")}`;

  const directionsAddress = [
    clinic.address.streetAddress,
    clinic.address.area,
    clinic.address.city,
    clinic.address.region,
    clinic.address.country,
  ].join(", ");

  const directionsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(directionsAddress)}`;

  const fieldLabels: Record<
    keyof BookingFormValues,
    string
  > = {
    fullName: booking.fields.fullName.label,
    mobileNumber: booking.fields.mobileNumber.label,
    email: booking.fields.email.label,
    treatment: booking.fields.treatment.label,
    preferredDate: booking.fields.preferredDate.label,
    preferredTime: booking.fields.preferredTime.label,
    message: booking.fields.message.label,
  };

  const errorEntries = (
    Object.entries(errors) as Array<
      [keyof BookingFormValues, string]
    >
  ).filter((entry) => Boolean(entry[1]));

  function updateField<K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K],
  ): void {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setStatusMessage("");
  }

  function validateField(
    field: keyof BookingFormValues,
  ): void {
    const fieldErrors = validateBookingForm(formValues, clinic.timeZone);
    const message = fieldErrors[field];

    setErrors((current) => {
      const nextErrors = { ...current };

      if (message) {
        nextErrors[field] = message;
      } else {
        delete nextErrors[field];
      }

      return nextErrors;
    });
  }

  function getDescribedBy(
    field: keyof BookingFormValues,
    hasHint: boolean,
  ): string | undefined {
    const ids: string[] = [];

    if (hasHint) {
      ids.push(`${FIELD_IDS[field]}-hint`);
    }

    if (errors[field]) {
      ids.push(`${FIELD_IDS[field]}-error`);
    }

    return ids.length > 0 ? ids.join(" ") : undefined;
  }

  function handleTreatmentChange(value: string): void {
    onTreatmentChange(value);
    setStatusMessage("");

    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors.treatment;
      return nextErrors;
    });
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    const nextErrors = validateBookingForm(formValues, clinic.timeZone);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("");

      /*
       * Wait until React commits the error summary
       * before moving keyboard focus to it.
       */
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });

      return;
    }

    const treatmentTitle =
      clinic.services.items.find(
        (item) => item.id === formValues.treatment,
      )?.title ?? formValues.treatment;

    const mobileNumber = normalizePakistanMobile(
      formValues.mobileNumber,
    );

    const message = [
      `Appointment request — ${clinic.name}`,
      "",
      `Name: ${formValues.fullName.trim()}`,
      `Mobile: ${mobileNumber}`,
      `Email: ${formValues.email.trim() || "Not provided"}`,
      `Treatment: ${treatmentTitle}`,
      `Preferred date: ${formValues.preferredDate}`,
      `Preferred time: ${formValues.preferredTime}`,
      `Additional message: ${formValues.message.trim() || "None"}`,
    ].join("\n");

    const whatsappUrl = buildWhatsAppUrl(
      clinic.whatsappNumber,
      message,
    );

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );

    setStatusMessage(booking.successMessage);
  }

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      tone="forest"
      className="focus-on-dark"
    >
      <Container>
        {/* Section heading */}

        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-lightsage sm:text-sm">
            {booking.eyebrow}
          </p>

          <h2
            id="contact-heading"
            className="text-editorial text-4xl text-warmwhite sm:text-5xl lg:text-6xl"
          >
            {booking.heading}
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-warmwhite sm:text-lg">
            {booking.description}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Booking form */}

          <div className="rounded-3xl bg-warmwhite p-6 shadow-elevated sm:p-9 lg:p-10">
            <h3 className="text-editorial text-3xl text-forest sm:text-4xl">
              {booking.formTitle}
            </h3>

            <p className="mb-8 mt-3 text-sm leading-7 text-charcoal">
              {booking.footnote}
            </p>

            {/* Error summary */}

            {errorEntries.length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="booking-error-heading"
                className="mb-8 rounded-2xl border-2 border-forest bg-lightsage p-5 focus-visible:outline-forest"
              >
                <h4
                  id="booking-error-heading"
                  className="text-lg font-bold text-forest"
                >
                  Please correct the following errors:
                </h4>

                <ul className="mt-3 space-y-2">
                  {errorEntries.map(([field, message]) => (
                    <li key={field}>
                      <a
                        href={`#${FIELD_IDS[field]}`}
                        onClick={(event) => {
                          event.preventDefault();

                          document
                            .getElementById(FIELD_IDS[field])
                            ?.focus();
                        }}
                        className="text-sm font-medium text-charcoal underline underline-offset-4"
                      >
                        {fieldLabels[field]}: {message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form
              noValidate
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Full name */}

              <FormField
                id={FIELD_IDS.fullName}
                label={booking.fields.fullName.label}
                hint={booking.fields.fullName.hint}
                error={errors.fullName}
                required
              >
                <input
                  id={FIELD_IDS.fullName}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.fullName}
                  placeholder={booking.fields.fullName.placeholder}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={getDescribedBy(
                    "fullName",
                    Boolean(booking.fields.fullName.hint),
                  )}
                  onChange={(event) =>
                    updateField("fullName", event.currentTarget.value)
                  }
                  onBlur={() => validateField("fullName")}
                  className="form-control"
                />
              </FormField>

              {/* Mobile number */}

              <FormField
                id={FIELD_IDS.mobileNumber}
                label={booking.fields.mobileNumber.label}
                hint={booking.fields.mobileNumber.hint}
                error={errors.mobileNumber}
                required
              >
                <input
                  id={FIELD_IDS.mobileNumber}
                  name="mobileNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={values.mobileNumber}
                  placeholder={booking.fields.mobileNumber.placeholder}
                  aria-invalid={Boolean(errors.mobileNumber)}
                  aria-describedby={getDescribedBy(
                    "mobileNumber",
                    Boolean(booking.fields.mobileNumber.hint),
                  )}
                  onChange={(event) =>
                    updateField(
                      "mobileNumber",
                      event.currentTarget.value,
                    )
                  }
                  onBlur={() => validateField("mobileNumber")}
                  className="form-control"
                />
              </FormField>

              {/* Email */}

              <FormField
                id={FIELD_IDS.email}
                label={booking.fields.email.label}
                hint={booking.fields.email.hint}
                error={errors.email}
              >
                <input
                  id={FIELD_IDS.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  placeholder={booking.fields.email.placeholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={getDescribedBy(
                    "email",
                    Boolean(booking.fields.email.hint),
                  )}
                  onChange={(event) =>
                    updateField("email", event.currentTarget.value)
                  }
                  onBlur={() => validateField("email")}
                  className="form-control"
                />
              </FormField>

              {/* Treatment */}

              <FormField
                id={FIELD_IDS.treatment}
                label={booking.fields.treatment.label}
                hint={booking.fields.treatment.hint}
                error={errors.treatment}
                required
              >
                <select
                  id={FIELD_IDS.treatment}
                  name="treatment"
                  required
                  value={formValues.treatment}
                  aria-invalid={Boolean(errors.treatment)}
                  aria-describedby={getDescribedBy(
                    "treatment",
                    Boolean(booking.fields.treatment.hint),
                  )}
                  onChange={(event) =>
                    handleTreatmentChange(event.currentTarget.value)
                  }
                  onBlur={() => validateField("treatment")}
                  className="form-control"
                >
                  <option value="">
                    {booking.fields.treatment.placeholder}
                  </option>

                  {clinic.services.items.map((treatment) => (
                    <option
                      key={treatment.id}
                      value={treatment.id}
                    >
                      {treatment.title}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Preferred date */}

              <FormField
                id={FIELD_IDS.preferredDate}
                label={booking.fields.preferredDate.label}
                hint={booking.fields.preferredDate.hint}
                error={errors.preferredDate}
                required
              >
                <input
                  id={FIELD_IDS.preferredDate}
                  name="preferredDate"
                  type="date"
                  min={today}
                  required
                  value={values.preferredDate}
                  aria-invalid={Boolean(errors.preferredDate)}
                  aria-describedby={getDescribedBy(
                    "preferredDate",
                    Boolean(booking.fields.preferredDate.hint),
                  )}
                  onChange={(event) =>
                    updateField(
                      "preferredDate",
                      event.currentTarget.value,
                    )
                  }
                  onBlur={() => validateField("preferredDate")}
                  className="form-control"
                />
              </FormField>

              {/* Preferred time */}

              <FormField
                id={FIELD_IDS.preferredTime}
                label={booking.fields.preferredTime.label}
                hint={booking.fields.preferredTime.hint}
                error={errors.preferredTime}
                required
              >
                <select
                  id={FIELD_IDS.preferredTime}
                  name="preferredTime"
                  required
                  value={values.preferredTime}
                  aria-invalid={Boolean(errors.preferredTime)}
                  aria-describedby={getDescribedBy(
                    "preferredTime",
                    Boolean(booking.fields.preferredTime.hint),
                  )}
                  onChange={(event) =>
                    updateField(
                      "preferredTime",
                      event.currentTarget.value as BookingFormValues["preferredTime"],
                    )
                  }
                  onBlur={() => validateField("preferredTime")}
                  className="form-control"
                >
                  <option value="">
                    {booking.fields.preferredTime.placeholder}
                  </option>

                  {booking.timeWindows.map((window) => (
                    <option
                      key={window.value}
                      value={window.value}
                    >
                      {window.label}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Additional message */}

              <FormField
                id={FIELD_IDS.message}
                label={booking.fields.message.label}
                hint={booking.fields.message.hint}
                error={errors.message}
              >
                <textarea
                  id={FIELD_IDS.message}
                  name="message"
                  rows={4}
                  value={values.message}
                  placeholder={booking.fields.message.placeholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={getDescribedBy(
                    "message",
                    Boolean(booking.fields.message.hint),
                  )}
                  onChange={(event) =>
                    updateField(
                      "message",
                      event.currentTarget.value,
                    )
                  }
                  onBlur={() => validateField("message")}
                  className="form-control min-h-32 resize-y"
                />
              </FormField>

              {/* Submit */}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
              >
                {booking.submitLabel}

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </Button>

              {/* Success announcement */}

              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-sm font-medium leading-7 text-forest"
              >
                {statusMessage}
              </p>
            </form>
          </div>

          {/* Contact details */}

          <aside className="space-y-7 text-warmwhite">
            <div>
              <h3 className="text-editorial text-3xl text-warmwhite">
                {booking.detailsTitle}
              </h3>

              <div className="mt-7 space-y-6">
                {/* Address */}

                <div className="flex gap-4">
                  <MapPin
                    size={21}
                    className="mt-1 shrink-0 text-lightsage"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-semibold text-warmwhite">
                      Visit the clinic
                    </p>

                    <address className="mt-2 text-sm not-italic leading-7 text-lightsage">
                      {clinic.address.streetAddress}
                      <br />
                      {clinic.address.area}
                      <br />
                      {clinic.address.city},{" "}
                      {clinic.address.region}
                      <br />
                      {clinic.address.country}
                    </address>

                    <Button
                      href={directionsUrl}
                      external
                      variant="inverse-outline"
                      className="mt-4"
                      ariaLabel={booking.directionsAriaLabel}
                    >
                      {booking.directionsLabel}

                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </div>

                {/* Telephone */}

                <div className="flex gap-4">
                  <Phone
                    size={21}
                    className="mt-1 shrink-0 text-lightsage"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-semibold text-warmwhite">
                      Call the clinic
                    </p>

                    <a
                      href={phoneHref}
                      aria-label={`Call ${clinic.name} on ${clinic.phone}`}
                      className="mt-2 inline-flex min-h-11 items-center text-sm text-lightsage underline underline-offset-4 hover:text-warmwhite"
                    >
                      {formatPhoneNumber(clinic.phone)}
                    </a>
                  </div>
                </div>

                {/* Email */}

                <div className="flex gap-4">
                  <Mail
                    size={21}
                    className="mt-1 shrink-0 text-lightsage"
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-semibold text-warmwhite">
                      Email
                    </p>

                    <a
                      href={`mailto:${clinic.email}`}
                      className="mt-2 inline-flex min-h-11 items-center break-all text-sm text-lightsage underline underline-offset-4 hover:text-warmwhite"
                    >
                      {clinic.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening hours */}

            <div className="rounded-3xl border border-warmwhite/20 bg-warmwhite/10 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <Clock
                  size={21}
                  className="text-lightsage"
                  aria-hidden="true"
                />

                <h3 className="font-semibold text-warmwhite">
                  {booking.openingHoursTitle}
                </h3>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span
                  className={[
                    "h-2.5 w-2.5 rounded-full",
                    isOpen
                      ? "bg-lightsage"
                      : "bg-warmwhite/50",
                  ].join(" ")}
                  aria-hidden="true"
                />

                <p className="text-sm font-bold text-warmwhite">
                  {isOpen
                    ? booking.openNowLabel
                    : booking.closedNowLabel}
                </p>
              </div>

              <p className="mt-2 text-sm text-lightsage">
                {todayHoursLabel}
              </p>

              <div className="mt-5 space-y-3 border-t border-warmwhite/20 pt-5">
                {WEEKDAYS.map((day) => {
                  const daySchedule = clinic.hours[day];

                  const isClosed = "closed" in daySchedule;

                  return (
                    <div
                      key={day}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span className="text-warmwhite">
                        {day}
                      </span>

                      <span className="text-right text-lightsage">
                        {isClosed
                          ? booking.closedTodayLabel
                          : `${formatTime(daySchedule.open)} – ${formatTime(daySchedule.close)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}