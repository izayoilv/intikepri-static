import type { AgendaEvent } from "@/types";

export type AgendaStatus = "upcoming" | "ongoing" | "past";

/** Kepulauan Riau uses WIB (UTC+7), whatever timezone the visitor is in. */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

function wibMs(date: string, time?: string | null, endOfDay = false): number {
  const [y, m, d] = date.split("-").map(Number);
  if (time) {
    const [hh, mm] = time.split(":").map(Number);
    return Date.UTC(y, m - 1, d, hh || 0, mm || 0) - WIB_OFFSET_MS;
  }
  return endOfDay
    ? Date.UTC(y, m - 1, d, 23, 59, 59) - WIB_OFFSET_MS
    : Date.UTC(y, m - 1, d) - WIB_OFFSET_MS;
}

export function agendaStartMs(e: AgendaEvent): number {
  return wibMs(e.date, e.start_time || null);
}

export function agendaEndMs(e: AgendaEvent): number {
  return wibMs(e.end_date || e.date, e.end_time || null, true);
}

export function agendaStatus(e: AgendaEvent, now: Date): AgendaStatus {
  const t = now.getTime();
  if (t < agendaStartMs(e)) return "upcoming";
  if (t > agendaEndMs(e)) return "past";
  return "ongoing";
}

export function isAgendaVisible(e: AgendaEvent, now: Date): boolean {
  return agendaStatus(e, now) !== "past";
}

export function sortAgenda(items: AgendaEvent[]): AgendaEvent[] {
  return [...items].sort((a, b) => agendaStartMs(a) - agendaStartMs(b));
}

/** ISO 8601 date-time in WIB for structured data, e.g. "2026-11-02T09:00:00+07:00". */
export function agendaIso(date: string, time?: string | null): string {
  if (!time) return date;
  const [hh = "00", mm = "00"] = time.split(":");
  return `${date}T${hh.padStart(2, "0")}:${mm.padStart(2, "0")}:00+07:00`;
}
