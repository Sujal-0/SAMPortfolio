// hooks/useSnapScroll.js
//
// Scroll State Machine:
//  SECTION        — section-level scroll, drives goTo()
//  PROJECT_LOCKED — entering #work, both systems blocked
//  PROJECT_ACTIVE — #work settled, video scroll enabled
//  ABOUT_ACTIVE   — inside #about, wheel drives text reveal timeline
//
// About reveal:
//   A GSAP timeline on window.__aboutTimeline is controlled by
//   accumulated wheel delta. When timeline is complete (progress=1)
//   next scroll down triggers goTo(next). When at start (progress=0)
//   next scroll up triggers goTo(prev).

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const SCROLL_STATE = {
  SECTION:        "section",
  PROJECT_LOCKED: "project_locked",
  PROJECT_ACTIVE: "project_active",
  ABOUT_ACTIVE:   "about_active",
};

window.__scrollState   = SCROLL_STATE.SECTION;
window.__aboutTimeline = null; // set by About component on mount

const REVEAL_SELECTOR = "[data-reveal]";
const LOCK_RELEASE_MS = 1100;
const PROJECT_GATE_MS = 850;
const ABOUT_GATE_MS   = 600;

// How much accumulated delta = 1% of timeline progress
// Lower = more sensitive (fewer scrolls to reveal all text)
const ABOUT_SENSITIVITY = 18; // pixels of deltaY per 1% progress

