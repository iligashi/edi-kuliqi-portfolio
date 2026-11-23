import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Cursor } from "@/components/cursor"
import { profile } from "@/lib/site"
import "./globals.css"

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
})

const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-serif",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

const title = `${profile.name} — Graphic Designer in Pristina | Branding, Packaging & Print`
const shortTitle = `${profile.name} — Graphic Designer`
const ogDescription =
  "Brand identities, logos, packaging, labels and posters — designed in Pristina, built for print and screen."

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Edi Kuliqi",
    "graphic designer Kosovo",
    "graphic designer Pristina",
    "dizajner grafik Prishtinë",
    "brand identity designer",
    "logo designer Kosovo",
    "packaging design",
    "label design",
    "poster design",
    "book cover designer",
    "social media designer",
    "catalogue design",
    "prepress",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    firstName: profile.firstName,
    lastName: profile.lastName,
    title: shortTitle,
    description: ogDescription,
    url: "/",
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: shortTitle, description: ogDescription },
  other: { "geo.region": profile.countryCode, "geo.placename": profile.city },
  category: "design",
}

export const viewport: Viewport = {
  themeColor: "#f1ede4",
  colorScheme: "light",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${profile.site}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      description: profile.description,
      url: profile.site,
      email: `mailto:${profile.email}`,
      telephone: profile.phoneHref,
      address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: profile.countryCode },
      worksFor: { "@type": "Organization", name: "Dukagjini Publishing House" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "AAB College" },
        { "@type": "EducationalOrganization", name: "Innovation Centre Kosovo" },
      ],
      knowsAbout: [
        "Brand identity",
        "Logo design",
        "Packaging design",
        "Label design",
        "Poster design",
        "Typography",
        "Book cover design",
        "Prepress",
        "Social media design",
        "Catalogue design",
        "Adobe InDesign",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Figma",
      ],
      knowsLanguage: ["sq", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${profile.site}/#website`,
      url: profile.site,
      name: shortTitle,
      inLanguage: "en",
      publisher: { "@id": `${profile.site}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${profile.site}/#profile`,
      url: profile.site,
      name: `${profile.name} — Portfolio`,
      mainEntity: { "@id": `${profile.site}/#person` },
      isPartOf: { "@id": `${profile.site}/#website` },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          // Static, trusted data built from lib/site.ts — "<" escaped to prevent breaking out of the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  )
}
