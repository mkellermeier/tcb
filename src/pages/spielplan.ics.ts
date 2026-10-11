import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildIcs } from '~/utils/ics';

export const GET: APIRoute = async () => {
  const matches = (await getCollection('matches', ({ data }) => !data.draft && !data.dateTbd)).sort(
    (a, b) => +a.data.matchDate - +b.data.matchDate
  );

  const body = buildIcs(
    'TC Bühlertal – Spielplan',
    matches.map((m) => ({
      uid: `match-${m.id}`,
      start: m.data.matchDate,
      durationHours: 4,
      summary: `${m.data.team} ${m.data.homeAway === 'home' ? 'vs.' : '@'} ${m.data.opponent}`,
      location: m.data.location,
      description: [m.data.competition, m.data.result ? `Ergebnis ${m.data.result}` : null].filter(Boolean).join(' · '),
      url: m.data.detailsUrl,
    }))
  );

  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
