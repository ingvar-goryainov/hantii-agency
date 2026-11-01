/**
 * All copy and content for hantii.com. Components hold no user-facing text.
 * Source: docs/requirements.md §5 (approved facts, team, copy deck).
 * Only the owner-approved figures and people may appear here.
 */
import type { ImageMetadata } from "astro";
import vlada from "../assets/team/vlada-havriushova.jpg";
import alona from "../assets/team/alona-zolotoverkha.jpg";
import anastasiia from "../assets/team/anastasiia-ivanova.png";
import yuliia from "../assets/team/yuliia-pavelko.jpg";
import inna from "../assets/team/inna-belova.jpg";
import teammate from "../assets/team/teammate.jpg";
import web3Crypto from "../assets/industries/web3-crypto.jpg";
import fintech from "../assets/industries/fintech.jpg";
import igaming from "../assets/industries/igaming.jpg";
import aiDeepTech from "../assets/industries/ai-deep-tech.jpg";

export type IconName =
  | "blocks" | "landmark" | "dices" | "cpu"
  | "layout-panel-top" | "trending-up" | "code-xml"
  | "linkedin" | "instagram" | "mail" | "copy" | "check" | "menu" | "x" | "arrow-right";

/** A section title in the split-weight voice: light lead, bold phrase at the end. */
export interface Title { lead: string; strong: string }
export interface Heading { eyebrow: string; title: Title; lede?: string }
export interface Link { label: string; href: string }
export interface Stat { value: string; label: string }
export interface DomainRow { label: string; icon: IconName }
/** An industry also has a 4:3 picture for the About grid, prepared per docs/design.md §12. */
export interface IndustryRow extends DomainRow { picture: ImageMetadata }
export interface Principle { title: string; body: string }
export interface WhyItem { title: string; emphasis?: string; body: string; tone: "light" | "deep" }
/** One block of a case: a string is a paragraph, a string[] a bulleted list. */
export interface CaseBlock { title: string; body: (string | string[])[] }
export interface CaseStudy {
  /** Anchor and popover id of the case's reader. */
  id: string;
  title: string;
  badge: string;
  highlights: string[];
  blocks: CaseBlock[];
}
export interface Service { title: string; headline: string; body: string; addOn?: boolean }
export interface TeamMember {
  name: string;
  role: string;
  /** Portrait prepared per docs/design.md §12, or null for the placeholder state. */
  photo: ImageMetadata | null;
  /** Alt text when "Portrait of <name>" doesn't fit. */
  alt?: string;
  linkedin: string | null;
}

export const contacts = {
  email: "team@hantii.com",
  linkedin: "https://www.linkedin.com/company/hantii-agency",
  linkedinLabel: "hantii-agency",
  instagram: "https://www.instagram.com/hantii.agency",
  instagramLabel: "@hantii.agency",
} as const;

export const site = {
  url: "https://hantii.com",
  name: "Hantii",
  legalName: "Hantii Agency",
  meta: {
    title: "Hantii — Boutique recruiting for FinTech, MarTech & digital-driven businesses",
    description:
      "Hantii is a boutique recruiting agency for FinTech, MarTech, Web3, iGaming and AI businesses. 10+ years in recruiting, 500+ filled positions.",
    ogImageAlt: "Hantii — boutique recruiting agency",
  },
  nav: [
    { label: "About", href: "/#about" },
    { label: "Domain", href: "/#domain" },
    { label: "Cases", href: "/#cases" },
    { label: "Approach", href: "/#approach" },
    { label: "Why us", href: "/#why" },
    { label: "Advisory", href: "/#advisory" },
    { label: "Team", href: "/#team" },
    { label: "Contacts", href: "/#contacts" },
  ] satisfies Link[],
  headerCta: { label: "Contact us", href: "/#contacts" } satisfies Link,
} as const;

