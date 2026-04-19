// components/navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InverseOutlineButton from "../shared/InverseOutlineButton";

const SECTION_INDEX = { hero: 0, about: 1, work: 2, skills: 3, resume: 4 };

function navigateToSection(sectionId) {
  const idx = SECTION_INDEX[sectionId];
  if (idx === undefined || !window.__goToSection) return;
  if (window.__triggerBlink) {
    window.__triggerBlink(() => {
      window.__scrollState = "section";
      window.__goToSection(idx);
    });
  } else {
    window.__scrollState = "section";
    window.__goToSection(idx);
  }
}

function useNavHide() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setHidden((window.__currentSectionIdx ?? 0) > 0);
    }, 120);
    return () => clearInterval(id);
  }, []);
  return hidden;
}

// MOBILE FIX — inject a single <style> block for mobile-only overrides
const mobileStyle = `
  @media (max-width: 768px) {
    .nav-center-links { display: none !important; }
    .nav-header { padding: 16px 20px !important; }
    .nav-contact-btn { transform: scale(0.85); transform-origin: right center; }
  }
`;

export default function Navbar({ onGoContact }) {
  const hidden = useNavHide();

  const NavBtn = ({ label, sectionId }) => (
    <button
      onClick={() => navigateToSection(sectionId)}
      style={{
        position: "relative",
        fontFamily: '"MainFont", sans-serif',
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#71717a",
        background: "none",
        border: "none",
        padding: "0 0 3px 0",
        cursor: "pointer",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.querySelector(".ubar").style.width = "100%";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#71717a";
        e.currentTarget.querySelector(".ubar").style.width = "0%";
      }}
    >
      {label}
      <span
        className="ubar"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "0%",
          background: "#ffffff",
          transition: "width 0.3s ease",
          display: "block",
        }}
      />
    </button>
  );

  return (
    <>
      {/* MOBILE FIX — scoped styles, no desktop impact */}
      <style>{mobileStyle}</style>

      <motion.header
        className="nav-header"
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        {/* SAM logo */}
        <motion.div
          layoutId="sam-logo"
          onClick={() => navigateToSection("hero")}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
            gap: "3px",
            lineHeight: 1,
            cursor: "pointer",
            userSelect: "none",
          }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 100,
              damping: 24,
              mass: 0.9,
              delay: 0.18,
            },
          }}
        >
          {["S", "A", "M"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: '"MainFont", sans-serif',
                color: "#ffffff",
                display: "block",
                lineHeight: 1,
              }}
            >
              {l}
            </span>
          ))}
        </motion.div>

        {/* Center nav links — hidden on mobile via .nav-center-links */}
        <motion.nav
          className="nav-center-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <NavBtn label="Work" sectionId="work" />
          <NavBtn label="About" sectionId="about" />
        </motion.nav>

        {/* Contact Me — scaled down on mobile via .nav-contact-btn */}
        <motion.div
          className="nav-contact-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <InverseOutlineButton onClick={onGoContact}>
            Contact Me
          </InverseOutlineButton>
        </motion.div>
      </motion.header>
    </>
  );
}
