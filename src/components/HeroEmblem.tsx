"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Live 3D INTI emblem; falls back to the flat logo without WebGL. */
export default function HeroEmblem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // three.js loads after first paint so it never delays the page.
    Promise.all([import("three"), import("@/lib/inti-emblem")])
      .then(([THREE, { createIntiEmblem }]) => {
        if (cancelled) return;
        const emblem = createIntiEmblem(THREE, canvas, { reduceMotion });
        if (emblem) destroy = emblem.destroy;
        else setFallback(true);
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-h-[640px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Lambang INTI tiga dimensi. Gerakkan kursor atau seret untuk memutar."
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing touch-pan-y"
      />
      {fallback && (
        <Image
          src="/images/Logo-INTI-512.png"
          alt="Lambang INTI"
          width={512}
          height={512}
          className="absolute left-[20%] top-[20%] w-[60%] h-[60%] object-contain"
        />
      )}
      <p className="hidden lg:flex absolute right-2 bottom-1 items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-white/60">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M8 12h8M5 9l-3 3 3 3M19 9l3 3-3 3" />
        </svg>
        Seret untuk memutar
      </p>
    </div>
  );
}
