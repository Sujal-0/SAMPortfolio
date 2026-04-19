// components/hero/PremiumTypeBox.jsx
// Self-contained sequential typewriter with:
// - Corner-only border container
// - Blinking underscore cursor
// - IntersectionObserver replay on scroll re-entry

import { useEffect, useRef, useState, useCallback } from "react";

const LINE1 = "Full Stack Engineer";
const LINE2 = "Crafting experiences that speak before words do";

const SPEED_L1 = 55; // ms per char
const SPEED_L2 = 38; // ms per char
const PAUSE = 420; // ms between line 1 done → line 2 start

// ── Corner border via CSS background gradients ─────────────────────────────
const CORNER_LEN = "18px"; // how long each corner line extends

const cornerStyle = {
  position: "relative",
  display: "inline-block",
  padding: "18px 28px",
};

const cornerBefore = `
  .ptb-wrap::before,
  .ptb-wrap::after {
    content: "";
    position: absolute;
    width: ${CORNER_LEN};
    height: ${CORNER_LEN};
    pointer-events: none;
  }
`;

// We draw 4 corner pieces via 4 pseudo-like absolutely-positioned spans
function CornerBorder() {
  const c = "rgba(255,255,255,0.45)";
  const t = "1.5px";
  const corners = [
    {
      top: 0,
      left: 0,
      borderTop: `${t} solid ${c}`,
      borderLeft: `${t} solid ${c}`,
    },
    {
      top: 0,
      right: 0,
      borderTop: `${t} solid ${c}`,
      borderRight: `${t} solid ${c}`,
    },
    {
      bottom: 0,
      left: 0,
      borderBottom: `${t} solid ${c}`,
      borderLeft: `${t} solid ${c}`,
    },
    {
      bottom: 0,
      right: 0,
      borderBottom: `${t} solid ${c}`,
      borderRight: `${t} solid ${c}`,
    },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "18px",
            height: "18px",
            pointerEvents: "none",
            ...style,
          }}
        />
      ))}
    </>
  );
}

// ── Blinking cursor ────────────────────────────────────────────────────────
function Cursor({ active }) {
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setVis((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        marginLeft: "1px",
        opacity: vis ? 1 : 0.15,
        transition: "opacity 0.12s ease",
        color: active ? "#ffffff" : "rgba(255,255,255,0.5)",
        fontWeight: 300,
      }}
    >
      _
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PremiumTypeBox() {
  const wrapRef = useRef(null);
  const timers = useRef([]);

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | typing1 | typing2 | done
  const [visible, setVisible] = useState(false);

  // Clear all pending timers
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  // Full typing sequence
  const runSequence = useCallback(() => {
    clearTimers();
    setText1("");
    setText2("");
    setPhase("typing1");

    let i = 0;
    const typeL1 = () => {
      if (i <= LINE1.length) {
        setText1(LINE1.slice(0, i));
        i++;
        later(typeL1, SPEED_L1);
      } else {
        // Line 1 done → pause → start line 2
        later(() => {
          setPhase("typing2");
          let j = 0;
          const typeL2 = () => {
            if (j <= LINE2.length) {
              setText2(LINE2.slice(0, j));
              j++;
              later(typeL2, SPEED_L2);
            } else {
              setPhase("done");
            }
          };
          typeL2();
        }, PAUSE);
      }
    };
    typeL1();
  }, [clearTimers, later]);

  // IntersectionObserver — replay when re-entering viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          runSequence();
        } else {
          setVisible(false);
          clearTimers();
          setText1("");
          setText2("");
          setPhase("idle");
        }
      },
      { threshold: 0.3 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimers();
    };
  }, [runSequence, clearTimers]);

  const l1Done = phase === "typing2" || phase === "done";
  const l2Done = phase === "done";

  return (
    <div
      ref={wrapRef}
      className="ptb-wrap"
      style={{
        ...cornerStyle,
        minWidth: "260px",
        textAlign: "left",
      }}
    >
      <CornerBorder />

      {/* Line 1 */}
      {/* MOBILE FIX — ptb-line1 targets mobile font/wrap override */}
      <p
        className="ptb-line1"
        style={{
          fontFamily: '"MainFont", sans-serif',
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#ffffff",
          lineHeight: 1,
          whiteSpace: "nowrap",
          minHeight: "1em",
        }}
      >
        {text1}
        {!l1Done && phase === "typing1" && <Cursor active />}
      </p>

      {/* Line 2 — spacer always present to prevent layout shift */}
      {/* MOBILE FIX — ptb-line2 targets mobile font/wrap override */}
      <p
        className="ptb-line2"
        style={{
          fontFamily: '"MainFont", sans-serif',
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.52)",
          lineHeight: 1,
          whiteSpace: "nowrap",
          marginTop: "10px",
          minHeight: "1em",
          opacity: phase === "typing2" || phase === "done" ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {text2}
        {phase === "typing2" && <Cursor active />}
        {l2Done && <Cursor active={false} />}
      </p>
    </div>
  );
}
