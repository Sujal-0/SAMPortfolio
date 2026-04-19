// hooks/useFontsLoaded.js
// Returns true once all 5 custom fonts are loaded (or failed gracefully).
// The loader will NOT start its counter until this resolves.

import { useState, useEffect } from "react";

const FONT_FAMILIES = ["MainFont", "Font1", "Font2", "Font3", "Font4", "Font5"];

export function useFontsLoaded() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fallback: FontFace API not available
    if (!document?.fonts?.ready) {
      setLoaded(true);
      return;
    }

    const checks = FONT_FAMILIES.map((family) =>
      document.fonts.load(`1em "${family}"`).catch(() => null)
    );

    Promise.all([document.fonts.ready, ...checks]).then(() => {
      setLoaded(true);
    });
  }, []);

  return loaded;
}