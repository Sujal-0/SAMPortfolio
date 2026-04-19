// App.jsx
import { useState, useEffect } from "react";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";

import { useFontsLoaded } from "./hooks/useFontsLoaded";
import Loader from "./components/loader/Loader";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import ProjectsSection from "./components/projects/ProjectsSection";
import SkillsSection from "./components/skills/SkillsSection";
import ResumeSection from "./components/resume/ResumeSection";
import SnapContainer, { SnapPanel } from "./components/layout/SnapContainer";
import Noise from "./components/shared/Noise";
import ResumePage from "./components/pages/ResumePage";
import ContactPage from "./components/pages/ContactPage";

// ─── Eye-blink overlay ────────────────────────────────────────────────────
function BlinkOverlay() {
  const [phase, setPhase] = useState("open");

  useEffect(() => {
    window.__triggerBlink = (onPeak) => {
      setPhase("closing");
      setTimeout(() => {
        setPhase("closed");
        if (onPeak) onPeak();
      }, 380);
      setTimeout(() => setPhase("opening"), 500);
      setTimeout(() => setPhase("open"), 900);
    };
    return () => {
      window.__triggerBlink = null;
    };
  }, []);

  const visible =
    phase === "closing" || phase === "closed" || phase === "opening";
  return (
    <motion.div
      animate={{ scaleY: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{
        duration: phase === "closing" ? 0.38 : phase === "opening" ? 0.42 : 0,
        ease: phase === "closing" ? [0.87, 0, 0.13, 1] : [0.13, 0, 0.87, 1],
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        zIndex: 9999,
        transformOrigin: "center",
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Portfolio home ───────────────────────────────────────────────────────
// loadPhase is hoisted to App so it survives page switches.
// When returning from contact/resume, phase is already "done" → no loader.
function PortfolioHome({ onGoContact, onGoResume, loadPhase, setLoadPhase }) {
  const fontsReady = useFontsLoaded();

  const handleLoaderHandoff = () => {
    setLoadPhase("transitioning");
    setTimeout(() => setLoadPhase("done"), 2400);
  };

  return (
    <LayoutGroup>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Noise patternAlpha={12} patternRefreshInterval={3} />
      </div>

      {loadPhase !== "loading" && <Navbar onGoContact={onGoContact} />}

      <AnimatePresence>
        {loadPhase !== "done" && (
          <Loader
            key="loader"
            fontsReady={fontsReady}
            onComplete={handleLoaderHandoff}
          />
        )}
      </AnimatePresence>

      {loadPhase === "done" && (
        <SnapContainer>
          <SnapPanel id="hero" style={{ background: "#0a0a0a" }}>
            <Hero />
          </SnapPanel>
          <SnapPanel id="about" style={{ background: "#0a0a0a" }}>
            <About />
          </SnapPanel>
          <SnapPanel
            id="work"
            snapStop={false}
            style={{ background: "#0a0a0a" }}
          >
            <ProjectsSection />
          </SnapPanel>
          <SnapPanel id="skills" style={{ background: "#0a0a0a" }}>
            <SkillsSection />
          </SnapPanel>
          <SnapPanel id="resume" style={{ background: "#0a0a0a" }}>
            <ResumeSection onGoResume={onGoResume} />
          </SnapPanel>
        </SnapContainer>
      )}
    </LayoutGroup>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // "home"|"contact"|"resume"
  const [loadPhase, setLoadPhase] = useState("loading"); // hoisted — survives page swaps

  const goContact = () => {
    if (window.__triggerBlink) {
      window.__triggerBlink(() => setPage("contact"));
    } else {
      setPage("contact");
    }
  };

  const goHome = () => {
    if (window.__triggerBlink) {
      window.__triggerBlink(() => setPage("home"));
    } else {
      setPage("home");
    }
  };

  const goResume = () => {
    if (window.__triggerBlink) {
      window.__triggerBlink(() => setPage("resume"));
    } else {
      setPage("resume");
    }
  };

  return (
    <>
      <BlinkOverlay />

      {/* PortfolioHome is always mounted — just hidden behind other pages.
          This keeps SnapContainer, scroll state, and section positions alive. */}
      <div style={{ display: page === "home" ? "block" : "none" }}>
        <PortfolioHome
          onGoContact={goContact}
          onGoResume={goResume}
          loadPhase={loadPhase}
          setLoadPhase={setLoadPhase}
        />
      </div>

      {page === "contact" && <ContactPage onGoHome={goHome} />}
      {page === "resume" && <ResumePage onGoHome={goHome} />}
    </>
  );
}
