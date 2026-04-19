import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CornerBox({ children }) {
  const c = "rgba(255,255,255,0.22)";
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
    <div style={{ position: "relative", padding: "48px 56px" }}>
      {corners.map((s, i) => (
        <span
          key={i}
          style={{ position: "absolute", width: 22, height: 22, ...s }}
        />
      ))}
      {children}
    </div>
  );
}

const TEXT = `I design and build digital experiences where every pixel has a purpose. From cinematic interfaces to production-grade systems — I obsess over the details that make the difference.`;

export default function About() {
  const scrollRef = useRef(null);
  const innerRef = useRef(null);

  const splitText = useMemo(() => {
    return TEXT.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;

      const cleanWord = word.toLowerCase().replace(/[.,!?;:—"']/g, '');
      let customStyle = { display: "inline-block" };

      // Apply distinct fonts and gray shades to key words
      // We also scale them up by 1.25em so they align better with the MainFont baseline
      switch (cleanWord) {
        case "i":
          customStyle.fontFamily = '"Font3", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.3)";
          customStyle.fontSize = "1.25em";
          break;
        case "digital":
          customStyle.fontFamily = '"Font1", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.4)";
          customStyle.fontSize = "1.25em";
          break;
        case "experiences":
          customStyle.fontFamily = '"Font2", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.5)";
          customStyle.fontSize = "1.25em";
          break;
        case "pixel":
          customStyle.fontFamily = '"Font3", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.3)";
          customStyle.fontSize = "1.25em";
          break;
        case "cinematic":
          customStyle.fontFamily = '"Font4", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.6)";
          customStyle.fontSize = "1.25em";
          break;
        case "production-grade":
          customStyle.fontFamily = '"Font5", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.45)";
          customStyle.fontSize = "1.25em";
          break;
        case "obsess":
          customStyle.fontFamily = '"Font2", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.4)";
          customStyle.fontSize = "1.25em";
          break;
        case "details":
          customStyle.fontFamily = '"Font1", sans-serif';
          customStyle.color = "rgba(255, 255, 255, 0.5)";
          customStyle.fontSize = "1.25em";
          break;
      }

      return (
        <span className="word" key={index} style={customStyle}>
          {word}
        </span>
      );
    });
  }, []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Add a tiny buffer (like 5px) for safety, but make sure they really traversed it all
    const isAtTop = el.scrollTop <= 5;
    const isAtBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 5;

    window.__aboutAtTop = isAtTop;
    window.__aboutAtBottom = isAtBottom;
  };

  useEffect(() => {
    window.__aboutAtTop = true;
    window.__aboutAtBottom = false;

    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const ctx = gsap.context(() => {
      const el = innerRef.current;

      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: 3 },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller: scrollEl,
            start: "top top",
            // Wait slightly before the absolute bottom to finish rotation
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      const wordElements = el.querySelectorAll(".word");

      gsap.fromTo(
        wordElements,
        { opacity: 0, willChange: "opacity" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller: scrollEl,
            // Delay start slightly to let corner box be empty for a brief moment
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        wordElements,
        { filter: "blur(8px)" },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GRID */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* FADE MASK */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)",
          zIndex: 10,
        }}
      />

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        data-about-scroll="true"
        onScroll={onScroll}
        style={{
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div
          ref={innerRef}
          style={{
            minHeight: "350vh", // Extended slightly to give more scrolling room for the effect
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 6vw",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: "50%",
              transform: "translateY(-50%)",
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            <CornerBox>
              <p
                style={{
                  fontSize: "clamp(1.28rem, 2.8vw, 2.8rem)",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {splitText}
              </p>
            </CornerBox>
          </div>
        </div>
      </div>
    </div>
  );
}
