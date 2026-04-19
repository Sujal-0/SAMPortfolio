// hooks/useSnapScroll.js

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const SCROLL_STATE = {
  SECTION: "section",
  PROJECT_LOCKED: "project_locked",
  PROJECT_ACTIVE: "project_active",
  ABOUT_ACTIVE: "about_active",
};

window.__scrollState = SCROLL_STATE.SECTION;
window.__aboutTimeline = null;

const REVEAL_SELECTOR = "[data-reveal]";
const LOCK_RELEASE_MS = 1100;
const PROJECT_GATE_MS = 850;
const ABOUT_GATE_MS = 600;

export function useSnapScroll(containerRef) {
  const currentIdx = useRef(0);
  const isAnimating = useRef(false);
  const lockTimer = useRef(null);
  const gateTimer = useRef(null);
  const panelsRef = useRef([]);

  const touchStartY = useRef(0);
  const touchStartTarget = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = Array.from(container.querySelectorAll(".snap-panel"));
    if (!panels.length) return;
    panelsRef.current = panels;

    const getZones = (target) => {
      let el = target;
      let inVideoZone = false;
      let inAboutScroll = false;

      while (el && el !== container) {
        if (el.dataset?.videoZone === "true") {
          inVideoZone = true;
          break;
        }
        if (el.dataset?.aboutScroll === "true") {
          inAboutScroll = true;
          break;
        }
        el = el.parentElement;
      }

      return { inVideoZone, inAboutScroll };
    };

    panels.forEach((panel, i) => {
      const content = panel.querySelector(".panel-content");
      if (!content) return;
      gsap.set(content, {
        willChange: "transform, opacity",
        transformOrigin: "center center",
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 0.96,
        y: i === 0 ? 0 : 70,
      });
      const kids = content.querySelectorAll(REVEAL_SELECTOR);
      if (kids.length) {
        gsap.set(kids, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 });
      }
    });

    const goTo = (nextIdx) => {
      if (nextIdx < 0 || nextIdx >= panels.length) return;
      if (nextIdx === currentIdx.current) return;
      if (isAnimating.current) return;

      const prev = panels[currentIdx.current];
      const next = panels[nextIdx];
      const prevContent = prev?.querySelector(".panel-content");
      const nextContent = next?.querySelector(".panel-content");
      const goingDown = nextIdx > currentIdx.current;
      const isProject = next.id === "work";
      const isAbout = next.id === "about";

      isAnimating.current = true;

      if (isProject) {
        window.__scrollState = SCROLL_STATE.PROJECT_LOCKED;
      } else {
        window.__scrollState = SCROLL_STATE.SECTION;
      }

      if (prevContent) {
        gsap.to(prevContent, {
          opacity: 0.35,
          scale: 0.97,
          y: goingDown ? -60 : 60,
          duration: 0.5,
          ease: "power2.in",
        });
      }

      if (nextContent) {
        gsap.set(nextContent, {
          opacity: 0,
          scale: 0.96,
          y: goingDown ? 70 : -70,
        });
      }

      container.scrollTo({
        top: nextIdx * container.clientHeight,
        behavior: "instant",
      });

      currentIdx.current = nextIdx;
      window.__currentSectionIdx = nextIdx;

      setTimeout(() => {
        if (!nextContent) return;

        gsap.to(nextContent, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          onComplete() {
            gsap.fromTo(
              nextContent,
              { scale: 0.998 },
              { scale: 1, duration: 0.5, ease: "power3.out" }
            );
          },
        });

        const kids = nextContent.querySelectorAll(REVEAL_SELECTOR);
        if (kids.length) {
          gsap.set(kids, { opacity: 0, y: 35 });
          gsap.to(kids, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            delay: 0.3,
            ease: "power3.out",
          });
        }

        clearTimeout(lockTimer.current);
        lockTimer.current = setTimeout(() => {
          isAnimating.current = false;

          if (isProject) {
            // wait for project gate
          } else if (isAbout) {
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
    window.__currentSectionIdx = 0;

    const onWheel = (e) => {
      const { inVideoZone, inAboutScroll } = getZones(e.target);

      if (inVideoZone) return;

      if (inAboutScroll) {
        const atTop = window.__aboutAtTop;
        const atBottom = window.__aboutAtBottom;

        if (e.deltaY < 0 && atTop && !isAnimating.current) {
          e.preventDefault();
          goTo(currentIdx.current - 1);
        } else if (e.deltaY > 0 && atBottom && !isAnimating.current) {
          e.preventDefault();
          goTo(currentIdx.current + 1);
        }
        return;
      }

      e.preventDefault();

      if (window.__scrollState === SCROLL_STATE.PROJECT_LOCKED) return;
      if (window.__scrollState === SCROLL_STATE.ABOUT_ACTIVE) return;

      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 8) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      goTo(currentIdx.current + dir);
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTarget.current = e.target;
    };

    const onTouchEnd = (e) => {
      if (isAnimating.current) return;

      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;

      const { inVideoZone, inAboutScroll } = getZones(touchStartTarget.current);

      // Project video area handles its own touch logic
      if (inVideoZone) return;

      // About native scroll area: only leave section at edges
      if (inAboutScroll) {
        const atTop = window.__aboutAtTop;
        const atBottom = window.__aboutAtBottom;

        if (dy < 0 && atTop) {
          goTo(currentIdx.current - 1);
        } else if (dy > 0 && atBottom) {
          goTo(currentIdx.current + 1);
        }
        return;
      }

      // If on project section but OUTSIDE video area, section nav should work normally
      if (window.__scrollState === SCROLL_STATE.PROJECT_ACTIVE) {
        goTo(currentIdx.current + (dy > 0 ? 1 : -1));
        return;
      }

      if (window.__scrollState === SCROLL_STATE.PROJECT_LOCKED) return;
      if (window.__scrollState === SCROLL_STATE.ABOUT_ACTIVE) return;

      goTo(currentIdx.current + (dy > 0 ? 1 : -1));
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      clearTimeout(lockTimer.current);
      clearTimeout(gateTimer.current);
      window.__scrollState = SCROLL_STATE.SECTION;
      window.__goToSection = null;
      window.__aboutTimeline = null;
    };
  }, [containerRef]);
}