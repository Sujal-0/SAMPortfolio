// pages/ResumePage.jsx
// Full-screen resume text version — 100vh, single page.
// Font: Font3 (monospace code font used in resume section code block).
// Ruler border on all four sides using same tick system.
// Download button uses InverseOutlineButton with download icon.

import { motion } from "framer-motion";
import Noise from "../shared/Noise";
import InverseOutlineButton from "../shared/InverseOutlineButton";

// ─── Ruler helpers (same tick logic as everywhere else) ───────────────────
const TICK_MAJOR = "rgba(255,255,255,0.45)";
const TICK_MID = "rgba(255,255,255,0.22)";
const TICK_MINOR = "rgba(255,255,255,0.12)";
const RAIL = "rgba(255,255,255,0.14)";

function buildTicks(n) {
  const t = [];
  for (let s = 0; s < n; s++) {
    t.push({ type: "major" });
    for (let m = 0; m < 9; m++) t.push({ type: m === 4 ? "mid" : "minor" });
  }
  t.push({ type: "major" });
  return t;
}

// Horizontal rail — ticks point inward (down on top, up on bottom)
function HRail({ n = 10, down = true }) {
  const ticks = buildTicks(n);
  return (
    <div style={{ position: "relative", height: 24, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [down ? "top" : "bottom"]: 0,
          height: 1,
          background: RAIL,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [down ? "top" : "bottom"]: 1,
          height: 23,
          display: "flex",
          alignItems: down ? "flex-start" : "flex-end",
        }}
      >
        {ticks.map((t, i) => {
          const h = t.type === "major" ? 16 : t.type === "mid" ? 10 : 6;
          const bg =
            t.type === "major"
              ? TICK_MAJOR
              : t.type === "mid"
                ? TICK_MID
                : TICK_MINOR;
          const w = t.type === "major" ? 1.5 : 1;
          return (
            <div
              key={i}
              style={{
                flex: t.type === "major" ? "none" : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: down ? "flex-start" : "flex-end",
              }}
            >
              <div style={{ width: w, height: h, background: bg }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Vertical rail — ticks point inward (right on left, left on right)
function VRail({ n = 6, right = true }) {
  const ticks = buildTicks(n);
  return (
    <div style={{ position: "relative", width: 24, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [right ? "left" : "right"]: 0,
          width: 1,
          background: RAIL,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [right ? "left" : "right"]: 1,
          width: 23,
          display: "flex",
          flexDirection: "column",
          alignItems: right ? "flex-start" : "flex-end",
        }}
      >
        {ticks.map((t, i) => {
          const w = t.type === "major" ? 16 : t.type === "mid" ? 10 : 6;
          const bg =
            t.type === "major"
              ? TICK_MAJOR
              : t.type === "mid"
                ? TICK_MID
                : TICK_MINOR;
          const h = t.type === "major" ? 1.5 : 1;
          return (
            <div
              key={i}
              style={{
                flex: t.type === "major" ? "none" : 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: right ? "flex-start" : "flex-end",
              }}
            >
              <div style={{ width: w, height: h, background: bg }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Download icon ────────────────────────────────────────────────────────
const DownloadIcon = ({ color = "currentColor" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ─── Section label ────────────────────────────────────────────────────────
const MONO = '"Font3", monospace';

function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "14px 0 8px",
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        {children}
      </span>
      <div
        style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function ResumePage({ onGoHome }) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/images/SujalSingh_CV.pdf";
    a.download = "SujalSingh_CV.pdf";
    a.click();
  };

  return (
    <motion.div
      id="resume-page-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "100vh",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Noise */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Noise patternAlpha={12} patternRefreshInterval={3} />
      </div>

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ruler border — full viewport rectangle */}
      <HRail n={14} down={true} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <VRail n={8} right={true} />

        {/* ── Main content ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 40px 24px",
            scrollbarWidth: "none",
            position: "relative",
            zIndex: 2,
            fontFamily: MONO,
          }}
        >
          {/* ── Header row ────────────────────────────────────────── */}
          <div
            className="resume-page-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 4,
            }}
          >
            <div>
              <div
                className="resume-page-name"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.06em",
                  lineHeight: 1.1,
                }}
              >
                SUJAL SINGH
              </div>
              <div
                className="resume-page-role"
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.18em",
                  marginTop: 4,
                }}
              >
                FULL STACK WEB DEVELOPER
              </div>
            </div>
            {/* Action buttons */}
            <div
              className="resume-page-actions"
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {/* Download — same InverseOutlineButton but with icon prepended */}
              <InverseOutlineButton onClick={handleDownload}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <DownloadIcon /> PDF
                </span>
              </InverseOutlineButton>
              <InverseOutlineButton onClick={onGoHome}>
                Back
              </InverseOutlineButton>
            </div>
          </div>

          {/* ── Contact line ──────────────────────────────────────── */}
          <div
            className="resume-page-contact"
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 2,
            }}
          >
            {[
              { label: "Phone", val: "+91-9832741956" },
              {
                label: "Email",
                val: "sujalsingh2204@gmail.com",
                href: "mailto:sujalsingh2204@gmail.com",
              },
              {
                label: "LinkedIn",
                val: "linkedin.com/in/sujalsingh01",
                href: "https://www.linkedin.com/in/sujalsingh01",
              },
              {
                label: "GitHub",
                val: "github.com/Sujal-0",
                href: "https://github.com/Sujal-0",
              },
              {
                label: "LeetCode",
                val: "leetcode.com/u/samColon",
                href: "https://leetcode.com/u/samColon",
              },
            ].map(({ label, val, href }) => (
              <span
                key={label}
                className="resume-page-contact-item"
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.12em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.22)" }}>
                  {label}:{" "}
                </span>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                    }}
                  >
                    {val}
                  </a>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{val}</span>
                )}
              </span>
            ))}
          </div>

          {/* ── Profile ───────────────────────────────────────────── */}
          <SectionLabel>Profile</SectionLabel>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            Frontend-focused Web Developer with strong skills in HTML5, CSS3,
            JavaScript, and responsive UI design. Experienced in building
            cross-browser compatible, mobile-first web applications using modern
            frameworks and libraries like React.js, Bootstrap, and jQuery.
            Skilled in debugging, testing, and delivering clean, scalable code.
            Strong communicator with experience working in teams to deliver
            projects efficiently.
          </p>

          {/* ── Skills ────────────────────────────────────────────── */}
          <SectionLabel>Skills</SectionLabel>
          <div
            className="resume-page-skills-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3px 24px",
            }}
          >
            {[
              ["Languages", "C, JavaScript, Java (basic)"],
              [
                "Front-End",
                "HTML, CSS, Bootstrap, Tailwind CSS, Material UI, jQuery, React.js, Zustand",
              ],
              ["Back-End", "Node.js, Express.js, REST APIs, Axios"],
              ["Misc", "Socket.IO, LottieFiles, Skiper UI"],
              ["Databases", "MySQL, MongoDB, PostgreSQL"],
              ["Tools", "Git, GitHub, Postman"],
            ].map(([cat, val]) => (
              <div
                key={cat}
                style={{
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  letterSpacing: "0.06em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.3)" }}>{cat}: </span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{val}</span>
              </div>
            ))}
          </div>

          {/* ── Projects ──────────────────────────────────────────── */}
          <SectionLabel>Projects</SectionLabel>
          <div
            className="resume-page-projects"
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            {[
              {
                name: "LoopIn — Connect and Chat in Real-Time",
                bullets: [
                  "Built with React.js, Node.js, Express.js, and Socket.IO for instant messaging.",
                  "Managed state with Zustand, secured with JWT authentication, image uploads with Multer.",
                  "Mobile-first UI with Tailwind CSS and Lottie animations.",
                ],
              },
              {
                name: "Snipsy — Create and Share Beautiful Code Images",
                bullets: [
                  "Paste or write source code in editor with live preview.",
                  "Customise themes, fonts, backgrounds, padding, line spacing, and shadows.",
                  "Export as high-resolution images ideal for retina displays.",
                ],
              },
              {
                name: "Note App with Draggable Features",
                bullets: [
                  "Drag-and-drop note-taking application for efficient organisation.",
                ],
              },
              {
                name: "Ride-Sharing Web Application",
                bullets: [
                  "Built with React, Node.js, Express, MongoDB, and PostgreSQL.",
                  "Google Maps integration for tracking, Stripe API for payments.",
                  "Responsive UI with Material UI and Tailwind CSS.",
                ],
              },
            ].map(({ name, bullets }) => (
              <div key={name}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.82)",
                    letterSpacing: "0.08em",
                    marginBottom: 2,
                  }}
                >
                  {name}
                </div>
                {bullets.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 10.5,
                      color: "rgba(255,255,255,0.52)",
                      letterSpacing: "0.05em",
                      lineHeight: 1.6,
                      paddingLeft: 14,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.25)",
                        marginRight: 6,
                      }}
                    >
                      ›
                    </span>
                    {b}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── Education ─────────────────────────────────────────── */}
          <SectionLabel>Education</SectionLabel>
          <div
            className="resume-page-education"
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {[
              {
                inst: "Lloyd Institute of Engineering and Technology",
                deg: "Master of Computer Applications",
                year: "2024–2026",
              },
              {
                inst: "Asansol Engineering College",
                deg: "Bachelor of Computer Application",
                year: "2021–2024",
                note: "CGPA: 8.26",
              },
            ].map(({ inst, deg, year, note }) => (
              <div
                key={inst}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.82)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {inst}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {deg}
                    {note ? ` — ${note}` : ""}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.12em",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  {year}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <VRail n={8} right={false} />
      </div>

      <HRail n={14} down={false} />
    </motion.div>
  );
}
