import type { ReactNode } from "react";

/** Numbered label + large serif title used by every homepage section. */
export default function SectionHeading({
  index,
  label,
  title,
  tone = "light",
  className = "",
}: {
  index?: string;
  label: string;
  title: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <p
        className={`flex items-center gap-3 mb-4 font-sans text-xs font-semibold tracking-[0.24em] uppercase ${dark ? "text-[#D9A56F]" : "text-[#8F6440]"}`}
      >
        {index && (
          <span className="font-serif italic text-[15px] tracking-normal">
            {index}
          </span>
        )}
        <span
          className={`w-7 h-px ${dark ? "bg-[#D9A56F]" : "bg-[#8F6440]"}`}
          aria-hidden="true"
        />
        {label}
      </p>
      <h2
        className={`font-serif text-[2.1rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem] font-bold tracking-[-0.015em] text-balance ${dark ? "text-white" : "text-[#1C1714]"}`}
      >
        {title}
      </h2>
    </div>
  );
}
