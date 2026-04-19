// components/layout/SnapContainer.jsx
// JS-controlled scroll container — no CSS scroll-snap.
// useSnapScroll owns the scroll entirely: one wheel = one panel.

import { useRef } from "react";
import { useSnapScroll } from "../../hooks/useSnapScroll";

export default function SnapContainer({ children }) {
  const containerRef = useRef(null);
  useSnapScroll(containerRef);

  return (
    <div
      ref={containerRef}
      id="snap-container"
      style={{
        height: "100vh",
        overflowY: "hidden", // JS controls scroll position via scrollTo
        overflowX: "hidden",
        position: "relative",
        zIndex: 0,
      }}
    >
      {children}
    </div>
  );
}

// Each page-level section.
// Children can add data-reveal to opt into staggered child animation.
export function SnapPanel({ id, children, style = {} }) {
  return (
    <section
      id={id}
      className="snap-panel"
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        className="panel-content"
        style={{
          height: "100%",
          width: "100%",
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </section>
  );
}