export const hero = {
  eyebrow: "Boutique recruiting agency",
  /** The h1: the first clause on its own line, the second on the violet marker. */
  title: { first: "We run the hire,", second: "you run the business." },
  points: [
    "We've been in-house recruiters, so we know exactly where hiring breaks: slow processes, mismatched hires, managers buried in CVs.",
    "We focus on people who stay and grow with your company, not placements that only look good on paper.",
    "We run the hire end to end, so your managers talk only to finalists and spend their time on the business.",
  ],
  primary: { label: "Hire top talent", href: "#contacts" } satisfies Link,
  secondary: { label: "Our approach", href: "#approach" } satisfies Link,
  /** HeroFrame window content: role titles only, never candidate names. */
  pipeline: {
    label: "Talent pipeline",
    columns: { role: "Role", status: "Status" },
    status: "Open to work",
    roles: ["Senior Payment Specialist", "Senior BizDev", "Middle Blockchain Security Engineer"],
    caption: "A snapshot of candidates we already know and keep in touch with.",
  },
};

export const stats: { heading: string; items: Stat[] } = {
  heading: "By the numbers",
  items: [
    { value: "10+", label: "Years in recruiting" },
    { value: "30", label: "Days average time to offer for niche roles" },
    { value: "500+", label: "Filled positions" },
    { value: "100%", label: "NDA and security" },
  ],
};

export const about: Heading = {
  eyebrow: "About us",
  title: { lead: "A boutique recruiting agency for", strong: "FinTech, MarTech & digital-driven businesses." },
  lede: "We help ambitious startups build the right team at every stage of growth, from the first key hires to the first 100+ employees.",
};

export const domain: Heading & {
  industriesTitle: string;
  industries: IndustryRow[];
  functionsTitle: string;
  functions: DomainRow[];
} = {
  eyebrow: "Our domain",
  title: { lead: "We work where", strong: "the market is moving." },
  industriesTitle: "Industries",
  industries: [
    { label: "Web3 & Crypto", icon: "blocks", picture: web3Crypto },
    { label: "FinTech", icon: "landmark", picture: fintech },
    { label: "iGaming", icon: "dices", picture: igaming },
    { label: "AI & Deep Tech", icon: "cpu", picture: aiDeepTech },
  ],
  functionsTitle: "Functions",
  functions: [
    { label: "Product", icon: "layout-panel-top" },
    { label: "Growth", icon: "trending-up" },
    { label: "Engineering & Tech", icon: "code-xml" },
  ],
};

