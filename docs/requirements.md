# Hantii Agency website — requirements

| | |
| --- | --- |
| Status | v1.1 — revised 2026-10-23 for the updated design system (new hero, About and Team sections, contact form, motion) |
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
- A contact form that hands the visitor a ready-to-send email (no backend, D3).
- A branded 404 page.
- Favicons, social share image, sitemap, robots.txt, structured data.
- Hosting on Cloudflare at `hantii.com`, `www.hantii.com` redirecting to the apex, auto-deploy from the GitHub `main` branch.

**Out of scope (v1)** — each needs a separate decision before work starts

- Any backend that accepts user input. The contact form only opens the visitor's own email app.
- CMS, blog, case studies, vacancies board, candidate portal.
- Languages other than English.
- Analytics, tracking pixels, cookies (and therefore a consent banner).
- Client logos, testimonials, or any figure not listed in §5.2.

## 3. Decisions

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Astro, static output, plain CSS on design tokens | Zero JS by default, build-time image optimisation, room for more pages later. |
| D2 | Cloudflare Worker with static assets + Workers Builds Git integration | Domain is already on Cloudflare; push to `main` deploys; one small Worker handles redirect and headers. |
| D3 | Contact = visible email + Copy button, LinkedIn, Instagram, and a form that hands off to the visitor's email app. No backend. | The design system adds the form and, with no backend, asks for a ready-to-send email instead. No spam handling, no personal data stored. Owner decision 2026-10-23. |
| D4 | Copy drafted in the brand voice; team data only as supplied by the owner (§5.2) | Design fixes structure but not all copy; names, roles and photos must never be invented. |
| D5 | English only | The brand book and all approved copy are English. |

## 4. Functional requirements

Section IDs in brackets are the page anchors.

