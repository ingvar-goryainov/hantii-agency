# Hantii Agency

Website for Hantii, a boutique recruiting agency for FinTech, MarTech and digital-driven businesses: **https://hantii.com**.

One static page built with [Astro](https://astro.build), served by a Cloudflare Worker with static assets. Pushing to `main` deploys it.

## Quick start

Needs Node 22.12+ (see `.node-version`).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run check` | Astro and TypeScript checks, including the Worker |
| `npm test` | Worker unit tests (redirects, security and cache headers) |
| `npm run preview` | Build, then serve through the real Worker at http://127.0.0.1:8787 |
| `npm run icons` | Regenerate favicons and the share image in `public/` |

## Editing content

All copy, figures, contacts and team members live in [`src/data/site.ts`](src/data/site.ts). Only the figures and people approved in [docs/requirements.md](docs/requirements.md) §5 may appear.

To add a team member:

1. Prepare a 4:5 head-and-shoulders portrait with the eye line at 41.5% from the top and metadata stripped ([docs/design.md](docs/design.md) §12).
2. Save it as `src/assets/team/<first>-<last>.jpg`.
3. Import it in `src/data/site.ts` and add an entry to `team.members`.

Colours, type and spacing come from the Hantii design system through [`src/styles/tokens.css`](src/styles/tokens.css).

## Deployment

The site runs as the Cloudflare Worker `hantii` (see [`wrangler.jsonc`](wrangler.jsonc)) on the custom domains `hantii.com` and `www.hantii.com`. The Worker redirects `www` and `http` to `https://hantii.com` and adds security headers.

One-time setup in the Cloudflare dashboard:

1. **Workers & Pages → Create → Import a repository** and pick `ingvar-goryainov/hantii-agency`.
2. Set the build command to `npm run build` and the deploy command to `npx wrangler deploy`, with production branch `main`.
3. The `hantii.com` zone must be in the same Cloudflare account, with no existing A, AAAA or CNAME records on the apex or `www`. The custom domains create those records.

After that, every merge to `main` deploys to production and other branches get `noindex` preview URLs. To roll back, open **Workers & Pages → hantii → Deployments**.

## Docs

- [AGENTS.md](AGENTS.md): rules for AI coding agents (brand constraints, conventions)
- [docs/requirements.md](docs/requirements.md): scope, requirements, approved content, open items
- [docs/design.md](docs/design.md): architecture, tokens, components, Worker, verification