/** Case texts supplied by the owner 2026-11-01; copy them word for word. */
export const cases: Heading & { read: string; close: string; items: CaseStudy[] } = {
  eyebrow: "Cases",
  title: { lead: "Recent searches, from brief", strong: "to accepted offer." },
  read: "Read case",
  close: "Close",
  items: [
    {
      id: "case-partnerships",
      title: "Commercial Partnerships Lead / Program Lead — two key hires for a new business line",
      badge: "Both offers accepted",
      highlights: ["400+ profiles", "3 and 4 weeks", "3 client interviews per finalist"],
      blocks: [
        {
          title: "Client",
          body: [
            "A technology company with around 80 people, building its own digital products for international markets. To launch a new business line, the team needed two leaders with relevant industry expertise.",
          ],
        },
        {
          title: "The brief",
          body: [
            "Hire two key people for the new business line:",
            [
              "Commercial Partnerships Lead — build the partner ecosystem, from identifying partners and leading negotiations to agreeing commercial terms.",
              "Program Lead — shape the business concept, work through the unit economics and product requirements, and coordinate engineering, design, and compliance.",
            ],
          ],
        },
        {
          title: "The challenge",
          body: [
            "The company needed leaders with deep experience in the new business area. That meant looking beyond candidates from its core industry.",
            "We refined the brief with the client three times as we discussed individual candidates. Those conversations helped pinpoint what mattered most: the level of responsibility candidates had held, measurable commercial results, relevant industry experience, and a willingness to move into a new environment.",
            "We also adapted our outreach for candidates from other industries. Rather than leading with the company’s core specialism, we focused on the scope of the role, the product, and the opportunity to build a new business line.",
            "Experience was only part of the assessment. We also needed to understand whether candidates could work independently in an environment where some processes were still taking shape.",
          ],
        },
        {
          title: "The process",
          body: [
            "We reviewed over 400 profiles and held more than 9 initial interviews for each role. Each finalist went through 3 client interviews, with the CPO and CEO involved.",
            [
              "Commercial Partnerships Lead — filled in 3 weeks.",
              "Program Lead — filled in 4 weeks.",
            ],
          ],
        },
        {
          title: "The outcome",
          body: [
            "Both offers were accepted. The company brought in the industry expertise it needed to develop its partner ecosystem and coordinate the launch of the new business line.",
          ],
        },
        {
          title: "What we learned",
          body: [
            "Relevant skills and industry experience matter, but they are not the whole picture. How someone handles uncertainty — and whether the team’s way of working suits them — deserves its own assessment in conversations with the hiring manager.",
          ],
        },
      ],
    },
    {
      id: "case-backend",
      title: "Senior Backend Engineer for a payments platform",
      badge: "Offer accepted in 3 weeks",
      highlights: ["460 profiles", "9 screenings", "2 finalists"],
      blocks: [
        {
          title: "Client",
          body: ["A fintech company building a payments platform for international markets."],
        },
        {
          title: "The brief",
          body: [
            "Find a Senior Backend Engineer — Payments & Ledger to develop payment processing and the platform’s internal ledger.",
            "The business needed someone who could make sure payments went through and transactions and balances were recorded correctly — even when a payment was delayed, a request was repeated, or an external service returned an error.",
          ],
        },
        {
          title: "The challenge",
          body: [
            "The challenge was to distinguish engineers who had integrated payment providers from those who had taken responsibility for how payments were processed and recorded.",
            "We looked for hands-on experience preventing duplicate transactions, handling refunds, and reconciling internal records with payment providers. We also needed to understand which decisions candidates had made themselves and how they had resolved issues affecting financial records.",
            "A fintech background alone was not enough. We needed clear examples of ownership.",
          ],
        },
        {
          title: "The process",
          body: [
            "We worked with the technical team to separate must-have experience from skills the new hire could develop on the job.",
            "Our screening calls focused on specific examples: which components candidates owned, what went wrong, and what they personally did to resolve it.",
            "For each candidate we introduced, we summarised their relevant experience, what they had been responsible for, and how they had handled incidents. This gave the client a clear starting point for the in-depth technical assessment, which their team conducted.",
          ],
        },
        {
          title: "The outcome",
          body: [
            "3 weeks from the start of the search to an accepted offer.",
            ["460 profiles reviewed.", "9 screening calls.", "2 finalists.", "1 accepted offer."],
          ],
        },
        {
          title: "The takeaway",
          body: [
            "This search was about more than fintech experience. The business needed someone who could take responsibility for processing payments correctly and keeping financial records accurate. That need shaped both our search criteria and how we assessed candidates.",
          ],
        },
      ],
    },
    {
      id: "case-infrastructure",
      title: "Infrastructure engineer for international payments",
      badge: "Offer accepted in 4 weeks",
      highlights: ["340 profiles", "12 screenings", "3 finalists"],
      blocks: [
        {
          title: "Client",
          body: ["A fintech company building an international payments product powered by stablecoins."],
        },
        {
          title: "The brief",
          body: [
            "Find a Blockchain Infrastructure Engineer — Stablecoin Payments to build and maintain integrations between the payments platform and blockchain networks.",
            "The business needed to track payments from submission through to confirmation on the blockchain, with the correct status reflected in its own platform. The engineer would be responsible for keeping those connections working, including when external services were unavailable or network data arrived late.",
          ],
        },
        {
          title: "The challenge",
          body: [
            "The role called for strong backend engineering skills combined with hands-on experience building blockchain integrations in a live product.",
            "General Web3 experience or smart contract development was not enough. We needed someone who had worked across the transaction lifecycle, from submission and confirmation to recovery after failures.",
            "We also looked closely at individual ownership: what candidates had built themselves, which decisions they had made, and which components they had been responsible for.",
          ],
        },
        {
          title: "The process",
          body: [
            "We worked with the technical team to define the role’s scope and agree on the selection criteria.",
            "We focused the search on engineers with blockchain integration experience in payments or related financial products. Screening calls explored specific services and projects: how candidates handled transactions, identified problems, and restored integrations after failures.",
            "Each candidate submission highlighted relevant hands-on experience and the ability to work independently. The client’s team conducted the in-depth technical assessment.",
          ],
        },
        {
          title: "The outcome",
          body: [
            "4 weeks from the start of the search to an accepted offer.",
            ["340 profiles reviewed.", "12 screening calls.", "3 finalists.", "1 accepted offer."],
          ],
        },
        {
          title: "The takeaway",
          body: [
            "We built the search around what the payments product needed, rather than a broad Web3 label. That kept the search focused on engineers who had built and supported blockchain integrations in a live payments product.",
          ],
        },
      ],
    },
  ],
};