| ID | Requirement |
| --- | --- |
| FR-01 | **Header** — sticky at the top on all widths. Shows the Hantii mark and wordmark as two images (40px and 23px tall; 34px and 19.5px on phones) linking to the top of the home page, navigation to About, Domain, Approach, Why us, Team, Contacts, and a small primary CONTACT US button to `#contacts`. |
| FR-02 | **Mobile menu** — below the header breakpoint the navigation collapses behind a menu button. The button exposes its state (`aria-expanded`), the panel closes on Esc, on outside click and when a link is chosen, and focus returns to the button. Without JavaScript the navigation stays reachable. |
| FR-03 | **Hero** — eyebrow, h1 "We run the hire, you run the business." with the first clause on its own line and the second on a `violet-100` marker, three points with gem bullets, primary HIRE TOP TALENT with an arrow (to `#contacts`) and ghost OUR APPROACH (to `#approach`). The headline and points sit above the fold at 1366×768 and 390×844. The HeroFrame sits in the right column and stacks under the copy on narrow screens. |
| FR-04 | **HeroFrame** — the blush blob behind a thin browser window, geometry copied from the design system. Inside the window, a snapshot of the talent pipeline: a "Talent pipeline" label, a Role / Status header and three role titles, each with an "Open to work" pill. Role titles only, never candidate names; on phones the pill stacks under the role. A caption sits under the frame. The blob drifts slowly and the rows slide in once; motion stops under `prefers-reduced-motion`. The drawing is hidden from assistive tech; the list and caption are not. |
| FR-05 | **StatBand** — dark panel with exactly the four approved figures (§5.2), overlapping the bottom of the hero. Four columns on desktop, two on narrow screens. The figures count up once as they come into view; screen readers and visitors without JS or with reduced motion get the final values. |
| FR-06 | **Our domain** [`#domain`] — heading plus two lists: Industries (Web3 & Crypto, FinTech, iGaming, AI & Deep Tech) and Functions (Product, Growth, Engineering & Tech), each row with a line icon in a tile. |
| FR-07 | **Our approach** [`#approach`] — on the mist ground; heading plus four principle cards, each with the gem marker, a title and a short body. |
| FR-08 | **Why choose us** [`#why`] — an intro column with a START A SEARCH button (to `#contacts`) that stays in view (sticky) while three items scroll past on desktop; the third item is a dark panel carrying "AI can't read people. We can." Stacks to one column on narrow screens. |
| FR-09 | **Core team** [`#team`] — heading, a card per founder (4:5 portrait with name, role and LinkedIn button over it), then the one warm card: "A **boutique** team…", a line of body copy and TALK TO US (to `#contacts`). A member without a photo shows the placeholder state (gem on a mist-to-blush ground, "Photo coming soon"); a member without a LinkedIn URL shows no button. |
| FR-10 | **Contacts** [`#contacts`] — dark panel with heading, lede, three rows (email as selectable text with a Copy button, LinkedIn, Instagram) and the contact form (FR-20). Copy puts `team@hantii.com` on the clipboard and announces "Copied" to screen readers; if copying is unavailable the button is hidden and the email stays selectable. |
| FR-11 | **Footer** — mist ground; logo and a one-line description; Agency links (About us, Our domain, Our approach, Core team, Team); Contacts (email, LinkedIn, Instagram); "© {year} Hantii Agency. All rights reserved." and "Recruiting for FinTech · Web3 · iGaming · AI". |
| FR-12 | **404** — branded page for any unknown path, served with HTTP 404, with a way back to the homepage. |
| FR-13 | **Metadata** — unique title and meta description, canonical URL `https://hantii.com/`, Open Graph and Twitter card tags with a 1200×630 share image, favicons (32, 48, SVG or PNG mark) and Apple touch icon, `theme-color`. |
| FR-14 | **Structured data** — JSON-LD `EmploymentAgency` with name, URL, logo, email and `sameAs` (LinkedIn, Instagram). |
| FR-15 | **Crawling** — `sitemap-index.xml` generated at build; `robots.txt` allows all and points to the sitemap. Hosts other than `hantii.com` (e.g. preview URLs) send `X-Robots-Tag: noindex`. |
| FR-16 | **Canonical host** — `www.hantii.com/*` answers 301 to `https://hantii.com/*`, keeping path and query. HTTP is upgraded to HTTPS. |
| FR-17 | **In-page navigation** — anchor links scroll to their section without the sticky header covering the section heading; smooth scrolling only when reduced motion is not requested. |
| FR-18 | **About us** [`#about`] — after the StatBand: heading, lede and the four industries as chips. The header's "About" link points here. |
| FR-19 | **Team** [`#people`] — heading and a card per team member (§5.2): 4:5 photo with the name and role under it, so the photo stays whole. The placeholder state of FR-09 applies. Linked from the footer, not the header. |
| FR-20 | **Contact form** — Email (required: `danger` asterisk and a "* Required" note) and Message (optional), then SEND MESSAGE. An empty or invalid email shows "Enter an email address, like name@company.com." and focuses the field. A valid submit opens the visitor's email app with a message to team@hantii.com (subject, their message, their email as reply-to) and shows a status line that never claims the message was sent. Without JavaScript the form posts to its `mailto:` action and the browser validates the email. |
| FR-21 | **Motion** — sections rise 26px and fade in as they scroll into view (scroll-driven CSS, so content is never hidden where it can't animate); the hero marker draws in; the mark turns every 7s; hover lifts buttons 2px and cards 3px, zooms photos 4% and turns Domain rows `violet-600`. Everything stops under `prefers-reduced-motion`. |

## 5. Content requirements

### 5.1 Voice

- "We" (the agency) speaking to "you" (the hiring founder or manager). Short, declarative sentences. No hype, no superlatives, no emoji.
- Principle headings are sentences ending in a full stop ("We protect your time."). Section titles use sentence case with the key phrase at the end set in bold.
- Buttons are uppercase verbs, one to three words: HIRE TOP TALENT, CONTACT US, START A SEARCH, OUR APPROACH, TALK TO US, SEND MESSAGE.
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

Team (supplied by the owner 2026-10-23), in this order, no LinkedIn buttons:

| Name | Role | Portrait |
| --- | --- | --- |
| Anastasiia Ivanova | Talent Sourcer | `src/assets/team/anastasiia-ivanova.jpg` |
| Yuliia Pavelko | Recruiter | `src/assets/team/yuliia-pavelko.jpg` |
| Inna Belova | Recruiter | `src/assets/team/inna-belova.jpg` |
| TeamMate (the agency's cat) | Chief Napping Officer | `src/assets/team/teammate.jpg`, alt "Our ginger cat wearing a collar and tie" |

"From the first key hires to the first 100+ employees" (About, Core team) is approved copy describing a client's growth stages, not a figure about Hantii.

Never add statistics, client names or logos, testimonials, awards, team names, roles or photos that the owner has not supplied.

### 5.3 Placeholder policy

- Every team member shown is real and listed in §5.2 (the people, and the agency's cat). A future member supplied without a photo uses the placeholder state of FR-09 ("Photo coming soon"); without a LinkedIn URL, no button. Never add made-up members to fill the grid.
- The HeroFrame pipeline shows role titles only. Never candidate names.

### 5.4 Copy deck (v1.1 — supplied by the owner 2026-10-23 with the design-system layout)

The source of truth for wording is `src/data/site.ts`; this deck records the approved structure and lines.

**Meta**
- Title: Hantii — Boutique recruiting for FinTech, MarTech & digital-driven businesses
- Description: Hantii is a boutique recruiting agency for FinTech, MarTech, Web3, iGaming and AI businesses. 10+ years in recruiting, 500+ filled positions.

**Hero**
- Eyebrow: Boutique recruiting agency
- H1: We run the hire, / **you run the business.** (marker)
- Points: We've been in-house recruiters, so we know exactly where hiring breaks: slow processes, mismatched hires, managers buried in CVs. · We focus on people who stay and grow with your company, not placements that only look good on paper. · We run the hire end to end, so your managers talk only to finalists and spend their time on the business.
- Buttons: HIRE TOP TALENT → · OUR APPROACH
- HeroFrame: Talent pipeline · Role / Status · Senior Payment Specialist, Senior BizDev, Middle Blockchain Security Engineer — Open to work · Caption: A snapshot of candidates we already know and keep in touch with.

**StatBand** — visually hidden heading "By the numbers"; figures from §5.2.

**About us**
- Eyebrow: About us
- Title: A boutique recruiting agency for **FinTech, MarTech & digital-driven businesses.**
- Lede: We help ambitious startups build the right team at every stage of growth, from the first key hires to the first 100+ employees.
- Chips: Web3 & Crypto · FinTech · iGaming · AI & Deep Tech

**Our domain**
- Eyebrow: Our domain
- Title: We work where **the market is moving.**
- Lists: Industries · Functions (FR-06)

**Our approach**
- Eyebrow: Our approach
- Title: Four principles behind **every search.**
- Quality over quantity. — We identify exactly what you need and deliver only those who fit. Every search starts with clarity, not assumptions.
- We protect your time. — We minimize hiring manager involvement at every stage. You focus on decisions, we handle everything else.
- Trust over transactions. — Every client is a long-term partner, not just a brief. Our reputation is built one search at a time.
- Honesty, even when it's inconvenient. — If a candidate isn't the right fit, or your expectations don't match the market, we say so. Every time.

**Why choose us**
- Eyebrow: Why choose us
- Title: Recruiting, **read from the inside.**
- Lede: Automation handles volume. We handle quality, and everything AI can't do.
- Button: START A SEARCH →
- We know recruiting from the inside. — We've seen it all, from the days when recruiters were dismissed as "CV sorters" to today, when everyone says AI will replace us. That journey taught us exactly where a recruiter's real value lies, and why it isn't going anywhere.
- We evolve with the market. — Yes, the industry is changing, and so are we. We see that shift as an opportunity. Automation handles volume. We handle quality, and everything AI can't do.
- (dark) AI can't read people. **We can.** — No algorithm can tell you how someone communicates, or whether they truly have the expertise their CV claims. Candidates now use AI to write polished CVs that sail through AI screening. That's why we focus where it matters: spotting patterns, holding real conversations, and verifying experience face to face.

**Core team**
- Eyebrow: Core team
- Title: The founders **behind every search.**
- Founder cards: Vlada Havriushova — Co-Founder · Alona Zolotoverkha — Co-Founder (§5.2), each with a LinkedIn button.
- Warm card: A **boutique** team for FinTech, MarTech and digital-driven businesses. — From the first key hires to the first 100+ employees, every search is run by the people you meet on the first call. — TALK TO US

**Team**
- Eyebrow: Team
- Title: The team **on your searches.**
- Cards: the four members of §5.2.

**Contacts**
- Eyebrow: Contacts
- Title: Ready to build **the right team?**
- Lede: Tell us about the role, the stage you're at and the timeline. We'll come back with an honest read of the market.
- Rows: Email — team@hantii.com [COPY] · LinkedIn — hantii-agency · Instagram — @hantii.agency
- Form: Send us a message — Leave your email and we'll get back to you. · Email * · Message (optional) · * Required · SEND MESSAGE
- Error: Enter an email address, like name@company.com.
- After submit: Your email app should open with your message ready. Press Send there to reach us.
- Email handed to the mail app: subject "New search via hantii.com"; body = the message, then "Reply to: {email}".

**Footer**
- Hantii Agency is a boutique recruiting agency for FinTech, MarTech, and digital-driven businesses.
- Agency: About us · Our domain · Our approach · Core team · Team
- Contacts: team@hantii.com · LinkedIn · Instagram
- © {year} Hantii Agency. All rights reserved. · Recruiting for FinTech · Web3 · iGaming · AI

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
11. The contact form opens the visitor's email app with the message addressed to team@hantii.com and never claims the message was sent.

## 8. Owner inputs and open items

| # | Item | Needed for | Status |
| --- | --- | --- | --- |
| O1 | Team: names, roles, LinkedIn URLs, portrait photos (4:5, at least 800×1000, head-and-shoulders) | FR-09, FR-19, public launch | Founders done 2026-09-27, team done 2026-10-23 (§5.2). Below the 800×1000 target after cropping: Alona 640×800, Yuliia 480×600, Anastasiia and Inna 360×450. Fine on the ~270px Team cards; soft on high-DPI screens at tablet widths, where the cards are wider. Larger originals would help. |
| O2 | Approve or edit the draft copy in §5.4 | Launch | Open |
| O3 | Cloudflare: connect the GitHub repo in Workers & Pages; confirm `hantii.com` is in the same account and apex/www have no conflicting DNS records | FR-16, NFR-11 | Open |
| O4 | Google Fonts are loaded from Google as the design system specifies. Self-hosting them would remove the only third-party request, which matters for GDPR. With inlined CSS, Lighthouse mobile performance is already 100 using Google Fonts, so this is now a privacy decision rather than a speed one. Keep or self-host? | NFR-08 | Open — default: Google Fonts |
| O5 | Vector (SVG) versions of the logo for sharper rendering and a smaller favicon | FR-01, FR-13 | Nice to have |
| O6 | Privacy/legal notice page — not required while the site sets no cookies and collects no data. The contact form sends nothing to the site: it opens the visitor's own email app. Revisit if analytics or a form backend are added | Legal | Deferred |
