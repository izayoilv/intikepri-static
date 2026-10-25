const LINES = [
  "Tulus memberi, ikhlas mengabdi",
  "To give sincerely, to serve selflessly",
];

function Star() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="#E8B37C"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" />
    </svg>
  );
}

/** Red band with the motto scrolling in Indonesian, English and Chinese. */
export default function MottoBand() {
  const row = [...LINES, ...LINES, ...LINES];
  return (
    <div className="bg-[#A42A28] text-white overflow-hidden py-6 md:py-7 border-t border-white/10">
      <p className="sr-only">
        Motto INTI: Tulus memberi, ikhlas mengabdi. 以诚相予，以心相奉。
      </p>
      <div
        className="motto-track flex w-max items-center gap-14 whitespace-nowrap"
        aria-hidden="true"
      >
        {[0, 1].map((copy) =>
          row.map((line, i) => (
            <span key={`${copy}-${i}`} className="flex items-center gap-14">
              <span className="font-serif italic font-medium text-[26px] md:text-[40px]">
                {line}
              </span>
              <Star />
              <span
                lang="zh"
                className="font-zh text-[22px] md:text-[32px] tracking-[0.12em] text-white/90"
              >
                以诚相予 · 以心相奉
              </span>
              <Star />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
