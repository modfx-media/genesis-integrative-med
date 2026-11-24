"use client";

import { useEffect, useState } from "react";

/**
 * Whether the visitor prefers reduced motion.
 *
 * The first render is always false, on the server and in the browser, so
 * the hydrated markup matches. The real setting is read after mount.
 * `matchMedia` and `MediaQueryList.addEventListener` are missing in older
 * Safari; those paths use `setTimeout` instead of touching the missing API.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") {
      const id = window.setTimeout(() => setReduce(false), 0);
      return () => window.clearTimeout(id);
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(Boolean(query.matches));

    if (typeof query.addEventListener === "function") {
      apply();
      query.addEventListener("change", apply);
      return () => query.removeEventListener("change", apply);
    }

    const id = window.setTimeout(apply, 0);
    const legacy = query as MediaQueryList & {
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };
    if (typeof legacy.addListener === "function") {
      legacy.addListener(apply);
      return () => {
        window.clearTimeout(id);
        legacy.removeListener?.(apply);
      };
    }
    return () => window.clearTimeout(id);
  }, []);

  return reduce;
}
