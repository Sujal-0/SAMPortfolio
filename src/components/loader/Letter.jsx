import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getIntervalFromProgress } from "./Loader";

const FONTS = [
  '"Font1", sans-serif',
  '"Font2", sans-serif',
  '"Font3", sans-serif',
  '"Font4", sans-serif',
  '"Font5", sans-serif',
];

const MAIN_FONT = '"MainFont", sans-serif';

const FONT_SCALE = {
  0: 1.0,
  1: 0.95,
  2: 1.0,
  3: 0.98,
  4: 1.0,
  main: 1.0,
};

const START_DELAY_PER_LETTER = 280;

export default function Letter({ letter, phaseOffset, settling, progressRef }) {
  const [fontIndex, setFontIndex] = useState(phaseOffset % FONTS.length);
  const [cycleKey, setCycleKey] = useState(0);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const scheduleNext = (currentIndex) => {
    const interval = getIntervalFromProgress(progressRef?.current ?? 0);

    intervalRef.current = setTimeout(() => {
      const next = (currentIndex + 1) % FONTS.length;
      setFontIndex(next);
      setCycleKey((k) => k + 1);
      if (!settling) scheduleNext(next);
    }, interval);
  };

  useEffect(() => {
    if (settling) {
      clearTimeout(intervalRef.current);
      clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      scheduleNext(fontIndex);
    }, phaseOffset * START_DELAY_PER_LETTER);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(intervalRef.current);
    };
  }, [settling]);

  const isMain = settling;
  const fontFamily = isMain ? MAIN_FONT : FONTS[fontIndex];
  const scaleKey = isMain ? "main" : fontIndex;
  const fontScale = FONT_SCALE[scaleKey] ?? 1.0;

  return (
    <div
      style={{
        width: "0.82em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        overflow: "visible",
      }}
    >
      <motion.span
        key={isMain ? "settled" : cycleKey}
        initial={{ opacity: 0.15, y: 4, scale: fontScale * 0.98 }}
        animate={{ opacity: 1, y: 0, scale: fontScale }}
        transition={{
          delay: isMain ? 0 : 0.07,
          duration: isMain ? 0.72 : 0.38,
          ease: [0.22, 0.6, 0.36, 1],
          opacity: {
            delay: isMain ? 0 : 0.07,
            duration: isMain ? 0.72 : 0.32,
            ease: "easeOut",
          },
          scale: {
            delay: isMain ? 0 : 0.07,
            duration: isMain ? 0.72 : 0.42,
            ease: [0.22, 0.6, 0.36, 1],
          },
        }}
        style={{
          fontFamily,
          display: "block",
          lineHeight: 1,
          fontSize: "1em",
          letterSpacing: "0.02em",
          color: "#ffffff",
          userSelect: "none",
          willChange: "transform, opacity",
        }}
      >
        {letter}
      </motion.span>
    </div>
  );
}
