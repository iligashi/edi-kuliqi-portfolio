import Link from "next/link"

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="h2" style={{ margin: "16px auto" }}>
          This page went <em className="serif">to print</em> without us.
        </h1>
        <Link href="/" className="nav__cta">Back home</Link>
      </div>
    </main>
  )
}
