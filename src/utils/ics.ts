// Minimaler iCalendar-Export. Uhrzeiten sind "floating" (lokale Zeit), Ganztägiges als DATE.
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

function berlinParts(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(d)
      .map((x) => [x.type, x.value])
  );
  return {
    date: `${p.year}${p.month}${p.day}`,
    time: `${p.hour}${p.minute}00`,
    hasTime: `${p.hour}${p.minute}` !== '0000',
  };
}

export interface IcsEvent {
  uid: string;
  start: Date;
  /** "HH:MM" überschreibt die Uhrzeit von start (für Events) */
  time?: string;
  allDay?: boolean;
  durationHours?: number;
  endDate?: Date;
  summary: string;
  location?: string;
  description?: string;
  url?: string;
}

export function buildIcs(name: string, events: IcsEvent[]): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d+Z$/, 'Z');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TC Buehlertal//Website//DE', `X-WR-CALNAME:${esc(name)}`];

  for (const e of events) {
    const s = berlinParts(e.start);
    const time = e.time ? `${e.time.replace(':', '')}00` : !e.allDay && s.hasTime ? s.time : null;
    lines.push('BEGIN:VEVENT', `UID:${e.uid}@tcbuehlertal`, `DTSTAMP:${stamp}`);
    if (time) {
      const startMs = Date.UTC(
        +s.date.slice(0, 4),
        +s.date.slice(4, 6) - 1,
        +s.date.slice(6, 8),
        +time.slice(0, 2),
        +time.slice(2, 4)
      );
      const end = new Date(startMs + (e.durationHours ?? 2) * 3600_000).toISOString().replace(/[-:]/g, '').slice(0, 15);
      lines.push(`DTSTART:${s.date}T${time}`, `DTEND:${end}`);
    } else {
      const last = e.endDate ? berlinParts(e.endDate).date : s.date;
      const lastMs = Date.UTC(+last.slice(0, 4), +last.slice(4, 6) - 1, +last.slice(6, 8)) + 86400_000; // DTEND exklusiv
      lines.push(
        `DTSTART;VALUE=DATE:${s.date}`,
        `DTEND;VALUE=DATE:${new Date(lastMs).toISOString().slice(0, 10).replace(/-/g, '')}`
      );
    }
    lines.push(`SUMMARY:${esc(e.summary)}`);
    if (e.location) lines.push(`LOCATION:${esc(e.location)}`);
    if (e.description) lines.push(`DESCRIPTION:${esc(e.description)}`);
    if (e.url) lines.push(`URL:${e.url}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}
