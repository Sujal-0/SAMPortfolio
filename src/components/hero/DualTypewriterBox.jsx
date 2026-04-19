// components/hero/DualTypewriterBox.jsx
// Two-line typewriter with expanding bordered container.
// Line 1 types fully → short pause → Line 2 types.
// Container width expands naturally with text (no fixed width).

import { useEffect, useState } from "react";

const LINE1 = "Frontend × Backend × Experience";
const LINE2 = "Crafted with precision. Built to perform.";
const CHAR_SPEED = 45; // ms per character
const LINE_PAUSE = 420; // ms pause between line 1 done and line 2 start

export default function DualTypewriterBox({ startDelay = 800 }) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showLine2, setShowLine2] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeouts = [];

    const schedule = (fn, delay) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timeouts.push(id);
      return id;
    };

    // Type line 1 character by character
    const typeLine1 = () => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i <= LINE1.length) {
          setLine1(LINE1.slice(0, i));
          i++;
          schedule(tick, CHAR_SPEED);
        } else {
          // Line 1 done — pause then start line 2
          schedule(() => {
            setShowLine2(true);
            typeLine2();
          }, LINE_PAUSE);
        }
      };
      schedule(tick, 0);
    };

    // Type line 2
    const typeLine2 = () => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i <= LINE2.length) {
          setLine2(LINE2.slice(0, i));
          i++;
          schedule(tick, CHAR_SPEED);
        }
      };
      tick();
    };

    // Wait for startDelay before beginning
    schedule(typeLine1, startDelay);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [startDelay]);

  return (
    <div
      style={{
        display: "inline-block",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "14px 22px",
        // Min width so the box doesn't collapse before typing begins
        minWidth: "220px",
      }}
    >
      {/* Line 1 */}
      <p
        style={{
          fontFamily: '"MainFont", sans-serif',
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#ffffff",
          textTransform: "uppercase",
          lineHeight: 1,
          whiteSpace: "nowrap",
          minHeight: "1em",
        }}
      >
        {line1}
        {/* Blinking cursor on active line */}
        {line1.length < LINE1.length && <Cursor />}
      </p>

      {/* Line 2 — only renders once line 1 is done */}
      {showLine2 && (
        <p
          style={{
            fontFamily: '"MainFont", sans-serif',
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
            lineHeight: 1,
            whiteSpace: "nowrap",
            marginTop: "8px",
            minHeight: "1em",
          }}
        >
          {line2}
          {line2.length < LINE2.length && <Cursor small />}
        </p>
      )}
    </div>
  );
}

// Blinking block cursor
function Cursor({ small = false }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        width: small ? "7px" : "9px",
        height: small ? "11px" : "14px",
        background: visible ? "rgba(255,255,255,0.8)" : "transparent",
        marginLeft: "2px",
        verticalAlign: "middle",
        transition: "background 0.1s",
      }}
    />
  );
}
