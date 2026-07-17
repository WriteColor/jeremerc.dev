import { useEffect, RefObject } from "react";

export function useFocusTrap(ref: RefObject<HTMLElement | null>, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const modalElement = ref.current;
    
    // Get all focusable elements
    const focusableSelectors = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      "[tabindex]",
      "[contenteditable]"
    ].join(",");

    const focusableElements = Array.from(
      modalElement.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter(el => {
      // Basic visibility check
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && el.tabIndex !== -1;
    });

    if (focusableElements.length > 0) {
      // Focus first element on open (e.g. Close button or input)
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const currentElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && el.tabIndex !== -1;
      });

      if (currentElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = currentElements[0];
      const lastElement = currentElements[currentElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab -> Wrap from first to last
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab -> Wrap from last to first
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, ref]);
}
