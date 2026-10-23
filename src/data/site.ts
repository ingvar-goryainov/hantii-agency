/**
 * All copy and content for hantii.com. Components hold no user-facing text.
 * Source: docs/requirements.md §5 (approved facts, team, copy deck).
 * Only the owner-approved figures and people may appear here.
 */
import type { ImageMetadata } from "astro";
import vlada from "../assets/team/vlada-havriushova.jpg";
import alona from "../assets/team/alona-zolotoverkha.jpg";
import anastasiia from "../assets/team/anastasiia-ivanova.jpg";
import yuliia from "../assets/team/yuliia-pavelko.jpg";
import inna from "../assets/team/inna-belova.jpg";
import teammate from "../assets/team/teammate.jpg";

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
export interface Principle { title: string; body: string }
export interface WhyItem { title: string; emphasis?: string; body: string; tone: "light" | "deep" }
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
    { label: "Approach", href: "/#approach" },
    { label: "Why us", href: "/#why" },
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
  industries: DomainRow[];
  functionsTitle: string;
  functions: DomainRow[];
} = {
  eyebrow: "Our domain",
  title: { lead: "We work where", strong: "the market is moving." },
  industriesTitle: "Industries",
  industries: [
    { label: "Web3 & Crypto", icon: "blocks" },
    { label: "FinTech", icon: "landmark" },
    { label: "iGaming", icon: "dices" },
    { label: "AI & Deep Tech", icon: "cpu" },
  ],
  functionsTitle: "Functions",
  functions: [
    { label: "Product", icon: "layout-panel-top" },
    { label: "Growth", icon: "trending-up" },
    { label: "Engineering & Tech", icon: "code-xml" },
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
    { label: "Our approach", href: "/#approach" },
    { label: "Core team", href: "/#team" },
    { label: "Team", href: "/#people" },
  ] satisfies Link[],
  contactsTitle: "Contacts",
  emailHref: "/#contacts",
  copyright: (year: number) => `© ${year} ${site.legalName}. All rights reserved.`,
  tagline: "Recruiting for FinTech · Web3 · iGaming · AI",
};
