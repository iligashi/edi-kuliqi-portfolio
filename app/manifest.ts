import type { MetadataRoute } from "next"
import { profile } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: "Edi Kuliqi",
    description: profile.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f1ede4",
    theme_color: "#f1ede4",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  }
}
