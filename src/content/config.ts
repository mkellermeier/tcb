import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),
    signupUrl: z.string().url().optional(),
    draft: z.boolean().default(false),

    summary: z.string().optional(), 
    coverImage: z
      .object({
        src: z.string(), 
        alt: z.string().optional(),
      })
      .optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
          caption: z.string().optional(),
        })
      )
      .optional(),
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

export const collections = { events, matches };