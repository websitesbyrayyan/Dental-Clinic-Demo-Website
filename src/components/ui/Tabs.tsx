import {
  useId,
  useState,
} from "react";

import type { KeyboardEvent } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import type { TabItem } from "../../types/clinic";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface TabsProps {
  items: TabItem[];
  label: string;
}

export function Tabs({
  items,
  label,
}: TabsProps) {
  const instanceId = useId();

  const reducedMotion = usePrefersReducedMotion();

  const [activeItem, setActiveItem] = useState(
    items[0]?.id ?? "",
  );

  if (items.length === 0) {
    return null;
  }

  const selectedItem =
    items.find((item) => item.id === activeItem) ??
    items[0];

  const selectedId = selectedItem.id;

  function getTabId(id: string): string {
    return `${instanceId}-tab-${id}`;
  }

  function getPanelId(id: string): string {
    return `${instanceId}-panel-${id}`;
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void {
    const nextIndex = (() => {
      switch (event.key) {
        case "ArrowRight":
          return (index + 1) % items.length;

        case "ArrowLeft":
          return (index - 1 + items.length) % items.length;

        case "Home":
          return 0;

        case "End":
          return items.length - 1;

        default:
          return null;
      }
    })();

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();

    const nextItem = items[nextIndex];

    if (!nextItem) {
      return;
    }

    setActiveItem(nextItem.id);

    document
      .getElementById(getTabId(nextItem.id))
      ?.focus();
  }

  return (
    <div className="w-full">
      {/* Tab controls */}

      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap gap-2 border-b border-forest/15"
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              id={getTabId(item.id)}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={getPanelId(item.id)}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveItem(item.id)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
              className={[
                "relative min-h-12 rounded-t-xl px-4 py-3 text-sm font-semibold transition-colors sm:px-6 sm:text-base",
                isSelected
                  ? "bg-forest text-warmwhite"
                  : "bg-transparent text-forest hover:bg-lightsage",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Selected tab panel */}

      <div className="min-w-0 pt-6">
        {reducedMotion ? (
          <div
            key={selectedItem.id}
            id={getPanelId(selectedItem.id)}
            role="tabpanel"
            aria-labelledby={getTabId(selectedItem.id)}
            tabIndex={0}
            className="min-w-0"
          >
            {selectedItem.content}
          </div>
        ) : (
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={selectedItem.id}
              id={getPanelId(selectedItem.id)}
              role="tabpanel"
              aria-labelledby={getTabId(selectedItem.id)}
              tabIndex={0}
              initial={{
                opacity: 0,
                x: 14,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -14,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="min-w-0"
            >
              {selectedItem.content}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}