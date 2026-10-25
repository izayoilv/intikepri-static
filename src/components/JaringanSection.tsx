"use client";

import { Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import { branches } from "@/lib/data";
import {
  KEPRI_REGIONS,
  KEPRI_VIEWBOX,
  type KepriRegionId,
} from "@/lib/kepri-map";

const ALL: KepriRegionId[] = KEPRI_REGIONS.map((r) => r.id);

/** Which regency areas each branch covers. */
function regionsFor(name: string): KepriRegionId[] {
  const n = name.toLowerCase();
  if (n.includes("provinsi")) return ALL;
  if (n.includes("tanjungpinang")) return ["tanjungpinang", "bintan"];
  if (n.includes("batam")) return ["batam"];
  if (n.includes("karimun")) return ["karimun"];
  if (n.includes("lingga")) return ["lingga"];
  if (n.includes("anambas")) return ["anambas"];
  if (n.includes("natuna")) return ["natuna"];
  return ALL;
}

const { w: W, h: H } = KEPRI_VIEWBOX;
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Zoom transform that frames the given regions' main islands. */
function frame(ids: KepriRegionId[]) {
  if (ids.length === ALL.length)
    return { s: 1, tx: 0, ty: 0, cx: W / 2, cy: H / 2 };
  const boxes = KEPRI_REGIONS.filter((r) => ids.includes(r.id)).map(
    (r) => r.focus,
  );
  const x1 = Math.min(...boxes.map((b) => b[0]));
  const y1 = Math.min(...boxes.map((b) => b[1]));
  const x2 = Math.max(...boxes.map((b) => b[2]));
  const y2 = Math.max(...boxes.map((b) => b[3]));
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  const s = Math.min(
    5,
    (W * 0.42) / Math.max(x2 - x1, 1),
    (H * 0.42) / Math.max(y2 - y1, 1),
  );
  return { s, tx: W / 2 - cx * s, ty: H / 2 - cy * s, cx, cy };
}

export default function JaringanSection({ index = "04" }: { index?: string }) {
  const [active, setActive] = useState(0);
  const selected = useMemo(
    () => regionsFor(branches[active]?.name ?? ""),
    [active],
  );
  const view = useMemo(() => frame(selected), [selected]);
  const whole = selected.length === ALL.length;

  const place = (x: number, y: number) => ({
    left: `${((x * view.s + view.tx) / W) * 100}%`,
    top: `${((y * view.s + view.ty) / H) * 100}%`,
  });
  const CLUSTER: KepriRegionId[] = ["batam", "bintan", "tanjungpinang"];
  const labels: {
    id: string;
    name: string;
    above?: boolean;
    left: string;
    top: string;
  }[] = [];
  if (whole) {
    for (const r of KEPRI_REGIONS) {
      if (CLUSTER.includes(r.id)) continue;
      labels.push({
        id: r.id,
        name: r.name,
        ...place((r.focus[0] + r.focus[2]) / 2, r.focus[3]),
      });
    }
    const c = KEPRI_REGIONS.filter((r) => CLUSTER.includes(r.id)).map(
      (r) => r.focus,
    );
    const x =
      (Math.min(...c.map((b) => b[0])) + Math.max(...c.map((b) => b[2]))) / 2;
    const y = Math.min(...c.map((b) => b[1]));
    labels.push({
      id: "cluster",
      name: "Batam · Bintan · Tanjungpinang",
      above: true,
      ...place(x, y),
    });
  } else {
    const names = KEPRI_REGIONS.filter((r) => selected.includes(r.id));
    const c = names.map((r) => r.focus);
    const x =
      (Math.min(...c.map((b) => b[0])) + Math.max(...c.map((b) => b[2]))) / 2;
    const y = Math.max(...c.map((b) => b[3]));
    labels.push({
      id: "sel",
      name: names.map((r) => r.name).join(" · "),
      ...place(x, y),
    });
  }

  function pickRegion(id: KepriRegionId) {
    const i = branches.findIndex((b) => {
      const r = regionsFor(b.name);
      return r.length < ALL.length && r.includes(id);
    });
    if (i >= 0) setActive(i);
  }

  return (
    <section id="jaringan" className="bg-[#FAF6EF] px-4 md:px-8 py-16 md:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-8 lg:gap-16 items-center">
        <div className="min-w-0">
          <SectionHeading
            index={index}
            label="Jaringan"
            title={
              <>
                {branches.length} cabang di seluruh{" "}
                <span className="italic text-[#A42A28]">Kepulauan Riau</span>.
              </>
            }
          />

          {/* Phones: every branch visible as wrapping chips. */}
          <div className="lg:hidden mt-6 flex flex-wrap gap-2">
            {branches.map((b, i) => {
              const on = i === active;
              return (
                <button
                  key={b.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  className={`px-3.5 py-2.5 font-sans text-[13.5px] leading-tight text-left font-medium border transition-colors ${on ? "bg-[#A42A28] border-[#A42A28] text-white" : "bg-white border-[#E5DBCD] text-[#1C1714]"}`}
                >
                  {b.name.replace(/^INTI\s+/, "").replace(" & Kab. ", " & ")}
                </button>
              );
            })}
          </div>

          {/* Larger screens: the full list. */}
          <ul className="hidden lg:flex mt-9 flex-col gap-2">
            {branches.map((b, i) => {
              const on = i === active;
              return (
                <li key={b.name}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-3.5 text-left border transition-colors ${on ? "bg-white border-[#A42A28]" : "border-[#E5DBCD] hover:bg-white/60"}`}
                  >
                    <span className="flex items-center gap-3.5 min-w-0">
                      <span className="font-serif italic text-[13px] text-[#8F6440] w-5 flex-shrink-0">
                        {pad2(i + 1)}
                      </span>
                      <span className="font-sans text-[15px] font-semibold text-[#1C1714]">
                        {b.name}
                      </span>
                    </span>
                    <span className="font-sans text-[13px] text-[#6B6B6B] text-right">
                      {b.region}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="min-w-0 m-0">
          <div className="relative aspect-square overflow-hidden bg-[#120D0C] select-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(232,179,124,0.13)_1px,transparent_1px)] [background-size:20px_20px]"
            />
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label={`Peta Kepulauan Riau, menyorot wilayah ${branches[active]?.name}`}
            >
              <g
                className="transition-transform duration-[1100ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
                style={{
                  transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`,
                }}
              >
                {KEPRI_REGIONS.map((r) => {
                  const on = selected.includes(r.id);
                  return (
                    <path
                      key={r.id}
                      d={r.d}
                      vectorEffect="non-scaling-stroke"
                      onClick={() => pickRegion(r.id)}
                      className={`cursor-pointer transition-[fill,stroke,opacity] duration-500 ${on ? "fill-[#C4282A] stroke-[#F2C796] [filter:drop-shadow(0_0_10px_rgba(224,57,58,0.65))]" : "fill-[#2E211C] stroke-[#E8B37C]/35 hover:fill-[#4A3229]"}`}
                      strokeWidth={on ? 1.2 : 0.8}
                    />
                  );
                })}
              </g>
            </svg>

            <span
              aria-hidden="true"
              className="map-ping absolute w-24 h-24 -ml-12 -mt-12 rounded-full border border-[#F2C796]/70 pointer-events-none transition-[left,top] duration-[1100ms] ease-[cubic-bezier(.65,0,.35,1)]"
              style={{
                left: `${((view.cx * view.s + view.tx) / W) * 100}%`,
                top: `${((view.cy * view.s + view.ty) / H) * 100}%`,
                opacity: whole ? 0 : 1,
              }}
            />

            {labels.map((l) => (
              <span
                key={l.id}
                aria-hidden="true"
                className={`absolute ${parseFloat(l.left) < 22 ? "translate-x-[-12px]" : parseFloat(l.left) > 78 ? "-translate-x-[calc(100%-12px)]" : "-translate-x-1/2"} ${l.above ? "-translate-y-full -mt-2" : "mt-2"} whitespace-nowrap font-sans text-[9.5px] sm:text-xs tracking-[0.08em] sm:tracking-[0.1em] uppercase text-white/85 pointer-events-none transition-[left,top] duration-[1100ms] ease-[cubic-bezier(.65,0,.35,1)]`}
                style={{ left: l.left, top: l.top }}
              >
                {l.name}
              </span>
            ))}

            {!whole && (
              <button
                type="button"
                onClick={() => setActive(0)}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-2 font-sans text-xs font-medium text-white transition-colors"
              >
                <Maximize2 size={13} aria-hidden="true" /> Seluruh Kepri
              </button>
            )}

            <div className="hidden sm:block absolute left-6 top-6 right-40 pointer-events-none">
              <p className="text-white">
                <span className="block font-sans text-[10.5px] tracking-[0.2em] uppercase text-[#D9A56F]">
                  Cabang terpilih
                </span>
                <span className="block mt-1 font-serif text-lg sm:text-2xl font-bold">
                  {branches[active]?.name}
                </span>
                <span className="block mt-0.5 font-sans text-xs sm:text-sm text-white/70">
                  {branches[active]?.region}
                </span>
              </p>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            Cabang terpilih: {branches[active]?.name}
          </p>
          <p className="sm:hidden mt-3 font-serif text-lg font-bold text-[#1C1714]">
            {branches[active]?.name}
            <span className="ml-2 font-sans text-sm font-normal text-[#6B6B6B]">
              {branches[active]?.region}
            </span>
          </p>
          <figcaption className="mt-2 sm:mt-3 font-sans text-xs text-[#6B6B6B]">
            Batas wilayah kabupaten/kota disederhanakan dari data GADM.
            Ilustrasi, bukan peta resmi.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
