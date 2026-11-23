import type { ArtKind } from "@/lib/site"

/** CSS-drawn placeholder artwork for each project type. Replace with real images when available. */
export function Art({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "book":
      return (
        <div className="bk">
          <div className="bk__spine" />
          <div className="bk__face">
            <span className="bk__author">E. Kuliqi Studio</span>
            <span className="bk__title">
              Deti i<br />
              Heshtur
            </span>
            <span className="bk__sun" />
          </div>
        </div>
      )
    case "spread":
      return (
        <div className="spread">
          <div className="pg">
            <i className="h" />
            <i />
            <i />
            <i />
            <i className="s" />
            <i />
            <i />
          </div>
          <div className="pg">
            <b className="img" />
            <i />
            <i />
            <i className="s" />
            <i />
          </div>
        </div>
      )
    case "poster":
      return (
        <div className="poster">
          <span className="poster__big">Lexo.</span>
          <span className="poster__sub">
            Panairi i Librit
            <br />— Book Fair Campaign
          </span>
          <span className="poster__circle" />
        </div>
      )
    case "catalogue":
      return (
        <div className="cat">
          <div className="cat__cover">
            <span>
              Home
              <br />
              &amp; DIY
            </span>
            <em>Spring catalogue</em>
          </div>
          <div className="cat__page">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
      )
    case "brand":
      return (
        <div className="brand">
          <div className="brand__mark">
            <span>m</span>
          </div>
          <div className="brand__word">
            mëngjes<small>coffee · bakery</small>
          </div>
          <div className="brand__pal">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )
    case "social":
      return (
        <div className="social">
          <i className="a">
            New
            <br />
            release
          </i>
          <i className="b" />
          <i className="c">-30%</i>
          <i className="d" />
          <i className="e">
            Author
            <br />
            talk
          </i>
          <i className="f" />
        </div>
      )
  }
}