export function useSnapScroll(containerRef) {
  const currentIdx   = useRef(0);
  const isAnimating  = useRef(false);
  const lockTimer    = useRef(null);
  const gateTimer    = useRef(null);
  const aboutDelta   = useRef(0); // accumulator for about reveal
  const panelsRef    = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = Array.from(container.querySelectorAll(".snap-panel"));
    if (!panels.length) return;
    panelsRef.current = panels;

    // ── Initial GSAP state ────────────────────────────────────────────
    panels.forEach((panel, i) => {
      const content = panel.querySelector(".panel-content");
      if (!content) return;
      gsap.set(content, {
        willChange: "transform, opacity",
        transformOrigin: "center center",
        opacity: i === 0 ? 1 : 0,
        scale:   i === 0 ? 1 : 0.96,
        y:       i === 0 ? 0 : 70,
      });
      const kids = content.querySelectorAll(REVEAL_SELECTOR);
      if (kids.length) {
        gsap.set(kids, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 });
      }
    });

    // ── Core transition ───────────────────────────────────────────────
    const goTo = (nextIdx) => {
      if (nextIdx < 0 || nextIdx >= panels.length) return;
      if (nextIdx === currentIdx.current) return;
      if (isAnimating.current) return;

      const prev        = panels[currentIdx.current];
      const next        = panels[nextIdx];
      const prevContent = prev?.querySelector(".panel-content");
      const nextContent = next?.querySelector(".panel-content");
      const goingDown   = nextIdx > currentIdx.current;
      const isProject   = next.id === "work";
      const isAbout     = next.id === "about";

      isAnimating.current  = true;
      aboutDelta.current   = 0;

      // Set state immediately for routing
      if (isProject) {
        window.__scrollState = SCROLL_STATE.PROJECT_LOCKED;
      } else if (isAbout) {
        window.__scrollState = SCROLL_STATE.SECTION; // locked during anim
      } else {
        window.__scrollState = SCROLL_STATE.SECTION;
      }

      // EXIT current
      if (prevContent) {
        gsap.to(prevContent, {
          opacity: 0.35, scale: 0.97,
          y: goingDown ? -60 : 60,
          duration: 0.5, ease: "power2.in",
        });
      }

      // Position next
      if (nextContent) {
        gsap.set(nextContent, {
          opacity: 0, scale: 0.96,
          y: goingDown ? 70 : -70,
        });
      }

      container.scrollTo({ top: nextIdx * container.clientHeight, behavior: "instant" });
      currentIdx.current = nextIdx;
      window.__currentSectionIdx = nextIdx; // Navbar reads this

      setTimeout(() => {
        if (!nextContent) return;

        gsap.to(nextContent, {
          opacity: 1, scale: 1, y: 0,
          duration: 1.1, ease: "power3.out",
          onComplete() {
            gsap.fromTo(nextContent,
              { scale: 0.998 },
              { scale: 1, duration: 0.5, ease: "power3.out" }
            );
          },
        });

        const kids = nextContent.querySelectorAll(REVEAL_SELECTOR);
        if (kids.length) {
          gsap.set(kids, { opacity: 0, y: 35 });
          gsap.to(kids, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, delay: 0.3, ease: "power3.out" });
        }

        clearTimeout(lockTimer.current);
        lockTimer.current = setTimeout(() => {
          isAnimating.current = false;

          if (isProject) {
            // state stays PROJECT_LOCKED until gate fires
          } else if (isAbout) {
            // Reset about timeline to 0 when entering from any direction
            if (window.__aboutTimeline) {
              window.__aboutTimeline.progress(goingDown ? 0 : 1);
            }
            aboutDelta.current = 0;
            clearTimeout(gateTimer.current);
            gateTimer.current = setTimeout(() => {
              window.__scrollState = SCROLL_STATE.ABOUT_ACTIVE;
            }, ABOUT_GATE_MS);
          } else {
            window.__scrollState = SCROLL_STATE.SECTION;
          }
        }, LOCK_RELEASE_MS);

        if (isProject) {
          clearTimeout(gateTimer.current);
          gateTimer.current = setTimeout(() => {
            window.__scrollState = SCROLL_STATE.PROJECT_ACTIVE;
          }, PROJECT_GATE_MS);
        }
      }, 150);
    };

    window.__goToSection = goTo;
    window.__currentSectionIdx = 0; // updated by goTo, read by Navbar

    // ── Wheel handler ─────────────────────────────────────────────────
    const onWheel = (e) => {
      // Video zone — project handler owns it
      let el = e.target;
      let inVideoZone     = false;
      let inAboutScroll   = false;

      while (el && el !== container) {
        if (el.dataset?.videoZone   === "true") { inVideoZone   = true; break; }
        if (el.dataset?.aboutScroll === "true") { inAboutScroll = true; break; }
        el = el.parentElement;
      }

      // Video zone: project system owns it — don't preventDefault
      if (inVideoZone) return;

      // About scroll zone: let the inner div scroll natively.
      // When at top/bottom the inner div won't scroll, so we check
      // those flags (set by About's onScroll) to decide section navigation.
      if (inAboutScroll) {
        const atTop    = window.__aboutAtTop;
        const atBottom = window.__aboutAtBottom;

        if (e.deltaY < 0 && atTop && !isAnimating.current) {
          e.preventDefault();
          goTo(currentIdx.current - 1);
        } else if (e.deltaY > 0 && atBottom && !isAnimating.current) {
          e.preventDefault();
          goTo(currentIdx.current + 1);
        }
        // Otherwise: don't preventDefault — inner div scrolls naturally
        return;
      }

      e.preventDefault();

      // ── Locked states ───────────────────────────────────────────────
      if (window.__scrollState === SCROLL_STATE.PROJECT_LOCKED) return;
      if (window.__scrollState === SCROLL_STATE.ABOUT_ACTIVE)   return;

      // ── Section navigation ──────────────────────────────────────────
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 8) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      goTo(currentIdx.current + dir);
    };

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
      if (window.__scrollState === SCROLL_STATE.PROJECT_ACTIVE) return;
      if (isAnimating.current) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      goTo(currentIdx.current + (dy > 0 ? 1 : -1));
    };

    container.addEventListener("wheel",      onWheel,      { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true  });
    container.addEventListener("touchend",   onTouchEnd,   { passive: true  });

    return () => {
      container.removeEventListener("wheel",      onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend",   onTouchEnd);
      clearTimeout(lockTimer.current);
      clearTimeout(gateTimer.current);
      window.__scrollState   = SCROLL_STATE.SECTION;
      window.__goToSection   = null;
      window.__aboutTimeline = null;
    };
  }, [containerRef]);
}