import type { AgendaEvent } from "@/types";

export type AgendaStatus = "upcoming" | "ongoing" | "past";

export function agendaStartMs(e: AgendaEvent): number {
  const [y, m, d] = e.date.split("-").map(Number);
  const [hh, mm] = (e.start_time || "00:00").split(":").map(Number);
  return new Date(y, m - 1, d, hh || 0, mm || 0).getTime();
}

export function agendaEndMs(e: AgendaEvent): number {
  const endDate = e.end_date || e.date;
  const [y, m, d] = endDate.split("-").map(Number);
  if (e.end_time) {
    const [hh, mm] = e.end_time.split(":").map(Number);
    return new Date(y, m - 1, d, hh || 0, mm || 0).getTime();
  }
  return new Date(y, m - 1, d, 23, 59, 59).getTime();
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
