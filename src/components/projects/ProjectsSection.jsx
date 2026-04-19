// components/projects/ProjectsSection.jsx
import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import InverseOutlineButton from "../shared/InverseOutlineButton";

// ─── Data ──────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    label: "01",
    title: "Snipsy",
    desc: "Code snippet sharing platform with live preview and syntax highlighting.",
    tech: "React / Node / Postgres / Express / REST APIs",
    video: "/videos/snipsy-project-1.mp4",
    link: "https://snipsy.vercel.app/",
  },
  {
    id: 2,
    label: "02",
    title: "ReckonMe",
    desc: "An interactive guessing game where friends predict each other's answers with real-time interaction.",
    tech: "React / Node.js / Express / MongoDB / Framer Motion / Tailwind CSS / REST APIs / Socket.IO",
    video: "/videos/reckonme-project-2.mp4",
    link: null,
  },
  {
    id: 3,
    label: "03",
    title: "Loopin",
    desc: "A real-time chat application where users can create groups and channels for seamless communication. Built for fast, interactive conversations with a smooth and responsive experience.",
    tech: "React / Node.js / Zustand / Express / MongoDB / Tailwind CSS / REST APIs / Socket.IO",
    video: "/videos/loopin-project-3.mp4",
    link: "https://github.com/Sujal-0/Loopin-RealTime-ChatApp",
  },
  {
    id: 4,
    label: "04",
    title: "Warehouse AI",
    desc: "An AI-powered inventory and warehouse optimization system with real-time tracking and smart insights.",
    tech: "React / Node.js / AI / Express / MongoDB / Tailwind CSS / REST APIs",
    video: "/videos/warehouseai-project-4.mp4",
    link: "https://github.com/Sujal-0/WarehouseAI",
  },
  {
    id: 5,
    label: "05",
    title: "Ishii",
    desc: "AI-powered goal & habit tracking web app with interactive calendar, real-time progress marking, streak analytics, and animated UI/UX.",
    tech: "React / Node.js / Express / MongoDB / Framer Motion / Tailwind CSS / REST APIs",
    video: "/videos/ishii-project-5.mp4",
    link: null,
  },
];

const TOTAL = PROJECTS.length;
const EASE = [0.22, 1, 0.36, 1];
const LOCK_MS = 900; // outlasts trackpad inertia (~800ms worst case)
const touchStartY = useRef(0);
const touchStartX = useRef(0);

// ─── Shuffle Title ─────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ShuffleTitle({ text }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);

  useEffect(() => {
    let iteration = 0;
    const target = text.toUpperCase();
    cancelAnimationFrame(frameRef.current);

    const animate = () => {
      setDisplay(
        target
          .split("")
          .map((char, i) =>
            i < iteration
              ? char
              : char === " "
                ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (iteration < target.length + 4) {
        iteration += 0.5;
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [text]);

  return (
    <span
      style={{ fontFamily: '"MainFont", sans-serif', letterSpacing: "0.04em" }}
    >
      {display}
    </span>
  );
}

// ─── Typewriter Description ────────────────────────────────────────────────
function TypeDesc({ text, onDone }) {
  const [display, setDisplay] = useState("");
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDisplay("");

    const chars = text.split("");
    chars.forEach((_, i) => {
      const id = setTimeout(() => {
        setDisplay(text.slice(0, i + 1));
        if (i === chars.length - 1 && onDone) onDone();
      }, i * 28);
      timers.current.push(id);
    });

    return () => timers.current.forEach(clearTimeout);
  }, [text]);

  return (
    <span>
      {display}
      <BlinkCursor />
    </span>
  );
}

function BlinkCursor() {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVis((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        opacity: vis ? 0.7 : 0,
        transition: "opacity 0.12s",
        marginLeft: 1,
      }}
    >
      _
    </span>
  );
}

// ─── Corner Border Box ─────────────────────────────────────────────────────
function CornerBox({ children, style = {} }) {
  const c = "rgba(255,255,255,0.3)";
  const corners = [
    {
      top: 0,
      left: 0,
      borderTop: `1.5px solid ${c}`,
      borderLeft: `1.5px solid ${c}`,
    },
    {
      top: 0,
      right: 0,
      borderTop: `1.5px solid ${c}`,
      borderRight: `1.5px solid ${c}`,
    },
    {
      bottom: 0,
      left: 0,
      borderBottom: `1.5px solid ${c}`,
      borderLeft: `1.5px solid ${c}`,
    },
    {
      bottom: 0,
      right: 0,
      borderBottom: `1.5px solid ${c}`,
      borderRight: `1.5px solid ${c}`,
    },
  ];
  return (
    <div style={{ position: "relative", padding: "14px 20px", ...style }}>
      {corners.map((s, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            pointerEvents: "none",
            ...s,
          }}
        />
      ))}
      {children}
    </div>
  );
}