export const approach: Heading & { principles: Principle[] } = {
  eyebrow: "Our approach",
  title: { lead: "Four principles behind", strong: "every search." },
  principles: [
    {
      title: "Quality over quantity.",
      body: "We identify exactly what you need and deliver only those who fit. Every search starts with clarity, not assumptions.",
    },
    {
      title: "We protect your time.",
      body: "We minimize hiring manager involvement at every stage. You focus on decisions, we handle everything else.",
    },
    {
      title: "Trust over transactions.",
      body: "Every client is a long-term partner, not just a brief. Our reputation is built one search at a time.",
    },
    {
      title: "Honesty, even when it's inconvenient.",
      body: "If a candidate isn't the right fit, or your expectations don't match the market, we say so. Every time.",
    },
  ],
};

export const why: Heading & { cta: Link; items: WhyItem[] } = {
  eyebrow: "Why choose us",
  title: { lead: "Recruiting,", strong: "read from the inside." },
  lede: "Automation handles volume. We handle quality, and everything AI can't do.",
  cta: { label: "Start a search", href: "#contacts" },
  items: [
    {
      title: "We know recruiting from the inside.",
      body: "We've seen it all, from the days when recruiters were dismissed as \"CV sorters\" to today, when everyone says AI will replace us. That journey taught us exactly where a recruiter's real value lies, and why it isn't going anywhere.",
      tone: "light",
    },
    {
      title: "We evolve with the market.",
      body: "Yes, the industry is changing, and so are we. We see that shift as an opportunity. Automation handles volume. We handle quality, and everything AI can't do.",
      tone: "light",
    },
    {
      title: "AI can't read people.",
      emphasis: "We can.",
      body: "No algorithm can tell you how someone communicates, or whether they truly have the expertise their CV claims. Candidates now use AI to write polished CVs that sail through AI screening. That's why we focus where it matters: spotting patterns, holding real conversations, and verifying experience face to face.",
      tone: "deep",
    },
  ],
};

/** Services supplied by the owner 2026-11-01. The first three run in sequence; the add-on is optional. */
export const advisory: Heading & { addOn: string; cta: Link; services: Service[] } = {
  eyebrow: "Hiring Advisory",
  title: { lead: "Fix how you hire,", strong: "not just who." },
  addOn: "Add-on",
  cta: { label: "Talk to us", href: "#contacts" },
  services: [
    {
      title: "Hiring Audit",
      headline: "What's slowing your hiring down?",
      body: "We dig into your hiring process, find what's getting in the way, and recommend what to fix first.",
    },
    {
      title: "Hiring Audit & Action Plan",
      headline: "Know what to fix. And how.",
      body: "Get a clear diagnosis and a practical action plan — with priorities, owners, and milestones.",
    },
    {
      title: "Hands-on Implementation",
      headline: "Let's make it work.",
      body: "We work alongside your team to put changes into practice, test them on real roles, and fine-tune what needs adjusting.",
    },
    {
      title: "Ongoing Hiring Support",
      headline: "Keep your hiring on track.",
      body: "Ongoing support to help your team set priorities, tackle hiring challenges, and keep things moving.",
      addOn: true,
    },
  ],
};

