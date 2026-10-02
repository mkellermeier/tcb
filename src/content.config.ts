import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/matches' }),
  schema: z.object({
    team: z.string(),
    matchDate: z.coerce.date(),
    dateTbd: z.boolean().optional(), // ponytail: matchDate is then just a sort placeholder
    homeAway: z.enum(['home', 'away']),
    opponent: z.string(),
    location: z.string().optional(),
    competition: z.string().optional(),
    detailsUrl: z.url().optional(),
    result: z.string().optional(),
    matchResults: z
      .array(
        z.object({
          position: z.string(),
          tcbPlayer: z.string(),
          opponent: z.string(),
          score: z.string(),
          won: z.boolean(),
        })
      )
      .optional(),
    coverImage: z.string().optional(),
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

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
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
