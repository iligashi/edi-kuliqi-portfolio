import { ImageResponse } from "next/og"
import { profile } from "@/lib/site"

export const alt = `${profile.name} — Graphic Designer, Pristina`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#f1ede4",
          color: "#141312",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#6d675d" }}>
          <span>( Graphic Designer )</span>
          <span>Pristina, Kosovo</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 190, fontWeight: 800, lineHeight: 0.85, letterSpacing: -10 }}>
          <span>Edi</span>
          <span style={{ paddingLeft: 140 }}>
            <span style={{ color: "#e2361f" }}>K</span>uliqi
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28 }}>
          <span>Branding · Packaging · Print · Social</span>
          <div style={{ display: "flex", width: 90, height: 135, background: "#e2361f", borderRadius: 6 }} />
        </div>
      </div>
    ),
    size,
  )
}
