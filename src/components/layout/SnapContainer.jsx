// components/layout/SnapContainer.jsx
// JS-controlled scroll container — no CSS scroll-snap.
// useSnapScroll owns the scroll entirely: one wheel/swipe = one panel.

import { useRef, useEffect } from "react";
import { useSnapScroll } from "../../hooks/useSnapScroll";

export default function SnapContainer({ children }) {
  const containerRef = useRef(null);
  useSnapScroll(containerRef);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isAboutScroller = (target) => {
      let node = target;
      while (node && node !== el) {
        if (node.dataset?.aboutScroll === "true") return true;
        node = node.parentElement;
      }
      return false;
    };

    const onTouchMove = (e) => {
      // Allow native scrolling only inside the About internal scroller
      if (isAboutScroller(e.target)) return;

      // Block browser pull-to-refresh / rubber-band on custom-scroll app
      e.preventDefault();
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="snap-container"
      style={{
        height: "100vh",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
        zIndex: 0,
        overscrollBehavior: "none",
        overscrollBehaviorY: "none",
        touchAction: "pan-y",
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
