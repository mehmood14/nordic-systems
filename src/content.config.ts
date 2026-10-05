import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Accepts "2022", "2022-07", or "2022-07-15" so we never invent a precise date
const partialDate = z.string().regex(/^\d{4}(-\d{2}){0,2}$/);

const layer = z.enum([
  'frontend', 'api', 'service', 'data-store', 'queue', 'cache',
  'infrastructure', 'pipeline', 'monitoring', 'platform',
]);

const sources = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sources' }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    url: z.string().url(),
    archivedUrl: z.string().url().optional(),
    type: z.enum(['engineering-blog', 'talk', 'docs', 'open-source', 'other']),
    author: z.string().optional(),
    publishedAt: partialDate,
  }),
});

const components = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/components' }),
  schema: z.object({
    company: z.string(),
    name: z.string(),
    layer,
    summary: z.string(),
    why: z.string(),
  }),
});

const claims = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/claims' }),
  schema: z
    .object({
      component: reference('components'),
      statement: z.string(),
      status: z.enum(['documented', 'inferred', 'speculative']),
      confidence: z.enum(['low', 'medium', 'high']).optional(),
      asOf: partialDate,
      rationale: z.string().optional(),
      sources: z.array(reference('sources')).default([]),
    })
    .superRefine((c, ctx) => {
      if (c.status === 'documented' && c.sources.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['sources'],
          message: 'Documented claims need at least one source.' });
      }
      if (c.status !== 'documented' && !c.rationale) {
        ctx.addIssue({ code: 'custom', path: ['rationale'],
          message: 'Inferred and speculative claims need a rationale.' });
      }
    }),
});

const flows = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/flows' }),
  schema: z.object({
    from: reference('components'),
    to: reference('components'),
    data: z.string(),
    mode: z.enum(['sync', 'async']),
    protocol: z.string().optional(),
    claims: z.array(reference('claims')).default([]),
  }),
});

const scenarios = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/scenarios' }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    steps: z.array(z.object({
      component: reference('components'),
      flow: reference('flows').optional(),
      text: z.string(),
    })),
  }),
});

export const collections = { sources, components, claims, flows, scenarios };