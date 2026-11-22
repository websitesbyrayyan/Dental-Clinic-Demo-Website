import { useId, useState } from "react";

import { ChevronDown } from "lucide-react";

import type { AccordionItem } from "../../types/clinic";

interface AccordionProps {
  items: AccordionItem[];
  label: string;
}

export function Accordion({
  items,
  label,
}: AccordionProps) {
  const instanceId = useId();

  const [openItem, setOpenItem] = useState<string | null>(
    null,
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="w-full"
      aria-label={label}
    >
      {items.map((item) => {
        const isOpen = openItem === item.id;

        const buttonId =
          `${instanceId}-accordion-button-${item.id}`;

        const panelId =
          `${instanceId}-accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="border-b border-forest/15"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenItem((current) =>
                    current === item.id ? null : item.id,
                  );
                }}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-forest transition-colors hover:text-forest-hover sm:text-lg"
              >
                <span>{item.title}</span>

                <ChevronDown
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className={[
                    "shrink-0 transition-transform duration-300",
                    isOpen ? "rotate-180" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-8 text-sm leading-7 text-charcoal sm:text-base"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}