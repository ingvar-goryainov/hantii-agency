# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Marketing site for **Hantii**, a boutique recruiting agency for FinTech, MarTech and digital-driven businesses, live at **https://hantii.com**. One landing page and a 404 page, built with Astro as a static site and served by a Cloudflare Worker with static assets. The brand is spelled "Hantii" everywhere.

**Read before changing anything:**

- [docs/requirements.md](docs/requirements.md): scope, decisions, requirements (FR-/NFR- IDs), approved facts, copy deck, open items.
- [docs/design.md](docs/design.md): architecture, tokens, layout, component specs, content model, Worker, deployment, verification.
- The upstream design system (https://claude.ai/artifact/9rnLwsg2jyT64C9VxSQhmB) is the source of truth for visual values. `docs/design.md` §4 mirrors it.

**Status:** v1 built (one page + 404, Worker, icons). Keep this file in sync with the code whenever commands, layout or rules change.

## Commands

Use Node 22 (`.node-version`) and npm.

```bash
npm install
npm run dev          # Astro dev server, http://localhost:4321
npm run build        # static build into dist/
npm run check        # astro check + Worker type check
npm test             # Worker unit tests (Vitest)
npm run preview      # build, then serve through the Worker at http://127.0.0.1:8787
npm run icons        # regenerate favicons and og-image (commit the output)
npm run cf-typegen   # regenerate Worker env types after editing wrangler.jsonc
```

Before you call a change done, all of these must pass: `npm run check`, `npm test`, `npm run build`. For UI changes, also run `npm run preview` and look at the page at 1440, 768 and 375px wide.

## Where things live

| Change | File |
| --- | --- |
| Any copy, figures, nav, contacts, team members | `src/data/site.ts`, and nothing else |
| Colours, type, spacing, radii, shadow | `src/styles/tokens.css`, which mirrors the design system 1:1 |
| Base type, layout primitives, shared `hn-*` classes | `src/styles/global.css` |
| A section's markup and layout | `src/components/<Section>.astro` (scoped `<style>`) |
| Section order | `src/pages/index.astro` |
| `<head>`, SEO, JSON-LD, skip link | `src/layouts/Base.astro` |
| Client JS (menu link close, copy email) | `src/scripts/site.ts`, the only script |
| Redirects, security and cache headers | `worker/policy.ts` (values) and `worker/index.ts` (handler), tested in `worker/index.test.ts` |
| Hosting, domains | `wrangler.jsonc` |
| Team portraits | `src/assets/team/<first>-<last>.jpg`: 4:5, eye line at 41.5%, metadata stripped (`docs/design.md` §12) |

## Brand rules (hard constraints)

These come from the Hantii design system. Breaking one means the change is wrong, even if it looks better.

- **Facts:** use only the approved figures: 10+ years in recruiting, 30 days average time to offer for niche roles, 500+ filled positions, 100% NDA and security. Never invent statistics, clients, logos, testimonials, awards, team names, roles or photos. The HeroFrame shortlist says "Candidate 01/02/03", never real names.
- **Voice:** "we" talking to "you". Short, declarative, no hype, no emoji. Principle headings end with a full stop. Section titles use sentence case with the key phrase in `<strong>` at the end.
- **Buttons:** uppercase verbs of 1–3 words (HIRE TOP TALENT, CONTACT US, START A SEARCH). One primary button per section. Never use a ghost button on `surface-deep`.
- **Colour:** `violet-600` (`--primary`) is the only action colour. Accent text is `aqua-700`, never `aqua-400`. `emerald-500`, `aqua-400` and `magenta-500` are never used for text. Dark panels are `surface-deep` with corner glows only, never a full-bleed gradient. Use at most one `surface-blush` card per page, plus the hero blob.
- **Logo:** use the brand PNGs as they are. Don't redraw, recolour or outline them, and never put the logo on a dark ground. Header logo is 40px tall (34px on phones).
- **Shape:** cards are flat with a `line` border. The only shadow is `shadow-float`, on the open mobile menu. Radii: `radius-sm` for buttons, `radius-md` for tiles and rows, `radius-lg` for cards and panels.
- **Motif:** the split-diamond gem (emerald left, violet right, small gap) is the only decorative motif. Keep the HeroFrame SVG geometry exactly as in `docs/design.md` §7.6.
- **Contact:** show the email as selectable text with a Copy button. Don't make a `mailto:` link the only way to reach the team.

## Code conventions

- **Tokens only:** write colours as `var(--token)`; for tints use `color-mix(in srgb, var(--token) N%, transparent)`. Raw colour values appear only in `tokens.css`, plus two places that can't read CSS variables: the `theme-color` meta in `Base.astro` and `scripts/make-icons.mjs`.
- **No frameworks:** no CSS framework, no UI framework, no client-side islands. Keep the page zero-JS except `src/scripts/site.ts` (≤ 3 KB gzip). Prefer a platform feature (Popover API, CSS) to a script.
- **Content stays in data:** components hold no user-facing strings except ARIA labels. They read from `src/data/site.ts`.
- **Images:** go through `astro:assets` `<Image>` with explicit dimensions. Don't ship the source PNGs directly.
- **Icons:** Lucide path data (ISC licence) inlined in `Icon.astro`, `stroke-width` 1.6. Don't add an icon package.
- **Accessibility:** WCAG 2.1 AA. One `h1`, and headings never skip a level. Keep the visible 3px focus ring. Hit targets are at least 44×44px. Decorative SVGs get `aria-hidden`. All motion goes inside `prefers-reduced-motion: no-preference`.
- **CSP:** the build must not emit inline executable `<script>`; only JSON-LD may be inline (`astro.config.mjs` stops Vite inlining JS). If a change adds a third-party origin, update the CSP in `worker/policy.ts` and its test in the same change.
- **Worker entry:** `worker/index.ts` may only export the default handler. The Workers runtime treats every named export of the main module as an entrypoint and refuses to start, so constants and helpers go in `worker/policy.ts`.
- **TypeScript:** strict mode. Components use PascalCase file names.

## Deployment

- Pushing to `main` deploys to production through Cloudflare Workers Builds. Other branches get non-indexed preview URLs.
- Don't run `wrangler deploy`, change DNS, or edit Cloudflare dashboard settings unless the user explicitly asks.
- Never commit secrets. The site has none; if a change seems to need one, stop and ask.

## Git

- Branch from `main` (`feat/…`, `fix/…`, `docs/…`) and open a PR. Don't push to `main` directly.
- Write commit subjects as short imperative sentences ("Add StatBand section").
- Never commit `node_modules/`, `dist/`, `.astro/`, `.wrangler/` or `.code-review-graph/`.

## Out of scope unless the user asks

Contact forms or any backend, analytics or cookies, a CMS or blog, extra languages, client logos or testimonials, and dark mode (the design system defines one light theme). The reasons are in `docs/requirements.md` §2–3.