export const team: Heading & {
  photoPending: string;
  members: TeamMember[];
  card: { title: { before: string; strong: string; after: string }; body: string; cta: Link };
} = {
  eyebrow: "Core team",
  title: { lead: "The founders", strong: "behind every search." },
  photoPending: "Photo coming soon",
  members: [
    {
      name: "Vlada Havriushova",
      role: "Co-Founder",
      photo: vlada,
      linkedin: "https://www.linkedin.com/in/vlada-havriushova-50093914b/",
    },
    {
      name: "Alona Zolotoverkha",
      role: "Co-Founder",
      photo: alona,
      linkedin: "https://www.linkedin.com/in/alenazolotoverkha/",
    },
  ],
  card: {
    title: { before: "A", strong: "boutique", after: "team for FinTech, MarTech and digital-driven businesses." },
    body: "From the first key hires to the first 100+ employees, every search is run by the people you meet on the first call.",
    cta: { label: "Talk to us", href: "#contacts" },
  },
};

export const people: Heading & { members: TeamMember[] } = {
  eyebrow: "Team",
  title: { lead: "The team", strong: "on your searches." },
  members: [
    {
      name: "Anastasiia Ivanova",
      role: "Talent Sourcer",
      photo: anastasiia,
      linkedin: "https://www.linkedin.com/in/anastasiia-ivanova-5bb98242b/",
    },
    {
      name: "Yuliia Pavelko",
      role: "Recruiter",
      photo: yuliia,
      linkedin: "https://www.linkedin.com/in/yuliia-pavelko-45b643387/",
    },
    {
      name: "Inna Belova",
      role: "Recruiter",
      photo: inna,
      linkedin: "https://www.linkedin.com/in/inna-belova-089355149/",
    },
    {
      name: "TeamMate",
      role: "Chief Napping Officer",
      photo: teammate,
      alt: "Our ginger cat wearing a collar and tie",
      linkedin: null,
    },
  ],
};

export const contact: Heading & {
  rows: { email: string; linkedin: string; instagram: string };
  copy: { idle: string; done: string; fallback: string };
  form: {
    title: string;
    lede: string;
    email: string;
    emailError: string;
    message: string;
    required: string;
    submit: string;
    /** Subject and reply-to line of the email handed to the visitor's mail app. */
    subject: string;
    replyTo: string;
    /** Shown after the handoff. Never claims the message was sent: there is no backend. */
    handoff: string;
  };
} = {
  eyebrow: "Contacts",
  title: { lead: "Ready to build", strong: "the right team?" },
  lede: "Tell us about the role, the stage you're at and the timeline. We'll come back with an honest read of the market.",
  rows: { email: "Email", linkedin: "LinkedIn", instagram: "Instagram" },
  copy: { idle: "Copy", done: "Copied", fallback: "Press Ctrl+C or ⌘C to copy" },
  form: {
    title: "Send us a message",
    lede: "Leave your email and we'll get back to you.",
    email: "Email",
    emailError: "Enter an email address, like name@company.com.",
    message: "Message (optional)",
    required: "Required",
    submit: "Send message",
    subject: "New search via hantii.com",
    replyTo: "Reply to:",
    handoff: "Your email app should open with your message ready. Press Send there to reach us.",
  },
};

export const notFound: Heading & { cta: Link } = {
  eyebrow: "404",
  title: { lead: "This page", strong: "doesn't exist." },
  lede: "The link may be old or mistyped.",
  cta: { label: "Go to homepage", href: "/" },
};

export const footer = {
  blurb: "Hantii Agency is a boutique recruiting agency for FinTech, MarTech, and digital-driven businesses.",
  agencyTitle: "Agency",
  agency: [
    { label: "About us", href: "/#about" },
    { label: "Our domain", href: "/#domain" },
    { label: "Cases", href: "/#cases" },
    { label: "Our approach", href: "/#approach" },
    { label: "Hiring Advisory", href: "/#advisory" },
    { label: "Core team", href: "/#team" },
    { label: "Team", href: "/#people" },
  ] satisfies Link[],
  contactsTitle: "Contacts",
  emailHref: "/#contacts",
  copyright: (year: number) => `© ${year} ${site.legalName}. All rights reserved.`,
  tagline: "Recruiting for FinTech · Web3 · iGaming · AI",
};
