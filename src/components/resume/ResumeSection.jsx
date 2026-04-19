// components/resume/ResumeSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InverseOutlineButton from "../shared/InverseOutlineButton";
import PremiumTypeBox from "../hero/PremiumTypeBox";
import ContactSection from "../contact/ContactSection";

gsap.registerPlugin(ScrollTrigger);

// ─── Vertical Ruler ────────────────────────────────────────────────────────
function VerticalRuler({ side = "right" }) {
  const ticks = [];
  for (let i = 0; i < 40; i++) {
    const isMajor = i % 10 === 0;
    const isMid = i % 5 === 0 && !isMajor;
    const width = isMajor ? 12 : isMid ? 8 : 4;
    ticks.push(
      <div
        key={i}
        style={{
          height: 1,
          width,
          background: isMajor
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.15)",
          marginBottom: 10,
        }}
      />,
    );
  }
  const isRight = side === "right";
  return (
    <div
      style={{
        position: "absolute",
        [isRight ? "right" : "left"]: 40,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: isRight ? "flex-end" : "flex-start",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "absolute",
          [isRight ? "right" : "left"]: 0,
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(255,255,255,0.1)",
        }}
      />
      {ticks}
    </div>
  );
}

// ─── Code block — top right ────────────────────────────────────────────────
function CodeBlock() {
  return (
    <div
      style={{
        fontFamily: '"Font3", monospace',
        fontSize: "clamp(1rem, 1.6vw, 1.5rem)", // larger than before
        lineHeight: 1.75,
        letterSpacing: "0.04em",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <div>
        <span style={{ color: "rgba(255,255,255,0.32)" }}>FROM IDEA TO </span>
        <span style={{ color: "rgba(255,255,255,0.72)" }}>{"(){"}</span>
      </div>
      <div style={{ paddingLeft: "2em" }}>
        <span style={{ color: "rgba(255,255,255,0.32)" }}>RETURN </span>
        <span style={{ color: "#ffffff", fontWeight: 700 }}>PRODUCT;</span>
      </div>
      <div style={{ paddingLeft: "0.5em", marginTop: "0.3em" }}>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>{"}"}</span>
        <span
          style={{
            display: "block",
            marginTop: "0.3em",
            fontSize: "0.7em",
            color: "#cc3333", // red — matches profile image shadow
            letterSpacing: "0.08em",
            fontStyle: "italic",
          }}
        >
          Sujal Singh — Full Stack Web Developer
        </span>
      </div>
    </div>
  );
}

export default function ResumeSection({ onGoResume }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const boxRef = useRef(null);
  const btnRef = useRef(null);
  const codeBlockRef = useRef(null);
  const contactRef = useRef(null);

  // ── Mouse parallax — image intentionally excluded from push ──────────────
  const handleMouseMove = (e) => {
    if (!imageRef.current || !textRef.current) return;
    const xMove = (e.clientX / window.innerWidth - 0.5) * 80;
    gsap.to(textRef.current, { x: xMove, ease: "power2.out", duration: 1 });
    // image gets tiny counter-move via CSS var — we do NOT call gsap.to on imageRef
    // to avoid GSAP overwriting the transform: translateZ(0) lock
    imageRef.current.style.setProperty("--mx", `${xMove * -0.1}px`);
  };
  const handleMouseLeave = () => {
    if (!textRef.current) return;
    gsap.to(textRef.current, { x: 0, ease: "power3.out", duration: 1.5 });
    if (imageRef.current) imageRef.current.style.setProperty("--mx", "0px");
  };

  // ── Scroll edge flags ────────────────────────────────────────────────────
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    window.__aboutAtTop = el.scrollTop <= 5;
    window.__aboutAtBottom =
      Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 5;
  };

  // ── Animations ───────────────────────────────────────────────────────────
  useEffect(() => {
    window.__aboutAtTop = true;
    window.__aboutAtBottom = false;

    const ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;

      // ── Entry ────────────────────────────────────────────────────────
      gsap.set(textRef.current, { xPercent: -50, opacity: 0, scale: 0.95 });
      // Image: ONLY opacity + clipPath animated — NO scale, NO y, NO x ever touches imageRef
      // This keeps bottom:0 / translateZ(0) intact through the entire lifecycle
      gsap.set(imageRef.current, {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set(btnRef.current, { opacity: 0 });
      gsap.set(codeBlockRef.current, { opacity: 0, y: -14 });

      const entryTl = gsap.timeline({ paused: true });
      entryTl
        .to(
          textRef.current,
          { opacity: 0.08, scale: 1, duration: 1.6, ease: "power4.inOut" },
          0.2,
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.out",
          },
          0.6,
        )
        .to(
          codeBlockRef.current,
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          0.9,
        )
        .to(
          btnRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          1.5,
        );

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entryTl.play();
            obs.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      if (containerRef.current) obs.observe(containerRef.current);

      // ── Background text parallax ─────────────────────────────────────
      if (scrollEl) {
        gsap.to(textRef.current, {
          yPercent: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      // ── Contact reveal + box/btn push-up (image is EXCLUDED) ─────────
      if (scrollEl && contactRef.current) {
        const contactEl = contactRef.current;

        // Contact starts hidden below
        gsap.set(contactEl, { y: 80, opacity: 0 });

        // Push distance: boxRef stays at ~72vh travel; btnRef gets +5% extra
        const PUSH_Y_BOX = -(window.innerHeight * 0.72);
        const PUSH_Y_BTN = -(window.innerHeight * 0.77); // 5% more than box

        ScrollTrigger.create({
          trigger: contactEl,
          scroller: scrollEl,
          start: "top 98%",
          end: "top 20%",
          scrub: 3.5, // slower = heavier, more cinematic
          onUpdate(self) {
            const p = self.progress;
            const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

            gsap.set(contactEl, { y: 80 * (1 - ease), opacity: ease });
            gsap.set(boxRef.current, { y: PUSH_Y_BOX * ease });
            gsap.set(btnRef.current, { y: PUSH_Y_BTN * ease });
          },
          onLeaveBack() {
            gsap.to(contactEl, {
              y: 80,
              opacity: 0,
              duration: 1.8,
              ease: "power4.inOut",
            });
            gsap.to(boxRef.current, {
              y: 0,
              duration: 1.8,
              ease: "power4.inOut",
            });
            gsap.to(btnRef.current, {
              y: 0,
              duration: 1.8,
              ease: "power4.inOut",
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Profile image — MOBILE FIX: resume-image-wrap shrinks it on mobile */}
      <div
        ref={imageRef}
        className="resume-image-wrap"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "50%",
          marginLeft: "-30vh",
          zIndex: 4,
          width: "60vh",
          height: "auto",
          transform: "translateZ(0) translateX(var(--mx, 0px))",
          willChange: "opacity, clip-path",
          transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: "none",
        }}
      >
        <img
          src="/images/profile.png"
          alt="Profile"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: "drop-shadow(0px 10px 30px rgba(180,20,20,0.15))",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -15,
            left: "20%",
            width: "60%",
            height: 30,
            background: "rgba(120,0,0,0.15)",
            filter: "blur(20px)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(10,10,10,0.8) 100%)",
        }}
      />

      {/* Scrollable inner */}
      <div
        ref={scrollRef}
        data-about-scroll="true"
        onScroll={onScroll}
        style={{ height: "100%", overflowY: "auto", scrollbarWidth: "none" }}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ minHeight: "300vh", position: "relative" }}
        >
          {/* ── Sticky stage ─────────────────────────────────────────── */}
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              perspective: 1200,
            }}
          >
            {/* Background typography — MOBILE FIX: resume-bg-text repositions on mobile */}
            <div
              ref={textRef}
              className="text text-white flex flex-col gap-[5px] absolute pointer-events-none resume-bg-text"
              style={{
                top: "18%",
                left: "50%",
                opacity: 0.08,
                zIndex: 2,
                transform: "rotate(-5deg)",
                whiteSpace: "nowrap",
                letterSpacing: "0.04em",
              }}
            >
              <h1
                className="text-[9.5vw] leading-none -ml-20 m-0 font-black"
                style={{ fontFamily: '"MainFont", sans-serif' }}
              >
                <span style={{ fontFamily: '"Font4", sans-serif' }}>F</span>
                <span
                  style={{
                    fontSize: "0.8em",
                    display: "inline-block",
                    transform: "translateY(-4%)",
                  }}
                >
                  ULL
                </span>
              </h1>
              <h1
                className="text-[9.5vw] leading-none ml-10 m-0 font-black"
                style={{ fontFamily: '"MainFont", sans-serif' }}
              >
                <span style={{ fontFamily: '"Font4", sans-serif' }}>S</span>
                <span
                  style={{
                    fontSize: "0.8em",
                    display: "inline-block",
                    transform: "translateY(-4%)",
                  }}
                >
                  TACK
                </span>
              </h1>
              <h1
                className="text-[9.5vw] leading-none -ml-10 m-0 font-black"
                style={{ fontFamily: '"MainFont", sans-serif' }}
              >
                <span style={{ fontFamily: '"Font4", sans-serif' }}>W</span>
                <span
                  style={{
                    fontSize: "0.8em",
                    display: "inline-block",
                    transform: "translateY(-4%)",
                  }}
                >
                  EB
                </span>
              </h1>
              <h1
                className="text-[9.5vw] leading-none ml-10 m-0 font-black"
                style={{ fontFamily: '"MainFont", sans-serif' }}
              >
                <span style={{ fontFamily: '"Font4", sans-serif' }}>D</span>
                <span
                  style={{
                    fontSize: "0.8em",
                    display: "inline-block",
                    transform: "translateY(-4%)",
                  }}
                >
                  EVELOPER
                </span>
              </h1>
            </div>

            {/* Top-right code block — MOBILE FIX: resume-code-block smaller on mobile */}
            <div
              ref={codeBlockRef}
              className="resume-code-block"
              style={{
                position: "absolute",
                top: "20%",
                right: "8%",
                zIndex: 4,
                textAlign: "left",
              }}
            >
              <CodeBlock />
            </div>

            {/* Left bottom — PremiumTypeBox — MOBILE FIX: resume-box-wrap */}
            <div
              ref={boxRef}
              className="resume-box-wrap"
              style={{
                position: "absolute",
                bottom: "12%",
                left: "6%",
                maxWidth: "380px",
                zIndex: 4,
                willChange: "transform",
              }}
            >
              <PremiumTypeBox
                line1="BRIDGING THE GAP BETWEEN DESIGN AND ENGINEERING"
                line2="EVERY INTERFACE CRAFTED WITH PRECISION."
              />
            </div>

            {/* Right bottom — Resume button — MOBILE FIX: resume-btn-wrap */}
            <div
              ref={btnRef}
              className="resume-btn-wrap"
              style={{
                position: "absolute",
                bottom: "12%",
                right: "10%",
                zIndex: 4,
                willChange: "transform",
              }}
            >
              <InverseOutlineButton
                onClick={() => {
                  if (window.__triggerBlink && onGoResume) {
                    window.__triggerBlink(onGoResume);
                  } else if (onGoResume) {
                    onGoResume();
                  }
                }}
              >
                Resume
              </InverseOutlineButton>
            </div>

            {/* Rulers */}
            {/* Rulers — MOBILE FIX: resume-ruler hidden on mobile */}
            <div className="resume-ruler">
              <VerticalRuler side="left" />
            </div>
            <div className="resume-ruler">
              <VerticalRuler side="right" />
            </div>
          </div>

          {/* Contact footer */}
          <div
            ref={contactRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 5,
            }}
          >
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
