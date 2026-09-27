/**
 * All copy and content for hantii.com. Components hold no user-facing text.
 * Source: docs/requirements.md §5 (approved facts, team, copy deck).
 * Only the owner-approved figures and people may appear here.
 */
import type { ImageMetadata } from "astro";
import vlada from "../assets/team/vlada-havriushova.jpg";
import alona from "../assets/team/alona-zolotoverkha.jpg";

export type IconName =
  | "blocks" | "landmark" | "radar" | "dices" | "cpu"
  | "layout-panel-top" | "trending-up" | "megaphone" | "code-xml"
  | "linkedin" | "instagram" | "mail" | "copy" | "check" | "menu" | "x";

/** A section title in the split-weight voice: light lead, bold phrase at the end. */
export interface Title { lead: string; strong: string }
export interface Heading { eyebrow: string; title: Title; lede?: string }
export interface Link { label: string; href: string }
export interface Stat { value: string; label: string }
export interface DomainRow { label: string; icon: IconName }
export interface Principle { title: string; body: string }
export interface WhyItem { title: string; emphasis?: string; body: string; tone: "light" | "deep" }
export interface TeamMember {
  name: string;
  role: string;
  /** Portrait prepared per docs/design.md §12, or null for the placeholder state. */
  photo: ImageMetadata | null;
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
    { label: "Approach", href: "/#approach" },
    { label: "Why us", href: "/#why" },
    { label: "Team", href: "/#team" },
    { label: "Contacts", href: "/#contacts" },
  ] satisfies Link[],
  headerCta: { label: "Contact us", href: "/#contacts" } satisfies Link,
} as const;

export const hero = {
  eyebrow: "About us",
  accent: "Boutique recruiting",
  rest: "for FinTech, MarTech & digital-driven businesses",
  lede: "We help ambitious startups build the right team at every stage of growth.",
  primary: { label: "Hire top talent", href: "#contacts" } satisfies Link,
  secondary: { label: "Our approach", href: "#approach" } satisfies Link,
  shortlist: {
    label: "Shortlist",
    candidates: ["Candidate 01", "Candidate 02", "Candidate 03"],
    status: "Vetted",
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

export const domain: Heading & {
  industriesTitle: string;
  industries: DomainRow[];
  functionsTitle: string;
  functions: DomainRow[];
} = {
  eyebrow: "Our domain",
  title: { lead: "We work where", strong: "the market is moving." },
  lede: "We recruit for the markets we know from the inside, across the functions that drive growth.",
  industriesTitle: "Industries",
  industries: [
    { label: "Web3 & Crypto", icon: "blocks" },
    { label: "FinTech", icon: "landmark" },
    { label: "MarTech", icon: "radar" },
    { label: "iGaming", icon: "dices" },
    { label: "AI & Deep Tech", icon: "cpu" },
  ],
  functionsTitle: "Functions",
  functions: [
    { label: "Product", icon: "layout-panel-top" },
    { label: "Growth", icon: "trending-up" },
    { label: "Marketing", icon: "megaphone" },
    { label: "Engineering & Tech", icon: "code-xml" },
  ],
};

export const approach: Heading & { principles: Principle[] } = {
  eyebrow: "Our approach",
  title: { lead: "How we", strong: "run every search." },
  lede: "Four principles we keep, whatever the role.",
  principles: [
    {
      title: "Every search starts with clarity, not assumptions.",
      body: "Before we contact a single candidate, we agree with you on the role, the must-haves and what a great hire looks like.",
    },
    {
      title: "Quality over quantity.",
      body: "You get a short list of people we have spoken to and vetted, not a stack of CVs.",
    },
    {
      title: "Honesty, even when it's inconvenient.",
      body: "If the brief, the budget or a candidate isn't right, we tell you early and plainly.",
    },
    {
      title: "We protect your time.",
      body: "We screen hard, so every interview you take is worth taking.",
    },
  ],
};

export const why: Heading & { items: WhyItem[] } = {
  eyebrow: "Why choose us",
  title: { lead: "A partner who", strong: "knows your market." },
  lede: "Boutique by design. The recruiters who take your brief are the ones who run your search.",
  items: [
    {
      title: "Niche expertise.",
      body: "10+ years recruiting for FinTech, MarTech, Web3 and other digital-driven businesses. We know the roles and where the people are.",
      tone: "light",
    },
    {
      title: "Speed without shortcuts.",
      body: "Niche roles close in 30 days on average from brief to offer, and every candidate is still vetted by us.",
      tone: "light",
    },
    {
      title: "AI can't read people.",
      emphasis: "We can.",
      body: "Tools help us search. The judgement on motivation, fit and character stays human.",
      tone: "deep",
    },
  ],
};

export const team: Heading & { intro: string; photoPending: string; members: TeamMember[] } = {
  eyebrow: "Core team",
  title: { lead: "The people", strong: "behind your search." },
  intro: "A small team with deep networks in the markets we serve. You always know who is working on your role.",
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
};

export const contact: Heading & {
  cta: Link;
  rows: { email: string; linkedin: string; instagram: string };
  copy: { idle: string; done: string; fallback: string };
} = {
  eyebrow: "Contacts",
  title: { lead: "Let's find", strong: "your next hire." },
  lede: "Tell us about the role. We'll come back with how we would run the search.",
  cta: { label: "Start a search", href: `mailto:${contacts.email}?subject=New%20search` },
  rows: { email: "Email", linkedin: "LinkedIn", instagram: "Instagram" },
  copy: { idle: "Copy", done: "Copied", fallback: "Press Ctrl+C or ⌘C to copy" },
};

export const notFound: Heading & { cta: Link } = {
  eyebrow: "404",
  title: { lead: "This page", strong: "doesn't exist." },
  lede: "The link may be old or mistyped.",
  cta: { label: "Go to homepage", href: "/" },
};

export const footer = {
  copyright: (year: number) => `© ${year} ${site.legalName}`,
};
