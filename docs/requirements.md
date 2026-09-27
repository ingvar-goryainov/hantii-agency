# Hantii Agency website — requirements

| | |
| --- | --- |
| Status | Draft v1 — approved scope, copy pending owner review |
| Owner | Ihor Pysmennyi |
| Domain | `hantii.com` (Cloudflare) |
| Design source | Hantii design system — https://claude.ai/artifact/9rnLwsg2jyT64C9VxSQhmB |
| Related | [design.md](design.md) (how it is built), [../AGENTS.md](../AGENTS.md) (rules for coding agents) |

## 1. Purpose

Hantii is a boutique recruiting agency for FinTech, MarTech and digital-driven businesses. The website is its public front door: it tells a hiring founder or manager, in under a minute, what Hantii recruits for, how it works, why it is different, and how to start a search.

**Goals**

1. Explain the offer and the markets served clearly enough that a qualified visitor contacts the team.
2. Build trust through the brand's own principles and approved figures, never through invented proof.
3. Make contacting the team frictionless: the email is visible, copyable and one click away.
4. Look and behave exactly like the Hantii design system on every screen size.

**Primary audience:** founders, hiring managers and HR leads at startups and scale-ups in Web3 & Crypto, FinTech, MarTech, iGaming and AI & Deep Tech.
**Secondary audience:** candidates checking the agency's credibility. v1 has no candidate-specific content.

## 2. Scope

**In scope (v1)**

- A single landing page at `/` with the sections in §4, in the order the design system fixes.
- A branded 404 page.
- Favicons, social share image, sitemap, robots.txt, structured data.
- Hosting on Cloudflare at `hantii.com`, `www.hantii.com` redirecting to the apex, auto-deploy from the GitHub `main` branch.

**Out of scope (v1)** — each needs a separate decision before work starts

- Contact form or any backend that accepts user input.
- CMS, blog, case studies, vacancies board, candidate portal.
- Languages other than English.
- Analytics, tracking pixels, cookies (and therefore a consent banner).
- Client logos, testimonials, or any figure not listed in §5.2.

## 3. Decisions

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Astro, static output, plain CSS on design tokens | Zero JS by default, build-time image optimisation, room for more pages later. |
| D2 | Cloudflare Worker with static assets + Workers Builds Git integration | Domain is already on Cloudflare; push to `main` deploys; one small Worker handles redirect and headers. |
| D3 | Contact = visible email + Copy button, LinkedIn, Instagram. No form. | Matches the brand book; no backend, no spam handling, no personal data stored. |
| D4 | Copy drafted in the brand voice; team data only as supplied by the owner (§5.2) | Design fixes structure but not all copy; names, roles and photos must never be invented. |
| D5 | English only | The brand book and all approved copy are English. |

## 4. Functional requirements

Section IDs in brackets are the page anchors.