// ─── Ruler ─────────────────────────────────────────────────────────────────
function Ruler({ active }) {
  // Between each pair of labels: 1 mid tick + 2 small ticks each side
  const segments = TOTAL - 1;
  const items = [];

  for (let s = 0; s < segments; s++) {
    // Label
    items.push({ type: "label", idx: s });
    // 4 minor ticks then 1 mid tick then 4 minor ticks
    for (let m = 0; m < 9; m++) {
      const isMid = m === 4;
      items.push({ type: isMid ? "mid" : "minor", idx: s + (m + 1) / 10 });
    }
  }
  items.push({ type: "label", idx: segments });

  return (
    <div style={{ width: "100%", maxWidth: "78vw", margin: "0 auto" }}>
      {/* Ticks */}
      <div style={{ display: "flex", alignItems: "flex-end", height: 24 }}>
        {items.map((item, i) => {
          if (item.type === "label") {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "none",
                }}
              >
                <div
                  style={{
                    width: 1.5,
                    height: 22,
                    background:
                      Math.round(item.idx) === active
                        ? "#fff"
                        : "rgba(255,255,255,0.4)",
                    transition: "background 0.3s",
                  }}
                />
              </div>
            );
          }
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: item.type === "mid" ? 14 : 8,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        {PROJECTS.map((p, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"MainFont", sans-serif',
              fontSize: 10,
              letterSpacing: "0.15em",
              color: i === active ? "#fff" : "rgba(255,255,255,0.28)",
              fontWeight: i === active ? 700 : 400,
              transition: "color 0.3s, font-weight 0.3s",
            }}
          >
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Video Card ─────────────────────────────────────────────────────────────
function VideoCard({ project, dir }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const containerRef = useRef(null);

  // ── Cinematic entry when project changes ──────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video && !frame) return;

    const target = video || frame;
    gsap.killTweensOf(target);
    gsap.fromTo(
      target,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power4.out",
        delay: 0.05,
      },
    );
  }, [project.id]);

  // ── Hover: subtle scale + glow ────────────────────────────────────────
  const onMouseEnter = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        scale: 1.025,
        boxShadow:
          "0 30px 80px rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.1)",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };
  const onMouseLeave = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        scale: 1,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleTouchProjectMove = useCallback((direction) => {
    const cur = activeRef.current;
    const next = cur + direction;

    if (_isCooling) return;

    // swipe up on last project -> next section
    if (direction === 1 && cur === TOTAL - 1) {
      triggerProject(() => {
        if (window.__goToSection) {
          window.__scrollState = "section";
          window.__goToSection(3); // skills panel
        }
      });
      return;
    }

    // swipe down on first project does nothing inside video zone
    if (next < 0 || next >= TOTAL) return;

    triggerProject(() => {
      setDir(direction);
      setActive(next);
    });
  }, []);

  return (
    <motion.div
      key={project.id}
      initial={{
        opacity: 0,
        scaleY: 0.94,
        rotateX: dir > 0 ? 6 : -6,
        y: dir > 0 ? 50 : -50,
      }}
      animate={{ opacity: 1, scaleY: 1, rotateX: 0, y: 0 }}
      exit={{
        opacity: 0,
        scaleY: 0.94,
        rotateX: dir > 0 ? -6 : 6,
        y: dir > 0 ? -50 : 50,
      }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // 10vh top + bottom breathing room
        padding: "10vh 0",
      }}
    >
      {/* Grid — always behind, always visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette — top + bottom fade, above grid and video, no pointer events */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "12vh",
            background: "linear-gradient(to bottom, #0a0a0a, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "12vh",
            background: "linear-gradient(to top, #0a0a0a, transparent)",
          }}
        />
      </div>

      {/* Floating video frame */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {project.video ? (
          // Glass frame with depth + glow
          <div
            ref={frameRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              transformOrigin: "center center",
              willChange: "transform, box-shadow",
            }}
          >
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                display: "block",
                maxHeight: "70vh",
                maxWidth: "78vw",
                objectFit: "contain",
                pointerEvents: "none", // scroll passes through
                userSelect: "none",
              }}
            />
          </div>
        ) : (
          // Placeholder for projects without video
          <div
            ref={frameRef}
            style={{
              width: "78vw",
              height: "55vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <p
              style={{
                fontFamily: '"MainFont", sans-serif',
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.12)",
              }}
            >
              {project.label} — {project.title}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Navbar hide/show on scroll ────────────────────────────────────────────
export function useNavbarScroll() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

// ─── Open project link with eye-blink ─────────────────────────────────────
function openProject(link) {
  if (!link) return;
  if (window.__triggerBlink) {
    window.__triggerBlink(() => {
      window.open(link, "_blank", "noopener,noreferrer");
    });
  } else {
    window.open(link, "_blank", "noopener,noreferrer");
  }
}

// ─── Delta accumulation scroll system ────────────────────────────────────
// Primary control: accumulate deltaY until threshold → fire exactly once.
// Secondary safety: short cooldown after trigger ignores momentum tail.
// This replaces time-based LOCK_MS entirely.

const THRESHOLD = 100; // accumulated delta needed to trigger one step
const COOLDOWN_MS = 380; // post-trigger ignore window (kills momentum tail)

let _delta = 0; // running accumulator
let _isCooling = false; // true during post-trigger cooldown
let _coolTimer = null;

const resetDelta = () => {
  _delta = 0;
};

const triggerProject = (navigate) => {
  // navigate is a fn(direction) that does the actual state change
  _isCooling = true;
  _delta = 0;
  clearTimeout(_coolTimer);
  _coolTimer = setTimeout(() => {
    _isCooling = false;
  }, COOLDOWN_MS);
  navigate();
};

// ─── Main ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const activeRef = useRef(0); // mirror of active, always current
  const dragStart = useRef(0);
  const videoRef = useRef(null);

  // Keep activeRef in sync with state
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const project = PROJECTS[active];

  // go() reads activeRef so it's always current even in old closures
  const go = useCallback((d) => {
    if (!acquireProjectLock()) return;
    const cur = activeRef.current;

    if (d === -1 && cur === 0) {
      if (window.__goToSection) {
        window.__scrollState = "section";
        window.__goToSection(0);
      }
      _projectLocked = false; // release immediately — we're leaving
      return;
    }

    if (d === 1 && cur === TOTAL - 1) {
      if (window.__goToSection) {
        window.__scrollState = "section";
        window.__goToSection(2);
      }
      _projectLocked = false;
      return;
    }

    const next = cur + d;
    if (next < 0 || next >= TOTAL) {
      _projectLocked = false;
      return;
    }
    setDir(d);
    setActive(next);
  }, []); // stable — reads refs, no deps needed

  // ── Pointer boundary tracking ─────────────────────────────────────────
  const isInsideVideo = useRef(false);

  // ── Single global wheel handler with delta accumulation ───────────────
  useEffect(() => {
    const handleWheel = (e) => {
      // Strict isolation: only run when cursor is inside video zone
      if (!isInsideVideo.current) return;

      // Take full ownership — prevent section scroll and page scroll
      e.preventDefault();
      e.stopPropagation();

      // During cooldown: eat the event silently (kills momentum tail)
      if (_isCooling) return;

      // Accumulate delta — only trigger when threshold crossed
      _delta += e.deltaY;

      if (Math.abs(_delta) < THRESHOLD) return;

      // Threshold crossed → determine direction, reset, trigger
      const d = _delta > 0 ? 1 : -1;
      const cur = activeRef.current;
      const next = cur + d;

      // Scroll down past last project → go to next section (skills = panel 3)
      if (d === 1 && cur === TOTAL - 1) {
        triggerProject(() => {
          resetDelta();
          if (window.__goToSection) {
            window.__scrollState = "section";
            window.__goToSection(3); // skills section = panel index 3
          }
        });
        return;
      }

      // Clamp at left edge — section navigation handled outside video zone
      if (next < 0 || next >= TOTAL) {
        resetDelta();
        return;
      }

      triggerProject(() => {
        setDir(d);
        setActive(next);
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(_coolTimer);
      _delta = 0;
      _isCooling = false;
    };
  }, []); // stable — reads only module-level vars and refs

  // Register escape handler so section-level scroll-up outside video works
  useEffect(() => {
    window.__onProjectEscape = (direction) => {
      if (!isInsideVideo.current) {
        if (direction === "up") {
          window.__scrollState = "section";
          window.__goToSection?.(0);
        }
        if (direction === "down") {
          window.__scrollState = "section";
          window.__goToSection?.(2);
        }
      }
    };
    return () => {
      window.__onProjectEscape = null;
    };
  }, []);

  // Drag support
  const onDragStart = (_, info) => {
    dragStart.current = info.point.x;
  };
  const onDragEnd = (_, info) => {
    const d = info.point.x - dragStart.current;
    if (Math.abs(d) > 60) go(d < 0 ? 1 : -1);
  };

  return (
    <section
      id="work"
      style={{
        background: "#0a0a0a",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 100,
        paddingBottom: 32,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 0,
        }}
      >
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        {/* MOBILE FIX — proj-title-row class for mobile overrides */}
        <div
          className="proj-title-row"
          style={{ marginBottom: 20 }}
          data-reveal
        >
          <motion.h2
            style={{
              margin: 0,
              fontFamily: '"MainFont", sans-serif',
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: EASE }}
                style={{ display: "block" }}
              >
                <ShuffleTitle text={project.title} />
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          <p
            style={{
              margin: "8px 0 0",
              fontFamily: '"MainFont", sans-serif',
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {project.tech}
          </p>
        </div>

        {/* ── DESCRIPTION + CTA ─────────────────────────────────────── */}
        {/* MOBILE FIX — proj-desc-row class for mobile stacking */}
        <div
          className="proj-desc-row"
          data-reveal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 18,
          }}
        >
          <CornerBox style={{ flex: 1, maxWidth: 560 }}>
            <p
              style={{
                fontFamily: '"MainFont", sans-serif',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                minHeight: "1.4em",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "block" }}
                >
                  <TypeDesc text={project.desc} />
                </motion.span>
              </AnimatePresence>
            </p>
          </CornerBox>

          <InverseOutlineButton
            onClick={project.link ? () => openProject(project.link) : undefined}
            style={
              project.link
                ? undefined
                : { opacity: 0.35, cursor: "not-allowed" }
            }
          >
            View Project
          </InverseOutlineButton>
        </div>

        {/* ── VIDEO ─────────────────────────────────────────────────── */}
        <motion.div
          ref={videoRef}
          data-video-zone="true"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.04}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchStartY.current = t.clientY;
            touchStartX.current = t.clientX;
            _delta = 0;
          }}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            const dy = touchStartY.current - t.clientY;
            const dx = touchStartX.current - t.clientX;

            // only vertical swipe should change project on mobile
            if (Math.abs(dy) < 40) return;
            if (Math.abs(dy) < Math.abs(dx)) return;

            handleTouchProjectMove(dy > 0 ? 1 : -1);
          }}
          onMouseEnter={() => {
            isInsideVideo.current = true;
            _delta = 0;
          }}
          onMouseLeave={() => {
            isInsideVideo.current = false;
            _delta = 0;
          }}
          style={{
            flex: 1,
            minHeight: 340,
            maxHeight: 500,
            position: "relative",
            overflow: "hidden",
            cursor: "grab",
            perspective: "1200px",
            userSelect: "none",
            // GPU compositing — prevents jitter / layout shift during animations
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
          whileDrag={{ cursor: "grabbing" }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <VideoCard key={active} project={project} dir={dir} />
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={() => go(-1)}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              width: 36,
              height: 36,
              cursor: "pointer",
              fontFamily: '"MainFont", sans-serif',
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
          >
            ←
          </button>

          <button
            onClick={() => go(1)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              width: 36,
              height: 36,
              cursor: "pointer",
              fontFamily: '"MainFont", sans-serif',
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
          >
            →
          </button>

          {/* Drag hint */}
          <p
            style={{
              position: "absolute",
              bottom: 14,
              right: 18,
              fontFamily: '"MainFont", sans-serif',
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.15)",
              pointerEvents: "none",
              margin: 0,
            }}
          >
            Scroll / Drag
          </p>
        </motion.div>

        {/* ── RULER ─────────────────────────────────────────────────── */}
        {/* MOBILE FIX — proj-ruler-row for mobile margin */}
        <div className="proj-ruler-row" style={{ marginTop: 20 }} data-reveal>
          <Ruler active={active} />
        </div>
      </div>
    </section>
  );
}
