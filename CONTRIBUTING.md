# Contributing to dcuobot-web

Thanks for wanting to contribute! This covers setup and conventions specific
to this repo. For the general workflow (branching, PR process, code of
conduct), see the [org-wide CONTRIBUTING.md](https://github.com/DCUOBot/.github/blob/main/CONTRIBUTING.md).

## Prerequisites

- Node.js **24+** (see `engines` in `package.json`)
- npm

## Setup

1. Clone the repo:
   ```
   git clone https://github.com/DCUOBot/dcuobot-web.git
   ```
2. Copy `.env.example` to `.env`. The default values talk to the production
   API, so this is only needed if you want to point the app at a local
   [dcuobot-api](https://github.com/DCUOBot/dcuobot-api) instance instead.
3. Install dependencies:
   ```
   npm install
   ```
4. Run it locally:
   ```
   npm run dev
   ```

A pre-commit hook (via husky + lint-staged) automatically lints and
formats staged files, so most style issues are caught before you even open a
PR.

## Project structure

This project is organized **package-by-feature**, not package-by-layer. Each
feature under `src/features/` owns its own routes, API calls, queries,
components, models, translations, and tests:

```
src/features/characters/
├── CharacterDetails.tsx        # page component (route target)
├── CharactersRanking.tsx       # page component (route target)
├── characters.routes.ts        # TanStack Router route definitions
├── api.ts                      # HTTP calls to the backend
├── queries.ts                  # TanStack Query query option factories
├── components/                 # feature-scoped presentational components
├── models/                     # TypeScript types for API response shapes
├── fixtures/                   # test data factories
└── locales/                    # en.ts / de.ts translation bundles
```

Shared code lives outside `features/`:

- **`src/components/`** — components used by more than one feature (e.g.
  `StatList`, `EntitySummaryCard`, `ErrorBoundary`). `src/components/ui/`
  holds the shadcn-derived design system primitives — treat those as
  generated/vendored rather than hand-editing their structure.
- **`src/lib/`** — framework-agnostic utilities and app config
  (`config.ts`, formatters, route search-param helpers, etc.).
- **`src/i18n/`** — i18next setup, plus `loadFeatureLocale`, which lazily
  loads a feature's translation bundle from its route loader so translations
  are code-split alongside the feature.
- **`src/app/`** — the root route (shared layout: header, footer, loading
  bar, theming, error boundary).

When adding a new feature, mirror this structure rather than adding files to
shared folders.

## Coding conventions

- **All user-facing text goes through i18next** (`t('namespace.key')`), with
  matching entries added to both `locales/en.ts` and `locales/de.ts`. The
  one exception is the home page's example Discord embeds, which are static
  mockups of bot output and intentionally hardcoded.
- **Extract shared UI instead of duplicating it.** If you're writing a
  component that looks like an existing one in another feature (e.g. a
  character-specific and league-specific version of the same layout), pull
  the shared shape into `src/components/` and pass in what differs via
  props — see `StatList`, `RankingStat`, and `EntitySummaryCard` for
  examples.
- **Data fetching** goes through a feature's `api.ts` (raw HTTP call) and
  `queries.ts` (TanStack Query `queryOptions` factory); route loaders
  prefetch via `queryClient.query(...)`, and page components read the
  result with `useSuspenseQuery`.
- Style with Tailwind utility classes; avoid introducing custom CSS files.
- Keep TypeScript strict — no `any`, no `@ts-ignore`/`@ts-expect-error`.

## Testing

- Add or update tests for any new/changed behavior. Tests live next to the
  file they cover, as `*.test.ts`/`*.test.tsx`.
- Run before opening a PR:
  ```
  npm run lint
  npm run format:check
  npm run build
  npm test
  ```
- Since this is a UI, please also click through any affected pages with
  `npm run dev` — type checks and tests verify correctness, not that a
  feature looks or feels right.

## Opening a PR

PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/)
(e.g. `feat: add league comparison page`, `fix: correct world id formatting`)
— this is enforced by CI and drives automated release versioning. Please
also make sure:

- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm test` passes
- [ ] New/changed text is localized in both `en` and `de`
- [ ] New/changed UI has been manually verified in the browser

## Questions

Open a discussion or issue if anything here is unclear.
