export const profile = {
  name: "Edi Kuliqi",
  firstName: "Edi",
  lastName: "Kuliqi",
  role: "Graphic Designer",
  tagline: "Branding · Packaging · Print & Digital",
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
    "Edi Kuliqi is a mid-level graphic designer in Pristina, Kosovo with 3+ years in brand identity, logo and packaging design, labels, posters, book covers and social media campaigns — press-ready and on deadline.",
} as const

export interface WorkImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  category: string
  summary: string
  /** Card background shown behind the cover while it loads. */
  tone: string
  images: readonly WorkImage[]
  /** External live link — the card opens this instead of the gallery. */
  url?: string
}

export const projects: readonly Project[] = [
  {
    slug: "nero",
    title: "Nero",
    category: "Brand identity",
    summary: "Identity for a neighbourhood caffè shop: a sculpted wordmark, hand-drawn bean-to-cup illustrations, posters and a deep green storefront.",
    tone: "#1b3016",
    images: [
      { src: "/work/nero-storefront.jpg", alt: "Nero caffè shop storefront in deep green with the cream Nero wordmark and two window posters", width: 1280, height: 1600 },
      { src: "/work/nero-logo.jpg", alt: "Nero wordmark on green with a row of illustrations from coffee cherry to grinder, moka pot and cup", width: 1280, height: 1600 },
    ],
  },
  {
    slug: "etincelle",
    title: "Étincelle",
    category: "Label design",
    summary: "Champagne label for Maison Étincelle — engraved blue florals, a pair of songbirds and a gold-foil wordmark on textured paper.",
    tone: "#16201a",
    images: [
      { src: "/work/etincelle-label-1.jpg", alt: "Étincelle champagne bottle with an oval label framed by blue engraved flowers and a gold wordmark", width: 960, height: 1280 },
      { src: "/work/etincelle-label-2.jpg", alt: "Second view of the Étincelle champagne label on a dark green bottle", width: 960, height: 1280 },
    ],
  },
  {
    slug: "rawx",
    title: "RAWX",
    category: "Mascot · Logo",
    summary: "Energy drink brand built around an illustrated gorilla mascot and a cracked, distressed red wordmark.",
    tone: "#ffffff",
    images: [
      { src: "/work/rawx-mascot-1.jpg", alt: "RAWX energy drink logo with an illustrated muscular gorilla, arms crossed, above a cracked red wordmark", width: 1280, height: 1600 },
      { src: "/work/rawx-mascot-2.jpg", alt: "RAWX logo variation with the roaring gorilla mascot pointing forward", width: 1280, height: 1600 },
    ],
  },
  {
    slug: "posters",
    title: "Poster Series",
    category: "Posters · Illustration",
    summary: "A series of art prints — bold black hand illustrations, hand-lettered type and a fluid cobalt figure — styled in warm, lived-in interiors.",
    tone: "#e6dccd",
    images: [
      { src: "/work/poster-your-life.jpg", alt: "Framed poster of black illustrated hands around the words 'your life is on your hand' above a red record console", width: 2400, height: 3000 },
      { src: "/work/poster-its-ok.jpg", alt: "Framed poster reading 'it's OK' in bold black brush lettering on a wooden sideboard", width: 2400, height: 3000 },
      { src: "/work/poster-hands.jpg", alt: "Black-and-white poster of hand gestures hanging above a vintage hi-fi setup with an orange arc lamp", width: 2400, height: 3000 },
      { src: "/work/poster-blue-figure.jpg", alt: "Large framed print of a flowing cobalt-blue abstract figure above a leather lounge chair", width: 2400, height: 3000 },
    ],
  },
  {
    slug: "corte",
    title: "Corte",
    category: "Brand identity",
    summary: "Elegant boutique identity — a flourish monogram and refined serif wordmark, shown as illuminated signage and on embossed plum stationery.",
    tone: "#4a1238",
    images: [
      { src: "/work/corte-storefront.jpg", alt: "Corte boutique storefront with a backlit gold logo above glass doors", width: 1600, height: 1088 },
      { src: "/work/corte-stationery.jpg", alt: "Corte logo embossed in white on plum paper with a subtle floral pattern", width: 1600, height: 1116 },
    ],
  },
  {
    slug: "equestro",
    title: "Equestro",
    category: "Wine label",
    summary: "Red wine label with an engraved knight-and-banner illustration and classic serif typography.",
    tone: "#585c68",
    images: [
      { src: "/work/equestro-wine.jpg", alt: "Equestro red wine bottle with an engraved knight illustration on its label, floating between dark stones", width: 1600, height: 1200 },
    ],
  },
  {
    slug: "howl",
    title: "Howl",
    category: "Wordmark · Apparel",
    summary: "Brush-script wordmark with a confident, retro swing — carried onto oversized tees with a mirrored, interlocking back print.",
    tone: "#ffffff",
    images: [
      { src: "/work/howl-wordmark.jpg", alt: "Howl wordmark in bold black script on white", width: 2400, height: 3000 },
      { src: "/work/howl-tshirt.jpg", alt: "Two models in white oversized Howl t-shirts, front chest logo and a large black mirrored graphic on the back", width: 2400, height: 3000 },
    ],
  },
  {
    slug: "elora",
    title: "Élora",
    category: "Packaging",
    summary: "Minimal skincare packaging — a quiet serif wordmark on frosted glass, styled with stone and dried botanicals.",
    tone: "#e9e6e0",
    images: [
      { src: "/work/elora-skincare.jpg", alt: "Élora skin care jar with a white lid resting on pale stones beside dried branches", width: 1600, height: 1200 },
    ],
  },
  {
    slug: "superkomunikuesit",
    title: "Superkomunikuesit",
    category: "Book cover",
    summary: "Albanian edition cover for Charles Duhigg's Supercommunicators — a spectrum of colour bars cutting through the title.",
    tone: "#f4f4f2",
    images: [
      { src: "/work/superkomunikuesit-cover.jpg", alt: "Book cover of Superkomunikuesit by Charles Duhigg with vertical rainbow bars under the title", width: 1280, height: 853 },
    ],
  },
  {
    slug: "sushi",
    title: "Sushi Bar",
    category: "Packaging",
    summary: "Chopstick sleeve for a sushi restaurant — a custom angular wordmark, red rising-sun mark and seigaiha wave pattern.",
    tone: "#ececec",
    images: [
      { src: "/work/sushi-chopsticks.jpg", alt: "Black chopstick sleeve with a white angular wordmark, a red circle and a subtle wave pattern", width: 1200, height: 1600 },
    ],
  },
  {
    slug: "spartan",
    title: "Spartan Emblem",
    category: "Logo mark",
    summary: "Bold single-colour emblem of a helmeted warrior and sword, built to hold up at any size.",
    tone: "#eeece4",
    images: [
      { src: "/work/spartan-emblem.jpg", alt: "Black emblem of a muscular Spartan warrior with a helmet and sword on a light background", width: 1280, height: 1600 },
    ],
  },
  {
    slug: "oneposters",
    title: "OnePosters",
    category: "Web · Live site",
    summary: "A live web project — open oneposters.vercel.app to explore it.",
    tone: "#141312",
    images: [],
    url: "https://oneposters.vercel.app",
  },
]

export const services = [
  {
    title: "Brand Identity",
    body: "Logos, wordmarks, mascots and full visual identity systems — with guidelines that keep every touchpoint, from signage to social, consistent.",
    glyph: "◐",
    tone: "ink",
  },
  {
    title: "Packaging & Labels",
    body: "Wine and champagne labels, cosmetics and food packaging that earn their place on the shelf — prepared for print down to the foil and finish.",
    glyph: "%",
    tone: "yellow",
  },
  {
    title: "Print & Publishing",
    body: "Posters, catalogues, book covers and layouts — press-ready files coordinated with the print house until the colour is right.",
    glyph: "Aa",
    tone: "red",
  },
  {
    title: "Social & Digital",
    body: "Campaign visuals, ad creatives, content calendars and web visuals, adapted to every format and screen size.",
    glyph: "#",
    tone: "blue",
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
  "Brand Identity",
  "Logo Design",
  "Packaging",
  "Labels",
  "Posters",
  "Typography",
  "Book Covers",
  "Social Media",
] as const
