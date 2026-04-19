// components/contact/ContactSection.jsx
// Animation is driven entirely by ResumeSection's ScrollTrigger scrub.
// This component is purely presentational — no GSAP here.

// ─── Shared ruler tick builder ─────────────────────────────────────────────
function RulerTicks({ segments = 8 }) {
  const items = [];
  for (let s = 0; s < segments; s++) {
    items.push({ type: "major", key: `m-${s}` });
    for (let t = 0; t < 9; t++) {
      items.push({ type: t === 4 ? "mid" : "minor", key: `${s}-${t}` });
    }
  }
  items.push({ type: "major", key: `m-end` });

  return (
    <div
      style={{ flex: 1, display: "flex", alignItems: "flex-end", height: 20 }}
    >
      {items.map((item) => {
        if (item.type === "major")
          return (
            <div key={item.key} style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: 1.5,
                  height: 18,
                  background: "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          );
        return (
          <div
            key={item.key}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 1,
                height: item.type === "mid" ? 11 : 6,
                background: "rgba(255,255,255,0.15)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Full-width horizontal ruler ──────────────────────────────────────────
function HorizontalRuler() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        height: 24,
        marginBottom: 28,
      }}
    >
      <RulerTicks segments={10} />
    </div>
  );
}

// ─── Meta row with ruler dividers ─────────────────────────────────────────
function MetaRow() {
  const year = new Date().getFullYear();

  return (
    <div
      className="contact-meta-row"
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 28,
        width: "100%",
        gap: 0,
        paddingTop: 6,
        overflow: "visible",
      }}
    >
      {/* YEAR block */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: 14,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 20,
            padding: "3px 11px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: '"Font3", sans-serif',
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            YEAR
          </span>
        </div>
        {/* Ruler fills gap */}
        <RulerTicks segments={4} />
        <span
          className="contact-meta-value"
          style={{
            fontFamily: '"MainFont", sans-serif',
            fontSize: "clamp(1.6rem, 3.2vw, 3.4rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            marginLeft: 16,
            letterSpacing: "0.04em",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {year}
        </span>
      </div>

      {/* Vertical divider */}
      <div
        className="contact-meta-divider"
        style={{
          width: 1,
          height: 38,
          background: "rgba(255,255,255,0.12)",
          flexShrink: 0,
          margin: "0 32px",
        }}
      />

      {/* LOCATION block */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: 14,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 20,
            padding: "3px 11px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: '"Font3", sans-serif',
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            LOCATION
          </span>
        </div>
        {/* Ruler fills gap */}
        <RulerTicks segments={4} />
        <span
          className="contact-meta-value contact-location-value"
          style={{
            fontFamily: '"MainFont", sans-serif',
            fontSize: "clamp(1.3rem, 2.6vw, 3rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            marginLeft: 16,
            letterSpacing: "0.04em",
            lineHeight: 1.25,
            paddingTop: 3,
            paddingBottom: 3,
            flexShrink: 1,
            minWidth: 0,
            whiteSpace: "nowrap",
          }}
        >
          <span className="contact-location-desktop">Asansol, India</span>
          <span className="contact-location-mobile">Asansol, IND.</span>
        </span>
      </div>
    </div>
  );
}

// ─── Links ─────────────────────────────────────────────────────────────────
const LINKS = [
  {
    label: "sujalsingh2204@gmail.com",
    href: "mailto:sujalsingh2204@gmail.com",
    type: "email",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sujalsingh01",
    type: "social",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_sujal_singh01/",
    type: "social",
  },
  { label: "Github", href: "https://github.com/Sujal-0", type: "social" },
  {
    label: "© 2026 Sujal Singh. All rights reserved.",
    href: null,
    type: "copy",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function ContactSection() {
  return (
    <div
      className="contact-section-wrap"
      style={{
        padding: "32px 48px 40px",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid — same as ResumeSection */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* All content above grid */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Full-width ruler separator */}
        <HorizontalRuler />

        {/* Year / Location row */}
        <MetaRow />

        {/* LET'S TALK + links */}
        <div
          className="contact-bottom-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {/* LEFT */}
          <div style={{ lineHeight: 1, userSelect: "none", flexShrink: 0 }}>
            <span
              className="contact-lets"
              style={{
                fontFamily: '"Font4", sans-serif',
                fontSize: "clamp(2rem, 4vw, 4.5rem)",
                fontWeight: 900,
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.02em",
              }}
            >
              LET&apos;S{" "}
            </span>
            <span
              className="contact-talk"
              style={{
                fontFamily: '"MainFont", sans-serif',
                fontSize: "clamp(1.6rem, 3.2vw, 3.6rem)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              TALK.
            </span>
          </div>

          {/* RIGHT — links */}
          <div
            className="contact-links-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0 28px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {LINKS.map((link, i) => {
              const isCopy = link.type === "copy";
              const isEmail = link.type === "email";
              const style = {
                fontFamily: '"Font3", sans-serif',
                fontSize: isEmail ? 13 : 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isCopy
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(255,255,255,0.65)",
                transition: "color 0.25s ease",
                whiteSpace: "nowrap",
                cursor: link.href ? "pointer" : "default",
              };
              if (!link.href)
                return (
                  <span
                    key={i}
                    className={isCopy ? "contact-copyright" : ""}
                    style={style}
                  >
                    {link.label}
                  </span>
                );
              return (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  style={style}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isCopy
                      ? "rgba(255,255,255,0.28)"
                      : "rgba(255,255,255,0.65)";
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
