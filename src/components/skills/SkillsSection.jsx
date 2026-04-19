import React from "react";
import {
  SiC,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiTailwindcss,
  SiMui,
  SiJquery,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiAxios,
  SiSocketdotio,
  SiLottiefiles,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import LogoLoop from "./LogoLoop";

// ── Blinking cursor — identical to hero section ───────────────────────────
function Cursor() {
  const [vis, setVis] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => setVis((v) => !v), 520);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        marginLeft: "0.04em",
        opacity: vis ? 1 : 0.15,
        transition: "opacity 0.12s ease",
        color: "rgba(255,255,255,0.08)",
        fontWeight: 300,
        fontSize: "0.85em",
        verticalAlign: "middle",
      }}
    >
      _
    </span>
  );
}

// ── Typewriter title — fires on IntersectionObserver entry ────────────────
const TEXT = "SKILLS";
const SPEED = 80; // ms per character — slow enough to feel dramatic at large size

function TypewriterSkills() {
  const [display, setDisplay] = React.useState("");
  const [done, setDone] = React.useState(false);
  const wrapRef = React.useRef(null);
  const timers = React.useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const runType = React.useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDisplay("");
    setDone(false);

    let i = 0;
    const tick = () => {
      if (i <= TEXT.length) {
        setDisplay(TEXT.slice(0, i));
        i++;
        later(tick, SPEED);
      } else {
        setDone(true);
      }
    };
    // Small delay so the section entry GSAP animation plays first
    later(tick, 400);
  }, []);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runType();
        } else {
          // Reset so it replays on re-entry
          timers.current.forEach(clearTimeout);
          timers.current = [];
          setDisplay("");
          setDone(false);
        }
      },
      { threshold: 0.3 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, [runType]);

  return (
    <span ref={wrapRef} style={{ display: "inline-block" }}>
      {display}
      <Cursor />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const techLogos = [
  { node: <SiC />, title: "C" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <FaJava />, title: "Java" },
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss />, title: "CSS3" },
  { node: <SiBootstrap />, title: "Bootstrap" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiMui />, title: "Material UI" },
  { node: <SiJquery />, title: "jQuery" },
  { node: <SiReact />, title: "React" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express.js" },
  { node: <SiAxios />, title: "Axios" },
  { node: <SiSocketdotio />, title: "Socket.IO" },
  { node: <SiLottiefiles />, title: "LottieFiles" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiPostman />, title: "Postman" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        background: "#0a0a0a",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
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

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10vh 0",
        }}
      >
        {/* SKILLS — MainFont, typewriter, cursor */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: '"MainFont", sans-serif',
              fontSize: "clamp(3rem, 15vw, 15rem)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              lineHeight: 1,
              color: "rgba(255,255,255,0.08)",
              textTransform: "uppercase",
            }}
          >
            <TypewriterSkills />
          </h2>
        </div>

        {/* Horizontal ruler — full width, between title and logo loop */}
        <div
          style={{ width: "100%", padding: "0 40px", boxSizing: "border-box" }}
        >
          {(() => {
            const SEGMENTS = 12;
            const items = [];
            for (let s = 0; s < SEGMENTS; s++) {
              items.push({ type: "major", key: `m-${s}` });
              for (let t = 0; t < 9; t++) {
                items.push({
                  type: t === 4 ? "mid" : "minor",
                  key: `${s}-${t}`,
                });
              }
            }
            items.push({ type: "major", key: `m-${SEGMENTS}` });
            return (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  height: 24,
                }}
              >
                {items.map((item) => {
                  if (item.type === "major")
                    return (
                      <div key={item.key} style={{ flexShrink: 0 }}>
                        <div
                          style={{
                            width: 1.5,
                            height: 22,
                            background: "rgba(255,255,255,0.35)",
                          }}
                        />
                      </div>
                    );
                  return (
                    <div
                      key={item.key}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 1,
                          height: item.type === "mid" ? 14 : 8,
                          background: "rgba(255,255,255,0.15)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Logo loop */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: 0,
            width: "100%",
            zIndex: 10,
          }}
        >
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={80}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="#0a0a0a"
            ariaLabel="My Skills"
          />
        </div>
      </div>
    </section>
  );
}
