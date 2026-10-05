import * as si from 'simple-icons';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { companies } from '../src/data/companies';

// our slug -> exact Simple Icons slug (see simpleicons.org)
const overrides: Record<string, string> = {
  // 'volvo-cars': '<simple-icons-slug>',
};

// our slugs to skip if the automatic match turns out to be the wrong brand
const exclude = new Set<string>([
  // 'magma',
]);

const norm = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');

const icons = Object.values(si).filter(
  (i: any) => i && typeof i === 'object' && i.slug && i.svg,
) as any[];

const bySlug = new Map<string, any>();
const byNorm = new Map<string, any>();
for (const i of icons) {
  bySlug.set(i.slug, i);
  byNorm.set(norm(i.slug), i);
  byNorm.set(norm(i.title), i);
}

mkdirSync('public/logos', { recursive: true });
mkdirSync('src/data', { recursive: true });

const found: string[] = [];
const missing: string[] = [];
const seen = new Set<string>();

for (const c of companies) {
  if (seen.has(c.slug)) continue;
  seen.add(c.slug);

  const file = `public/logos/${c.slug}.svg`;
  if (exclude.has(c.slug)) { rmSync(file, { force: true }); continue; }

  const icon =
    bySlug.get(overrides[c.slug] ?? '') ??
    byNorm.get(norm(c.slug)) ??
    byNorm.get(norm(c.displayName));

  if (!icon) { missing.push(c.slug); continue; }

  writeFileSync(file, icon.svg.replace('<svg ', '<svg fill="#334155" '));
  found.push(c.slug);
  console.log(`${c.slug}  ->  ${icon.title}`);
}

writeFileSync('src/data/logos.json', JSON.stringify(found.sort(), null, 2));
console.log(`\nFound ${found.length}, missing ${missing.length}`);
console.log('Missing:', missing.join(', '));
