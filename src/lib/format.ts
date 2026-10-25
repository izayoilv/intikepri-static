const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function parts(raw: string): [number, number, number] | null {
  const [y, m, d] = (raw || "").slice(0, 10).split("-").map(Number);
  if (!y || !m || !d || !MONTHS_ID[m - 1]) return null;
  return [y, m, d];
}

/** "2026-10-18" → "18 Oktober 2026" */
export function formatDateID(raw: string): string {
  const p = parts(raw);
  return p ? `${p[2]} ${MONTHS_ID[p[1] - 1]} ${p[0]}` : raw;
}

/** "2026-10-18" → "Oktober 2026" */
export function formatMonthYearID(raw: string): string {
  const p = parts(raw);
  return p ? `${MONTHS_ID[p[1] - 1]} ${p[0]}` : raw;
}

/** "2026-10-18" → { day: "18", month: "Okt" } */
export function dayMonthShortID(raw: string): { day: string; month: string } {
  const p = parts(raw);
  return p
    ? { day: String(p[2]), month: MONTHS_ID[p[1] - 1].slice(0, 3) }
    : { day: "", month: "" };
}
