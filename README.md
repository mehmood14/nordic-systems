# Nordic Systems

Nordic Systems builds source-backed maps of real-world software architecture for Nordic technology companies. Each map separates documented evidence from reasoned inference and speculation, and links claims to public sources and dates.

The project is Astro static output with no database or backend. Spotify is the first real-world architecture case. Its current playback map is a research draft and is not published in production. `example-co` content demonstrates the collection format.

Repository: [github.com/mehmood14/nordic-systems](https://github.com/mehmood14/nordic-systems)

## Features

- Interactive architecture diagrams using React Flow and ELK.js.
- Claim statuses: `documented`, `inferred`, or `speculative`.
- Confidence, partial as-of dates, rationales, and references to public sources.
- Company source libraries and scenario walkthroughs.
- Build-time content validation through Astro content collections and Zod.

## Requirements

- Node.js `>=22.12.0`
- npm

## Development

Install dependencies:

```sh
npm install
```

Start the development server in background mode:

```sh
npx astro dev --background
```

The local site is available at `http://localhost:4321`. Manage the server with:

```sh
npx astro dev status
npx astro dev logs
npx astro dev stop
```

Build and preview the static site:

```sh
npm run build
npm run preview
```

The Spotify diagram and source library are available in development at `/diagram/spotify` and `/sources/spotify`. Spotify is currently marked unpublished, so those routes are excluded from production builds.

## Content Model

Content is stored as YAML in Astro collections. Files are grouped first by collection, then by company slug:

```text
src/content/
	sources/spotify/
	components/spotify/
	claims/spotify/
	flows/spotify/
	scenarios/spotify/
```

The same structure is used for other companies. Entry IDs are derived from YAML filenames, so keep filenames unique within each collection even across company folders. References between claims, components, sources, and flows use these IDs.

Collections:

- `sources`: company, title, URL, source type, and publication date; author and archived URL are optional.
- `components`: company, name, architecture layer, summary, and purpose.
- `claims`: component reference, statement, evidence status, as-of date, optional confidence and rationale, and source references.
- `flows`: component references for the endpoints, data description, sync/async mode, optional protocol, and supporting claim references.
- `scenarios`: company, title, and ordered steps referencing components and optional flows.

Dates may be `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. A documented claim requires at least one source. Inferred and speculative claims require a rationale. Keep documented and inferred architecture distinguishable, and do not invent claims, sources, URLs, or dates.

Company metadata, publication visibility, and stage labels live in `src/data/companies.ts`. The site only includes published companies in production output; draft companies remain available in development.

## Project Structure

```text
src/
	components/       Interactive diagram UI
	content/          Company-grouped sources, components, claims, flows, scenarios
	data/             Company metadata and logo manifest
	layouts/          Shared site shell
	lib/              Content assembly and logo resolution
	pages/            Homepage, methodology, diagram, and source routes
	styles/           Global and page-level styling
public/logos/       Available company SVG logos
scripts/            Supporting content and asset scripts
```

## Guidance Files

`AGENTS.md` contains project workflow guidance for coding agents. `CLAUDE.md` currently contains the same Astro development notes for Claude Code. Keep both when using both agent tools; if their guidance changes, update them together to avoid drift.
