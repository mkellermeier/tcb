import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),

    coverImage: z.string().optional(),

    meta: z.array(z.object({ label: z.string(), value: z.string() })).default([]),

    tags: z.array(z.string()).default([]),

    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
          caption: z.string().optional(),
        })
      )
      .default([]),

    draft: z.boolean().default(false),
  }),
});

const matches = defineCollection({
  type: 'content',
  schema: z.object({
    team: z.string(),
    matchDate: z.coerce.date(),
    homeAway: z.enum(['home', 'away']),
    opponent: z.string(),
    location: z.string().optional(),
    competition: z.string().optional(),
    detailsUrl: z.string().url().optional(),
    result: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { matches, posts, events };
