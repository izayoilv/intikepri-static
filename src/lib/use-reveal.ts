"use client";

import { useEffect, useRef } from "react";

/**
 * Fades elements matching `selector` in as they scroll into view.
 * Elements already on screen are never hidden, content stays visible without
 * JavaScript, and nothing animates when the visitor prefers reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  selector: string,
  key?: unknown,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const els = Array.from(root.querySelectorAll<HTMLElement>(selector));
    els.forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal-pending");
      el.style.transitionDelay = `${(i % 6) * 70}ms`;
      io.observe(el);
    });

    return () => {
      io.disconnect();
      els.forEach((el) => {
        el.classList.remove("reveal-pending", "is-revealed");
        el.style.transitionDelay = "";
      });
    };
  }, [selector, key]);

  return ref;
}
