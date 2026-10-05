import type { Company } from '../data/companies';
import logoSlugs from '../data/logos.json';

export function logoFor(company: Company): string | undefined {
  return company.logo ?? (logoSlugs.includes(company.slug) ? `/logos/${company.slug}.svg` : undefined);
}