| ID | Requirement |
| --- | --- |
| FR-01 | **Header** — sticky at the top on all widths. Shows the Hantii lockup logo (40px tall, 34px on phones) linking to `/`, navigation to About, Domain, Approach, Why us, Team, Contacts, and a small primary CONTACT US button to `#contacts`. |
| FR-02 | **Mobile menu** — below the header breakpoint the navigation collapses behind a menu button. The button exposes its state (`aria-expanded`), the panel closes on Esc, on outside click and when a link is chosen, and focus returns to the button. Without JavaScript the navigation stays reachable. |
| FR-03 | **Hero** [`#about`] — eyebrow, h1 with its first phrase on its own line in the accent colour, lede, primary HIRE TOP TALENT (to `#contacts`) and ghost OUR APPROACH (to `#approach`). The HeroFrame illustration sits in the right column and stacks under the copy on narrow screens. |
| FR-04 | **HeroFrame** — the blush blob behind a thin browser window, geometry copied from the design system. Inside the window, an illustrative shortlist labelled Candidate 01, 02, 03. The blob may drift slowly; motion stops under `prefers-reduced-motion`. The illustration is decorative and hidden from assistive tech. |
| FR-05 | **StatBand** — dark panel with exactly the four approved figures (§5.2), overlapping the bottom of the hero. Four columns on desktop, two on narrow screens. |
| FR-06 | **Our domain** [`#domain`] — heading plus two lists: Industries (Web3 & Crypto, FinTech, MarTech, iGaming, AI & Deep Tech) and Functions (Product, Growth, Marketing, Engineering & Tech), each row with a line icon in a tile. |
| FR-07 | **Our approach** [`#approach`] — on the mist ground; heading plus four principle cards, each with the gem marker, a title and a short body. |
| FR-08 | **Why choose us** [`#why`] — an intro column that stays in view (sticky) while three items scroll past on desktop; the third item is a dark panel carrying "AI can't read people. We can." Stacks to one column on narrow screens. |
| FR-09 | **Core team** [`#team`] — heading, one warm intro card, and a card per team member: 4:5 portrait, name, role, LinkedIn button. A member without a photo shows the placeholder state (gem on a mist-to-blush ground, "Photo coming soon"); a member without a LinkedIn URL shows no button. |
| FR-10 | **Contacts** [`#contacts`] — dark panel with heading, lede, START A SEARCH button (opens the visitor's mail client addressed to the team) and three rows: email as selectable text with a Copy button, LinkedIn, Instagram. Copy puts `team@hantii.com` on the clipboard and announces "Copied" to screen readers; if copying is unavailable the button is hidden and the email stays selectable. |
| FR-11 | **Footer** — mist ground, logo, navigation repeat, social links, copyright line with the current year. |
| FR-12 | **404** — branded page for any unknown path, served with HTTP 404, with a way back to the homepage. |
| FR-13 | **Metadata** — unique title and meta description, canonical URL `https://hantii.com/`, Open Graph and Twitter card tags with a 1200×630 share image, favicons (32, 48, SVG or PNG mark) and Apple touch icon, `theme-color`. |
| FR-14 | **Structured data** — JSON-LD `EmploymentAgency` with name, URL, logo, email and `sameAs` (LinkedIn, Instagram). |
| FR-15 | **Crawling** — `sitemap-index.xml` generated at build; `robots.txt` allows all and points to the sitemap. Hosts other than `hantii.com` (e.g. preview URLs) send `X-Robots-Tag: noindex`. |
| FR-16 | **Canonical host** — `www.hantii.com/*` answers 301 to `https://hantii.com/*`, keeping path and query. HTTP is upgraded to HTTPS. |
| FR-17 | **In-page navigation** — anchor links scroll to their section without the sticky header covering the section heading; smooth scrolling only when reduced motion is not requested. |

## 5. Content requirements

### 5.1 Voice

- "We" (the agency) speaking to "you" (the hiring founder or manager). Short, declarative sentences. No hype, no superlatives, no emoji.
- Principle headings are sentences ending in a full stop ("We protect your time."). Section titles use sentence case with the key phrase at the end set in bold.
- Buttons are uppercase verbs, one to three words: HIRE TOP TALENT, CONTACT US, START A SEARCH, OUR APPROACH.
- Markets and functions are named exactly as in FR-06.

### 5.2 Approved facts — the only figures and claims allowed

| Figure | Label |
| --- | --- |
| 10+ | Years in recruiting |
| 30 | Days average time to offer for niche roles |
| 500+ | Filled positions |
| 100% | NDA and security |

Contacts (confirmed by the owner 2026-09-27): `team@hantii.com` · LinkedIn `https://www.linkedin.com/company/hantii-agency` · Instagram `https://www.instagram.com/hantii.agency`.

Core team (supplied by the owner 2026-09-27), in this order:

| Name | Role | LinkedIn | Portrait |
| --- | --- | --- | --- |
| Vlada Havriushova | Co-Founder | https://www.linkedin.com/in/vlada-havriushova-50093914b/ | `src/assets/team/vlada-havriushova.jpg` |
| Alona Zolotoverkha | Co-Founder | https://www.linkedin.com/in/alenazolotoverkha/ | `src/assets/team/alona-zolotoverkha.jpg` |

Never add statistics, client names or logos, testimonials, awards, team names, roles or photos that the owner has not supplied.

### 5.3 Placeholder policy

- Every team member shown is a real person from §5.2. A future member supplied without a photo uses the placeholder state of FR-09 ("Photo coming soon"); without a LinkedIn URL, no button. Never add made-up members to fill the grid.
- The HeroFrame shortlist is illustrative only ("Candidate 01"…). Never real names.

### 5.4 Copy deck (draft v1 — owner to approve)

Lines in quotation marks marked ✔ come from the brand book and are approved; everything else is draft.

**Meta**
- Title: Hantii — Boutique recruiting for FinTech, MarTech & digital-driven businesses
- Description: Hantii is a boutique recruiting agency for FinTech, MarTech, Web3, iGaming and AI businesses. 10+ years in recruiting, 500+ filled positions.

**Hero**
- Eyebrow: About us
- H1: **Boutique recruiting** (accent line) / for FinTech, MarTech & digital-driven businesses ✔
- Lede: We help ambitious startups build the right team at every stage of growth. ✔
- Buttons: HIRE TOP TALENT · OUR APPROACH

**StatBand** — visually hidden heading "By the numbers"; figures from §5.2.

**Our domain**
- Eyebrow: Our domain
- Title: We work where **the market is moving.** ✔
- Lede: We recruit for the markets we know from the inside, across the functions that drive growth.
- Lists: Industries · Functions (FR-06)

**Our approach**
- Eyebrow: Our approach
- Title: How we **run every search.**
- Lede: Four principles we keep, whatever the role.
- Every search starts with clarity, not assumptions. ✔ — Before we contact a single candidate, we agree with you on the role, the must-haves and what a great hire looks like.
- Quality over quantity. ✔ — You get a short list of people we have spoken to and vetted, not a stack of CVs.
- Honesty, even when it's inconvenient. ✔ — If the brief, the budget or a candidate isn't right, we tell you early and plainly.
- We protect your time. ✔ — We screen hard, so every interview you take is worth taking.

**Why choose us**
- Eyebrow: Why choose us
- Title: A partner who **knows your market.**
- Lede: Boutique by design. The recruiters who take your brief are the ones who run your search.
- Niche expertise. — 10+ years recruiting for FinTech, MarTech, Web3 and other digital-driven businesses. We know the roles and where the people are.
- Speed without shortcuts. — Niche roles close in 30 days on average from brief to offer, and every candidate is still vetted by us.
- (dark) AI can't read people. **We can.** ✔ — Tools help us search. The judgement on motivation, fit and character stays human.

**Core team**
- Eyebrow: Core team
- Title: The people **behind your search.**
- Warm intro card: A small team with deep networks in the markets we serve. You always know who is working on your role.
- Member cards: Vlada Havriushova — Co-Founder ✔ · Alona Zolotoverkha — Co-Founder ✔ (§5.2), each with a LinkedIn button.

**Contacts**
- Eyebrow: Contacts
- Title: Let's find **your next hire.**
- Lede: Tell us about the role. We'll come back with how we would run the search.
- Button: START A SEARCH
- Rows: Email — team@hantii.com [COPY] · LinkedIn — hantii-agency · Instagram — @hantii.agency

**Footer** — © {year} Hantii Agency

**404**
- Title: This page **doesn't exist.**
- Lede: The link may be old or mistyped.
- Button: GO TO HOMEPAGE

## 6. Non-functional requirements

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-01 | Performance | Lighthouse (mobile) ≥ 95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO. |
| NFR-02 | Web vitals | LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 200 ms on a mid-range phone over 4G. |
| NFR-03 | Weight | First load ≤ 350 KB transferred including fonts; JS ≤ 3 KB gzip; CSS ≤ 20 KB gzip; logo ≤ 15 KB; no image larger than twice its rendered size. |
| NFR-04 | Accessibility | WCAG 2.1 AA: text contrast ≥ 4.5:1 (3:1 at 24px+, icons, focus rings), full keyboard operation, visible 3px focus ring, skip link, landmarks and one h1, `lang="en"`, reduced-motion respected, touch targets ≥ 44×44px. |
| NFR-05 | Responsive | Works from 320px to 1920px wide with no horizontal scroll; layouts change at the breakpoints in design.md §5. |
| NFR-06 | Browsers | Last two versions of Chrome, Edge, Firefox, Safari; iOS Safari 17+ (Popover API). Graceful without JavaScript. |
| NFR-07 | Security | HTTPS only with HSTS; CSP with no inline executable script; `nosniff`, strict referrer policy, restrictive permissions policy, framing denied. No secrets in the repo. |
| NFR-08 | Privacy | No cookies, no analytics, no third-party requests except Google Fonts (see open item O4). No personal data collected. |
| NFR-09 | Availability | Served from Cloudflare's edge; no origin server. A failed build never replaces the live version. |
| NFR-10 | Maintainability | All copy and team data in one typed content file; all visual values from design tokens (no raw colours outside the token file); `npm run build` and `npm run check` clean. |
| NFR-11 | Deployability | Push to `main` deploys to production with no manual step; other branches can get preview URLs that are not indexed. |

## 7. Acceptance criteria

The release is accepted when all of the following hold on the production URL:

1. `https://hantii.com/` loads over HTTPS and shows every section of §4 in order with the copy of §5.4 (or its approved revision).
2. `https://www.hantii.com/any/path?x=1` answers 301 to `https://hantii.com/any/path?x=1`; `http://hantii.com/` ends on HTTPS.
3. An unknown path returns the branded 404 page with HTTP status 404.
4. At 1440px, 768px and 375px widths the page matches the design system (colours, type, radii, split-weight titles, StatBand overlap, stacking) and has no horizontal scroll.
5. Keyboard only: every link and button is reachable in order with a visible focus ring; the mobile menu opens, closes on Esc and returns focus.
6. Copy puts `team@hantii.com` on the clipboard and a screen reader announces "Copied".
7. With reduced motion on, nothing animates and anchor jumps are instant.
8. Lighthouse mobile meets NFR-01; response headers meet NFR-07.
9. Only the figures of §5.2 appear anywhere on the site; no invented names, clients or testimonials.
10. A commit merged to `main` is live within minutes without any manual step.

## 8. Owner inputs and open items

| # | Item | Needed for | Status |
| --- | --- | --- | --- |
| O1 | Team: names, roles, LinkedIn URLs, portrait photos (4:5, at least 800×1000, head-and-shoulders) | FR-09, public launch | Done 2026-09-27 (§5.2). Alona's photo arrived as 800×800 and is 640×800 after cropping, below the 800×1000 target; slightly soft on high-DPI screens. A larger original would help. |
| O2 | Approve or edit the draft copy in §5.4 | Launch | Open |
| O3 | Cloudflare: connect the GitHub repo in Workers & Pages; confirm `hantii.com` is in the same account and apex/www have no conflicting DNS records | FR-16, NFR-11 | Open |
| O4 | Google Fonts are loaded from Google as the design system specifies. Self-hosting them would remove the only third-party request, which matters for GDPR. With inlined CSS, Lighthouse mobile performance is already 100 using Google Fonts, so this is now a privacy decision rather than a speed one. Keep or self-host? | NFR-08 | Open — default: Google Fonts |
| O5 | Vector (SVG) versions of the logo for sharper rendering and a smaller favicon | FR-01, FR-13 | Nice to have |
| O6 | Privacy/legal notice page — not required while the site sets no cookies and collects no data; revisit if analytics or a form are added | Legal | Deferred |
