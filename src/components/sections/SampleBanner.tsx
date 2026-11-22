import { ArrowUpRight } from "lucide-react";

import { clinic } from "../../data/clinic";

import { buildWhatsAppUrl } from "../../lib/whatsapp";

import { Button } from "../ui/Button";

export function SampleBanner() {
  const { banner } = clinic;

  const whatsappUrl = buildWhatsAppUrl(
    clinic.whatsappNumber,
    banner.whatsappMessage,
  );

  return (
    <aside
      aria-label="Website concept notice"
      className="focus-on-dark bg-forest px-4 py-3 text-warmwhite"
    >
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs leading-5 sm:text-sm">
        <span>{banner.prefix}</span>

        <span className="font-semibold text-lightsage">
          {banner.studioNamePlaceholder}
        </span>

        <span>{banner.notice}</span>

        <Button
          href={whatsappUrl}
          external
          variant="inverse-outline"
          ariaLabel={banner.whatsappAriaLabel}
          className="!min-h-11 !px-3 !py-1.5"
        >
          {banner.whatsappLabel}

          <ArrowUpRight
            size={14}
            aria-hidden="true"
          />
        </Button>
      </div>
    </aside>
  );
}