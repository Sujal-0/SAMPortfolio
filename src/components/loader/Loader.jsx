import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Letter from "./Letter";

const DURATION_MS = 4200;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function getIntervalFromProgress(progress) {
  if (progress < 40) {
    const t = progress / 40;
    return 1100 + t * 200;
  } else if (progress < 80) {
    return 1300;
  } else {
    const t = (progress - 80) / 20;
    return 1300 + t * 1500;
  }
}

export default function Loader({ fontsReady, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [settling, setSettling] = useState(false);
  const [bgGone, setBgGone] = useState(false);
  const [samGone, setSamGone] = useState(false);

  const progressRef = useRef(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!fontsReady) return;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const raw = Math.min((ts - startRef.current) / DURATION_MS, 1);
      const eased = easeInOutCubic(raw) * 100;

      progressRef.current = eased;
      setProgress(eased);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = 100;
        setProgress(100);

        setSettling(true);

        setTimeout(() => onComplete(), 900);
        setTimeout(() => setBgGone(true), 1100);
        setTimeout(() => setSamGone(true), 2200);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [fontsReady, onComplete]);

  return (
    <>
      {/* BACKGROUND LAYER */}
      <AnimatePresence>
        {!bgGone && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "#0a0a0a",
              overflow: "hidden",
              pointerEvents: "none",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                // MOBILE FIX
                background:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, rgba(0,0,0,0.92) 100%)",
              }}
            />

            {/* Counter */}
            <motion.div
              className="font-main tabular-nums"
              style={{
                position: "absolute",

                // MOBILE FIX
                bottom: "20px",
                right: "20px",

                // MOBILE FIX
                fontSize: "clamp(20px, 6vw, 36px)",

                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: settling ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {String(Math.round(progress)).padStart(3, "0")}
              <span style={{ color: "rgba(255,255,255,0.2)" }}>%</span>
            </motion.div>

            {/* Bottom-left label */}
            <motion.p
              className="font-main"
              style={{
                position: "absolute",

                // MOBILE FIX
                bottom: "20px",
                left: "20px",

                // MOBILE FIX
                fontSize: "clamp(8px, 2.5vw, 10px)",

                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
                lineHeight: 1,
                margin: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: settling ? 0 : 1 }}
              transition={{ duration: 0.4, delay: settling ? 0 : 0.5 }}
            >
              Portfolio — Loading
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAM LAYER */}
      <AnimatePresence>
        {!samGone && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              // MOBILE FIX
              padding: "0 16px",

              pointerEvents: "none",
            }}
          >
            <motion.div
              layoutId="sam-logo"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",

                // MOBILE FIX (key fix)
                fontSize: "clamp(4.5rem, 14vw, 7.7rem)",

                lineHeight: 1,
              }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 100,
                  damping: 24,
                  mass: 0.9,
                  delay: 0.18,
                },
              }}
            >
              {["S", "A", "M"].map((letter, i) => (
                <Letter
                  key={letter}
                  letter={letter}
                  phaseOffset={i}
                  settling={settling}
                  progressRef={progressRef}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
