"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { bidangPengurus, branches } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const tahunBerkarya = new Date().getFullYear() - 2004;

  const stats = [
    { value: branches.length, suffix: "", label: "Cabang se-Kepri" },
    { value: tahunBerkarya, suffix: "+", label: "Tahun Berkarya" },
    { value: bidangPengurus.length, suffix: "", label: "Bidang Pengurus" },
  ];

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#F7F7F7] border-y border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-3 divide-x divide-[#E5E5E5]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-2">
              <p className="font-serif text-3xl md:text-5xl font-bold text-[#A42A28]">
                <span className="stat-number" data-value={s.value}>
                  0
                </span>
                {s.suffix}
              </p>
              <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#999999] mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
