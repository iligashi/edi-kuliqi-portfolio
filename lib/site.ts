export const profile = {
  name: "Edi Kuliqi",
  firstName: "Edi",
  lastName: "Kuliqi",
  role: "Graphic Designer",
  tagline: "Publishing · Branding · Digital Media",
  // TODO: replace with the real production domain before deploying.
  site: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edikuliqi.vercel.app",
  email: "kuliqi01@gmail.com",
  phone: "+383 48 888 083",
  phoneHref: "+38348888083",
  city: "Pristina",
  country: "Kosovo",
  countryCode: "XK",
  timeZone: "Europe/Belgrade",
  description:
    "Edi Kuliqi is a mid-level graphic designer in Pristina, Kosovo with 3+ years in book cover and editorial design, brand identity, catalogues and social media campaigns — press-ready and on deadline.",
} as const

export type ArtKind = "book" | "spread" | "poster" | "catalogue" | "brand" | "social"

export interface Project {
  slug: string
  title: string
  tags: string
  year: string
  art: ArtKind
}

// Placeholder visuals are drawn in CSS. Swap `art` for real images in /public/work when available.
export const projects: readonly Project[] = [
  { slug: "fiction-covers", title: "Fiction Cover Series", tags: "Book covers · Typography", year: "2024 — Now", art: "book" },
  { slug: "editorial-system", title: "Editorial Interior System", tags: "Grid · Layout · Print + eBook", year: "2024", art: "spread" },
  { slug: "book-fair", title: "Book Fair Campaign", tags: "Posters · Banners · Flyers", year: "2025", art: "poster" },
  { slug: "retail-catalogue", title: "Retail Catalogue", tags: "Print + digital catalogue", year: "2023", art: "catalogue" },
  { slug: "cafe-identity", title: "Café Brand Identity", tags: "Logo · Identity · Guidelines", year: "2022", art: "brand" },
  { slug: "social-kits", title: "Social Media Kits", tags: "Ads · Templates · Calendars", year: "2023 — Now", art: "social" },
]

export const services = [
  {
    title: "Publishing & Print",
    body: "Book covers, interior layouts, typography, grid systems and press-ready files — coordinated with the print house until the colour is right.",
    glyph: "Aa",
    tone: "red",
  },
  {
    title: "Brand Identity",
    body: "Logos, visual identity systems, full brand packages and guidelines that keep every touchpoint consistent.",
    glyph: "◐",
    tone: "ink",
  },
  {
    title: "Social & Digital Ads",
    body: "Campaign visuals, ad creatives and content calendars, adapted to every format and screen size.",
    glyph: "#",
    tone: "blue",
  },
  {
    title: "Catalogues & Campaigns",
    body: "Print and digital catalogues, posters, banners and flyers for launches, events and fairs.",
    glyph: "%",
    tone: "yellow",
  },
] as const

export const steps = [
  { title: "Brief", tag: "Listen", body: "Audience, market, constraints and deadlines — understood before a single pixel moves." },
  { title: "Concept", tag: "Explore", body: "Moodboards, type pairings and rough directions you can react to quickly." },
  { title: "Craft", tag: "Refine", body: "Grids, hierarchy, colour and detail — refined until every element earns its place." },
  { title: "Press", tag: "Deliver", body: "Prepress checks, colour proofs and direct coordination with the printer — or export for every screen." },
] as const

export const experience = [
  {
    date: "May 2024 — Present",
    role: "Graphic Designer",
    company: "Dukagjini Publishing House",
    body: "Book covers and interiors across genres, promotional packages for launches and literary fairs, social ad creatives, and press-ready files coordinated with print houses — 10+ projects running at once.",
  },
  {
    date: "Jun — Dec 2023",
    role: "Graphic Designer",
    company: "Mr. Bricolage",
    body: "Social media graphics and content calendars for one of Kosovo's leading retail brands, plus print and digital merchandise catalogues — all within strict brand guidelines.",
  },
  {
    date: "2022 — 2023",
    role: "Freelance Graphic Designer",
    company: "Self-employed",
    body: "Full-package branding for local businesses: logos, visual identities, social media kits, promotional visuals and print materials.",
  },
] as const

export const education = [
  { label: "Education", title: "Bachelor of Business & Marketing", meta: "AAB College · Oct 2024 — Present" },
  { label: "Certification", title: "Graphic Design Course", meta: "Innovation Centre Kosovo (ICK) · 2022" },
  { label: "Languages", title: "Albanian & English", meta: "Native · Professional working" },
] as const

export const tools = [
  { short: "Id", name: "InDesign", tone: "id" },
  { short: "Ps", name: "Photoshop", tone: "ps" },
  { short: "Ai", name: "Illustrator", tone: "ai" },
  { short: "Ex", name: "Adobe Express", tone: "ex" },
  { short: "Fg", name: "Figma", tone: "fg" },
] as const

export const stats = [
  { value: 3, suffix: "+", label: "Years of professional design" },
  { value: 10, suffix: "+", label: "Concurrent projects on deadline" },
  { value: 3, suffix: "", label: "Studios & brands designed for" },
  { value: 5, suffix: "", label: "Core tools mastered" },
] as const

export const marqueeWords = [
  "Book Covers",
  "Editorial Layout",
  "Brand Identity",
  "Typography",
  "Social Media",
  "Catalogues",
  "Prepress",
] as const
