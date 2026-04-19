// components/hero/Hero.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PremiumTypeBox from "./PremiumTypeBox";

const EASE = [0.22, 1, 0.36, 1];

const HERO_FONTS = [
  '"Font1", sans-serif',
  '"Font4", sans-serif',
  '"Font5", sans-serif',
];
const FONT_SCALES = [1.0, 0.8, 0.8];
const FLIP_INTERVAL_MS = 3000;

// ─── 3D flipping word ─────────────────────────────────────────────────────
function AutoFlipWord({ text, reverseFlip = false }) {
  const [flipCount, setFlipCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const flip = () => setFlipCount((p) => p + 1);
      flip();
      const id = setInterval(flip, FLIP_INTERVAL_MS);
      return () => clearInterval(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const dir = reverseFlip ? -1 : 1;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        height: "1.1em",
        perspective: "2000px",
        padding: "0 0.15em",
      }}
    >
      <span
        style={{ opacity: 0, fontFamily: HERO_FONTS[0], pointerEvents: "none" }}
      >
        {text}
      </span>
      <motion.div
        animate={{ rotateX: flipCount * 90 * dir }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        {[flipCount - 1, flipCount, flipCount + 1].map((step) => {
          if (step < 0) return null;
          const fi = step % HERO_FONTS.length;
          return (
            <div
              key={step}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
                transform: `rotateX(${-step * 90 * dir}deg) translateZ(0.55em)`,
                fontFamily: HERO_FONTS[fi],
              }}
            >
              <span style={{ transform: `scale(${FONT_SCALES[fi]})` }}>
                {text}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Slide-up reveal ─────────────────────────────────────────────────────
function RevealLine({ children, delay }) {
  const [done, setDone] = useState(false);
  return (
    <div style={{ overflow: done ? "visible" : "hidden" }}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.45, ease: EASE, delay }}
        onAnimationComplete={() => setDone(true)}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Ruler border helpers ─────────────────────────────────────────────────
// Ticks always point INWARD (toward the content).
// Horizontal rails: ticks hang downward on top, upward on bottom.
// Vertical rails: ticks point right on left side, left on right side.

const TICK_COLOR_MAJOR = "rgba(255,255,255,0.50)";
const TICK_COLOR_MID = "rgba(255,255,255,0.28)";
const TICK_COLOR_MINOR = "rgba(255,255,255,0.16)";
const RAIL_COLOR = "rgba(255,255,255,0.18)";

// Build a flat tick list: N_SEG segments × (major + 9 ticks) + final major
function buildTicks(nSeg) {
  const ticks = [];
  for (let s = 0; s < nSeg; s++) {
    ticks.push({ type: "major" });
    for (let m = 0; m < 9; m++) ticks.push({ type: m === 4 ? "mid" : "minor" });
  }
  ticks.push({ type: "major" });
  return ticks;
}

// Horizontal ruler strip (top or bottom of the rectangle)
// ticksDown=true → ticks hang downward (top rail), false → upward (bottom rail)
function HRuler({ nSeg = 10, ticksDown = true, width = "100%" }) {
  const ticks = buildTicks(nSeg);
  const RAIL_H = 1;
  const TOTAL_H = 28; // total height of the strip

  return (
    <div
      style={{ width, position: "relative", height: TOTAL_H, flexShrink: 0 }}
    >
      {/* Rail line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [ticksDown ? "top" : "bottom"]: 0,
          height: RAIL_H,
          background: RAIL_COLOR,
        }}
      />
      {/* Ticks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [ticksDown ? "top" : "bottom"]: RAIL_H,
          display: "flex",
          alignItems: ticksDown ? "flex-start" : "flex-end",
          height: TOTAL_H - RAIL_H,
        }}
      >
        {ticks.map((t, i) => {
          const h = t.type === "major" ? 18 : t.type === "mid" ? 12 : 7;
          const bg =
            t.type === "major"
              ? TICK_COLOR_MAJOR
              : t.type === "mid"
                ? TICK_COLOR_MID
                : TICK_COLOR_MINOR;
          const w = t.type === "major" ? 1.5 : 1;
          const isMajor = t.type === "major";
          return (
            <div
              key={i}
              style={{
                flex: isMajor ? "none" : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: ticksDown ? "flex-start" : "flex-end",
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

// Vertical ruler strip (left or right of the rectangle)
// ticksRight=true → ticks point right (left rail), false → left (right rail)
function VRuler({ nSeg = 6, ticksRight = true, height = "100%" }) {
  const ticks = buildTicks(nSeg);
  const RAIL_W = 1;
  const TOTAL_W = 28;

  return (
    <div
      style={{ height, position: "relative", width: TOTAL_W, flexShrink: 0 }}
    >
      {/* Rail line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [ticksRight ? "left" : "right"]: 0,
          width: RAIL_W,
          background: RAIL_COLOR,
        }}
      />
      {/* Ticks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [ticksRight ? "left" : "right"]: RAIL_W,
          display: "flex",
          flexDirection: "column",
          alignItems: ticksRight ? "flex-start" : "flex-end",
          width: TOTAL_W - RAIL_W,
        }}
      >
        {ticks.map((t, i) => {
          const w = t.type === "major" ? 18 : t.type === "mid" ? 12 : 7;
          const bg =
            t.type === "major"
              ? TICK_COLOR_MAJOR
              : t.type === "mid"
                ? TICK_COLOR_MID
                : TICK_COLOR_MINOR;
          const h = t.type === "major" ? 1.5 : 1;
          const isMajor = t.type === "major";
          return (
            <div
              key={i}
              style={{
                flex: isMajor ? "none" : 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: ticksRight ? "flex-start" : "flex-end",
              }}
            >
              <div style={{ height: h, width: w, background: bg }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Rectangular ruler border wrapping SUJAL / SINGH ─────────────────────
// Layout:
//   [ top H-ruler                   ]
//   [ L V-ruler ][ names ][ R V-ruler ]
//   [ bottom H-ruler                ]
function RulerRect({ children }) {
  // Horizontal: wide rectangle → more segments
  // Vertical: shorter → fewer segments
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* Top */}
      <HRuler nSeg={12} ticksDown={true} />

      {/* Middle row */}
      <div style={{ display: "flex", alignItems: "stretch" }}>
        {/* Left rail */}
        {/* <VRuler nSeg={5} ticksRight={true} /> */}

        {/* Content — padding gives breathing gap between names and the rails */}
        {/* MOBILE FIX — ruler-rect-inner targets mobile padding reduction */}
        <div className="ruler-rect-inner" style={{ padding: "18px 32px" }}>
          {children}
        </div>

        {/* Right rail */}
        {/* <VRuler nSeg={5} ticksRight={false} /> */}
      </div>

      {/* Bottom */}
      <HRuler nSeg={12} ticksDown={false} />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.09, ease: "easeIn", delay: 0.15 }}
      style={{ background: "#0a0a0a" }}
      className="relative flex items-center justify-center h-full overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #0a0a0a 100%)",
        }}
      />

      {/* Content — ruler rect + typewriter below it */}
      <div className="relative z-10 flex flex-col items-center gap-0 px-6 text-center">
        {/* Ruler rectangle wraps SUJAL + SINGH */}
        <RulerRect>
          {/* SUJAL */}
          <RevealLine delay={0.2}>
            {/* MOBILE FIX — hero-name-h1 class targets mobile font/spacing override */}
            <h1
              className="hero-name-h1"
              style={{
                fontSize: "clamp(3.6rem, 15vw, 11rem)",
                fontWeight: 700,
                letterSpacing: "0.32em",
                color: "#ffffff",
                lineHeight: 1,
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              <AutoFlipWord text="SUJAL" />
            </h1>
          </RevealLine>

          {/* SINGH */}
          <RevealLine delay={0.32}>
            {/* MOBILE FIX — hero-name-h1 class */}
            <h1
              className="hero-name-h1"
              style={{
                fontSize: "clamp(3.6rem, 15vw, 11rem)",
                fontWeight: 700,
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.25)",
                lineHeight: 1,
                whiteSpace: "nowrap",
                marginTop: "0.08em",
                marginBottom: 0,
              }}
            >
              <AutoFlipWord text="SINGH" reverseFlip={true} />
            </h1>
          </RevealLine>
        </RulerRect>

        {/* PremiumTypeBox sits below the ruler border, unaffected */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          style={{ marginTop: "20px" }}
        >
          <PremiumTypeBox />
        </motion.div>
      </div>
    </motion.section>
  );
}
