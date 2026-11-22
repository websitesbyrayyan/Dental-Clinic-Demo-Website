import {
  useEffect,
  useState,
} from "react";

export function useActiveSection(
  sectionIds: readonly string[],
): string {
  const [activeSection, setActiveSection] = useState(
    sectionIds[0] ?? "",
  );

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(
        (element): element is HTMLElement =>
          element !== null,
      );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          );

        const nextActiveSection =
          visibleEntries[0]?.target.id;

        if (nextActiveSection) {
          setActiveSection(nextActiveSection);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return sectionIds.includes(activeSection)
    ? activeSection
    : sectionIds[0] ?? "";
}