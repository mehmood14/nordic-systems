import { getCollection } from 'astro:content';
import { companies, type Company } from '../data/companies';
import type {
  DiagramClaim,
  DiagramEdgeData,
  DiagramGraph,
  DiagramNodeData,
  DiagramScenario,
  DiagramSource,
} from '../components/ArchitectureDiagram';

function canViewCompany(company: Company) {
  return import.meta.env.DEV || company.published;
}

export function getVisibleCompanies() {
  return companies.filter(canViewCompany);
}

export interface LibrarySource {
  id: string;
  title: string;
  url: string;
  archivedUrl?: string;
  type: string;
  author?: string;
  publishedAt: string;
  components: { id: string; name: string }[];
}

export async function getCompanySourceLibrary(companySlug: string): Promise<LibrarySource[] | undefined> {
  const company = getVisibleCompanies().find((entry) => entry.slug === companySlug);
  if (!company) return undefined;

  const [sources, components, claims] = await Promise.all([
    getCollection('sources'),
    getCollection('components'),
    getCollection('claims'),
  ]);
  const companyComponents = components.filter((component) => component.data.company === company.slug);
  const componentById = new Map(companyComponents.map((component) => [component.id, component]));
  const componentsBySource = new Map<string, { id: string; name: string }[]>();

  for (const claim of claims) {
    const component = componentById.get(claim.data.component.id);
    if (!component) continue;
    for (const source of claim.data.sources) {
      const citedBy = componentsBySource.get(source.id) ?? [];
      if (!citedBy.some((entry) => entry.id === component.id)) {
        citedBy.push({ id: component.id, name: component.data.name });
      }
      componentsBySource.set(source.id, citedBy);
    }
  }

  return sources
    .filter((source) => source.data.company === company.slug)
    .map((source) => ({
      id: source.id,
      title: source.data.title,
      url: source.data.url,
      archivedUrl: source.data.archivedUrl,
      type: source.data.type,
      author: source.data.author,
      publishedAt: source.data.publishedAt,
      components: componentsBySource.get(source.id) ?? [],
    }));
}

export async function getCompanyDiagram(companySlug: string): Promise<DiagramGraph | undefined> {
  const company = getVisibleCompanies().find((entry) => entry.slug === companySlug);
  if (!company) return undefined;

  const [sources, components, claims, flows, scenarios] = await Promise.all([
    getCollection('sources'),
    getCollection('components'),
    getCollection('claims'),
    getCollection('flows'),
    getCollection('scenarios'),
  ]);
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const companyComponents = components.filter((component) => component.data.company === company.slug);
  const componentIds = new Set(companyComponents.map((component) => component.id));
  const companyClaims = claims.filter((claim) => componentIds.has(claim.data.component.id));
  const claimsByComponent = new Map<string, DiagramClaim[]>();
  const claimById = new Map<string, DiagramClaim>();

  for (const claim of companyClaims) {
    const diagramClaim: DiagramClaim = {
      id: claim.id,
      statement: claim.data.statement,
      status: claim.data.status,
      confidence: claim.data.confidence,
      asOf: claim.data.asOf,
      rationale: claim.data.rationale,
      sources: claim.data.sources.flatMap((reference) => {
        const source = sourceById.get(reference.id);
        const sourceData: DiagramSource | undefined = source && {
          id: source.id,
          title: source.data.title,
          url: source.data.url,
          publishedAt: source.data.publishedAt,
        };
        return sourceData ? [sourceData] : [];
      }),
    };
    claimById.set(claim.id, diagramClaim);
    claimsByComponent.set(claim.data.component.id, [
      ...(claimsByComponent.get(claim.data.component.id) ?? []),
      diagramClaim,
    ]);
  }

  const nodes: DiagramNodeData[] = companyComponents.map((component) => ({
    id: component.id,
    name: component.data.name,
    layer: component.data.layer,
    summary: component.data.summary,
    why: component.data.why,
    claims: claimsByComponent.get(component.id) ?? [],
  }));
  const edges: DiagramEdgeData[] = flows
    .filter((flow) => componentIds.has(flow.data.from.id) && componentIds.has(flow.data.to.id))
    .map((flow) => ({
      id: flow.id,
      from: flow.data.from.id,
      to: flow.data.to.id,
      data: flow.data.data,
      mode: flow.data.mode,
      protocol: flow.data.protocol,
      claims: flow.data.claims.flatMap((reference) => {
        const claim = claimById.get(reference.id);
        return claim ? [claim] : [];
      }),
    }));
  const diagramScenarios: DiagramScenario[] = scenarios
    .filter((scenario) => scenario.data.company === company.slug)
    .map((scenario) => ({
      id: scenario.id,
      title: scenario.data.title,
      steps: scenario.data.steps.map((step) => ({
        component: step.component.id,
        flow: step.flow?.id,
        text: step.text,
      })),
    }));

  return { company: company.slug, nodes, edges, scenarios: diagramScenarios };
}
