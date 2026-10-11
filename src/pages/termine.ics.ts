import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildIcs } from '~/utils/ics';

export const GET: APIRoute = async () => {
  const events = (await getCollection('events', ({ data }) => !data.draft)).sort(
    (a, b) => +a.data.startDate - +b.data.startDate
  );

  const body = buildIcs(
    'TC Bühlertal – Termine',
    events.map((e) => ({
      uid: `event-${e.id}`,
      start: e.data.startDate,
      endDate: e.data.endDate,
      time: e.data.time,
      allDay: !e.data.time,
      summary: e.data.title,
      location: e.data.location,
      description: e.data.description,
    }))
  );

  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
