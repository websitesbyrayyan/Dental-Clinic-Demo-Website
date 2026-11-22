import { Phone } from "lucide-react";

import { clinic } from "../../data/clinic";

import { buildWhatsAppUrl } from "../../lib/whatsapp";

import { SocialIcons } from "../graphics/SocialIcons";

import { Button } from "../ui/Button";

export function StickyActions() {
  const phoneHref = `tel:${clinic.phone.replace(/[^\d+]/g, "")}`;

  const whatsappUrl = buildWhatsAppUrl(
    clinic.whatsappNumber,
    clinic.banner.whatsappMessage,
  );

  const callLabel =
    `Call ${clinic.name} on ${clinic.phone}`;

  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-forest/15 bg-warmwhite/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(24,61,53,0.10)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <Button
          href="#contact"
          variant="primary"
          className="min-w-0 flex-1 !px-3"
        >
          Book
        </Button>

        <Button
          href={phoneHref}
          variant="secondary"
          className="min-w-0 flex-1 !px-3"
          ariaLabel={callLabel}
        >
          <Phone
            size={17}
            aria-hidden="true"
          />

          <span>Call</span>
        </Button>

        <Button
          href={whatsappUrl}
          external
          variant="secondary"
          className="min-w-0 flex-1 !px-3"
          ariaLabel={clinic.banner.whatsappAriaLabel}
        >
          <SocialIcons
            platform="whatsapp"
            className="h-5 w-5 shrink-0"
          />

          <span>WhatsApp</span>
        </Button>
      </div>
    </nav>
  );
}