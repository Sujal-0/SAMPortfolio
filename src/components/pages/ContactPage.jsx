// pages/ContactPage.jsx — Terminal contact form with EmailJS

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Noise from "../shared/Noise";
import InverseOutlineButton from "../shared/InverseOutlineButton";

// ─── EmailJS config ───────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_z1be2gh";
const EMAILJS_TEMPLATE_ID = "template_6ymaw7i";
const EMAILJS_PUBLIC_KEY = "uX6wTpIIBHaXy2cQN";

// ─── Ruler ────────────────────────────────────────────────────────────────
const TICK_MAJOR = "rgba(255,255,255,0.45)";
const TICK_MID = "rgba(255,255,255,0.22)";
const TICK_MINOR = "rgba(255,255,255,0.12)";
const RAIL_C = "rgba(255,255,255,0.14)";
const MONO = '"Font3", monospace';

function buildTicks(n) {
  const t = [];
  for (let s = 0; s < n; s++) {
    t.push({ type: "major" });
    for (let m = 0; m < 9; m++) t.push({ type: m === 4 ? "mid" : "minor" });
  }
  t.push({ type: "major" });
  return t;
}

function HRail({ n = 10, down = true }) {
  const ticks = buildTicks(n);
  return (
    <div style={{ position: "relative", height: 24, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [down ? "top" : "bottom"]: 0,
          height: 1,
          background: RAIL_C,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [down ? "top" : "bottom"]: 1,
          height: 23,
          display: "flex",
          alignItems: down ? "flex-start" : "flex-end",
        }}
      >
        {ticks.map((t, i) => {
          const h = t.type === "major" ? 16 : t.type === "mid" ? 10 : 6;
          const bg =
            t.type === "major"
              ? TICK_MAJOR
              : t.type === "mid"
                ? TICK_MID
                : TICK_MINOR;
          const w = t.type === "major" ? 1.5 : 1;
          return (
            <div
              key={i}
              style={{
                flex: t.type === "major" ? "none" : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: down ? "flex-start" : "flex-end",
              }}
            >
              <div style={{ width: w, height: h, background: bg }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VRail({ n = 6, right = true }) {
  const ticks = buildTicks(n);
  return (
    <div style={{ position: "relative", width: 24, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [right ? "left" : "right"]: 0,
          width: 1,
          background: RAIL_C,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [right ? "left" : "right"]: 1,
          width: 23,
          display: "flex",
          flexDirection: "column",
          alignItems: right ? "flex-start" : "flex-end",
        }}
      >
        {ticks.map((t, i) => {
          const w = t.type === "major" ? 16 : t.type === "mid" ? 10 : 6;
          const bg =
            t.type === "major"
              ? TICK_MAJOR
              : t.type === "mid"
                ? TICK_MID
                : TICK_MINOR;
          const h = t.type === "major" ? 1.5 : 1;
          return (
            <div
              key={i}
              style={{
                flex: t.type === "major" ? "none" : 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: right ? "flex-start" : "flex-end",
              }}
            >
              <div style={{ width: w, height: h, background: bg }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Typewriter hook ──────────────────────────────────────────────────────
function useTypewriter(text, speed = 32, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDisplayed("");
    setDone(false);
    if (!text) return;

    const start = setTimeout(() => {
      let i = 0;
      const tick = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          const id = setTimeout(tick, speed);
          timers.current.push(id);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);
    timers.current.push(start);
    return () => timers.current.forEach(clearTimeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function Cursor({ color = "#4ade80" }) {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVis((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: "0.55em",
        height: "1.05em",
        background: vis ? color : "transparent",
        verticalAlign: "text-bottom",
        marginLeft: 2,
        transition: "background 0.08s",
      }}
    />
  );
}

function QuestionLine({
  text,
  speed = 28,
  delay = 0,
  onDone,
  accentWords = [],
}) {
  const { displayed, done } = useTypewriter(text, speed, delay);

  useEffect(() => {
    if (done && onDone) onDone();
  }, [done, onDone]);

  const renderText = (str) => {
    if (!accentWords.length)
      return <span style={{ color: "rgba(255,255,255,0.82)" }}>{str}</span>;
    const pattern = new RegExp(
      `(${accentWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
      "gi",
    );
    const parts = str.split(pattern);
    return parts.map((p, i) => {
      const isAccent = accentWords.some(
        (w) => w.toLowerCase() === p.toLowerCase(),
      );
      return (
        <span
          key={i}
          style={{ color: isAccent ? "#4ade80" : "rgba(255,255,255,0.82)" }}
        >
          {p}
        </span>
      );
    });
  };

  return (
    <div style={{ marginBottom: 6, lineHeight: 1.7 }}>
      {renderText(displayed)}
      {!done && <Cursor color="rgba(255,255,255,0.55)" />}
    </div>
  );
}

function PromptLine({ text, color = "#4ade80" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 6,
        opacity: 0.85,
      }}
    >
      <span style={{ color: "#4ade80", fontWeight: 700, flexShrink: 0 }}>
        →
      </span>
      <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>~$</span>
      <span style={{ color, wordBreak: "break-word" }}>{text}</span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        color: "rgba(255,255,255,0.12)",
        marginBottom: 10,
        fontSize: 11,
        userSelect: "none",
        letterSpacing: 0,
      }}
    >
      {"─".repeat(58)}
    </div>
  );
}

function TermHeader() {
  return (
    <div
      className="contact-page-terminal-header"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        flexShrink: 0,
      }}
    >
      {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
        <div
          key={i}
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: c,
            opacity: 0.85,
          }}
        />
      ))}
      <span
        className="contact-page-terminal-email"
        style={{
          flex: 1,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.32)",
        }}
      >
        sujalsingh2204@gmail.com
      </span>
    </div>
  );
}

async function sendEmail({ from_email, message }) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: { from_email, message, reply_to: from_email },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}`);
}

function GreetingLine({ onDone }) {
  const { displayed, done } = useTypewriter(
    "Hey there! I'm excited to connect 🔗",
    30,
    280,
  );
  useEffect(() => {
    if (done) onDone();
  }, [done]);
  return (
    <div style={{ color: "rgba(255,255,255,0.72)", marginBottom: 4 }}>
      {displayed}
      {!done && <Cursor color="rgba(255,255,255,0.45)" />}
    </div>
  );
}

export default function ContactPage({ onGoHome }) {
  const [restartKey, setRestartKey] = useState(0);
  const [step, setStep] = useState("greeting");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inputVal, setInput] = useState("");
  const [greetDone, setGreetDone] = useState(false);
  const [q1Done, setQ1Done] = useState(false);
  const [q2Done, setQ2Done] = useState(false);
  const [confirmDone, setConfirmDone] = useState(false);
  const inputRef = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    if (termRef.current)
      termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [step, greetDone, q1Done, q2Done, confirmDone, inputVal]);

  useEffect(() => {
    if (["enter_email", "enter_message"].includes(step)) {
      const id = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(id);
    }
  }, [step]);

  const onGreetDone = useCallback(() => {
    setGreetDone(true);
    setTimeout(() => setStep("ask_email"), 220);
  }, []);
  const onQ1Done = useCallback(() => {
    setQ1Done(true);
    setTimeout(() => setStep("enter_email"), 120);
  }, []);
  const onQ2Done = useCallback(() => {
    setQ2Done(true);
    setTimeout(() => setStep("enter_message"), 120);
  }, []);
  const onConfirmDone = useCallback(() => setConfirmDone(true), []);

  const submitEmail = useCallback(() => {
    const v = inputVal.trim();
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return;
    setEmail(v);
    setInput("");
    setStep("ask_message");
  }, [inputVal]);

  const submitMessage = useCallback(() => {
    const v = inputVal.trim();
    if (!v) return;
    setMessage(v);
    setInput("");
    setStep("confirm");
  }, [inputVal]);

  const handleSend = async () => {
    setStep("sending");
    try {
      await sendEmail({ from_email: email, message });
      setStep("done");
    } catch {
      setStep("error");
    }
  };

  const handleRestart = useCallback(() => {
    setStep("greeting");
    setEmail("");
    setMessage("");
    setInput("");
    setGreetDone(false);
    setQ1Done(false);
    setQ2Done(false);
    setConfirmDone(false);
    setRestartKey((k) => k + 1);
  }, []);

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (step === "enter_email") {
          e.preventDefault();
          submitEmail();
        }
      }
    },
    [step, submitEmail],
  );

  const handleMsgKey = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
      }
    },
    [submitMessage],
  );

  const progressSteps = [
    { label: "EMAIL", active: !["greeting", "ask_email"].includes(step) },
    {
      label: "MESSAGE",
      active: [
        "ask_message",
        "enter_message",
        "confirm",
        "sending",
        "done",
      ].includes(step),
    },
    { label: "SENT", active: step === "done" },
  ];

  return (
    <motion.div
      id="contact-page-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "100vh",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <HRail n={14} down={true} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <VRail n={8} right={true} />

        <div
          className="contact-page-main"
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT */}
          <motion.div
            className="contact-page-left"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: "36%",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 44px 0 36px",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="contact-page-label"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              &gt; CONTACT_FORM.sh
            </div>

            <div
              className="contact-page-title"
              style={{
                fontFamily: '"MainFont", sans-serif',
                fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#fff",
                marginBottom: 20,
              }}
            >
              GET IN
              <br />
              TOUCH.
            </div>

            <div
              className="contact-page-copy"
              style={{
                fontFamily: MONO,
                fontSize: 11.5,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
                marginBottom: 32,
              }}
            >
              Drop a message through
              <br />
              the terminal — I'll get
              <br />
              back within 24 hours.
            </div>

            <div
              className="contact-page-progress"
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {progressSteps.map(({ label, active }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 1,
                      background: active ? "#4ade80" : "rgba(255,255,255,0.12)",
                      transition: "background 0.4s",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      letterSpacing: "0.22em",
                      color: active ? "#4ade80" : "rgba(255,255,255,0.28)",
                      transition: "color 0.4s",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="contact-page-btn-wrap" style={{ marginTop: 40 }}>
              <InverseOutlineButton onClick={onGoHome}>
                Portfolio
              </InverseOutlineButton>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="contact-page-right"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "28px 36px",
            }}
          >
            <div
              className="contact-page-terminal"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                overflow: "hidden",
              }}
            >
              <TermHeader />

              <div
                ref={termRef}
                className="contact-page-terminal-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  padding: "18px 22px",
                  fontFamily: MONO,
                  fontSize: 13.5,
                  lineHeight: 1.75,
                }}
              >
                <GreetingLine key={restartKey} onDone={onGreetDone} />

                {greetDone && (
                  <>
                    <Divider />

                    {[
                      "ask_email",
                      "enter_email",
                      "ask_message",
                      "enter_message",
                      "confirm",
                      "sending",
                      "done",
                      "error",
                    ].includes(step) && (
                      <QuestionLine
                        key={`q1-${restartKey}`}
                        text="To start, could you share your email?"
                        accentWords={["email"]}
                        onDone={onQ1Done}
                      />
                    )}

                    {step === "enter_email" && q1Done && (
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <span style={{ color: "#4ade80", fontWeight: 700 }}>
                          →
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>
                          ~$
                        </span>
                        <span style={{ color: "#fff" }}>{inputVal}</span>
                        <Cursor color="#4ade80" />
                      </div>
                    )}

                    {email && step !== "enter_email" && (
                      <PromptLine text={email} color="#4ade80" />
                    )}

                    {email &&
                      [
                        "ask_message",
                        "enter_message",
                        "confirm",
                        "sending",
                        "done",
                        "error",
                      ].includes(step) && (
                        <>
                          <div style={{ marginTop: 10 }} />
                          <QuestionLine
                            key={`q2-${restartKey}`}
                            text="Great! Now share your message for Sujal."
                            accentWords={["message", "Sujal"]}
                            delay={60}
                            onDone={onQ2Done}
                          />

                          {step === "enter_message" && q2Done && (
                            <div style={{ marginBottom: 4 }}>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  alignItems: "flex-start",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#4ade80",
                                    fontWeight: 700,
                                    flexShrink: 0,
                                  }}
                                >
                                  →
                                </span>
                                <span
                                  style={{
                                    color: "rgba(255,255,255,0.3)",
                                    flexShrink: 0,
                                  }}
                                >
                                  ~$
                                </span>
                                <span
                                  style={{
                                    color: "#fff",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {inputVal}
                                </span>
                                <Cursor color="#4ade80" />
                              </div>
                            </div>
                          )}

                          {message && step !== "enter_message" && (
                            <PromptLine
                              text={message}
                              color="rgba(255,255,255,0.7)"
                            />
                          )}
                        </>
                      )}

                    {step === "confirm" && message && (
                      <>
                        <div style={{ marginTop: 10 }} />
                        <QuestionLine
                          key={`q3-${restartKey}`}
                          text="All set! Ready to send?"
                          accentWords={["send"]}
                          onDone={onConfirmDone}
                        />
                        {confirmDone && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{
                              marginTop: 14,
                              display: "flex",
                              alignItems: "center",
                              gap: 16,
                            }}
                          >
                            <button
                              onClick={handleSend}
                              style={{
                                fontFamily: MONO,
                                fontSize: 11,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#0a0a0a",
                                background: "#4ade80",
                                border: "none",
                                padding: "6px 18px",
                                cursor: "pointer",
                                transition: "opacity 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = "0.85")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = "1")
                              }
                            >
                              ✓ send
                            </button>
                            <button
                              onClick={handleRestart}
                              style={{
                                fontFamily: MONO,
                                fontSize: 10,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.28)",
                                background: "none",
                                border: "1px solid rgba(255,255,255,0.12)",
                                padding: "5px 12px",
                                cursor: "pointer",
                                transition: "color 0.2s, border-color 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color =
                                  "rgba(255,255,255,0.6)";
                                e.currentTarget.style.borderColor =
                                  "rgba(255,255,255,0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color =
                                  "rgba(255,255,255,0.28)";
                                e.currentTarget.style.borderColor =
                                  "rgba(255,255,255,0.12)";
                              }}
                            >
                              ↩ restart
                            </button>
                          </motion.div>
                        )}
                      </>
                    )}

                    {step === "sending" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          marginTop: 12,
                          color: "#f59e0b",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span>⟳ Sending</span>
                        <Cursor color="#f59e0b" />
                      </motion.div>
                    )}

                    {step === "done" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        style={{ marginTop: 12 }}
                      >
                        <div style={{ color: "#4ade80", marginBottom: 8 }}>
                          ✓ Message delivered. I'll get back to you soon!
                        </div>
                        <Divider />
                        <button
                          onClick={handleRestart}
                          style={{
                            fontFamily: MONO,
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            background: "none",
                            border: "1px solid rgba(255,255,255,0.14)",
                            padding: "5px 14px",
                            cursor: "pointer",
                            marginTop: 6,
                            transition: "color 0.2s, border-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(255,255,255,0.35)";
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.14)";
                          }}
                        >
                          ↩ send another
                        </button>
                      </motion.div>
                    )}

                    {step === "error" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: 12 }}
                      >
                        <div style={{ color: "#ef4444", marginBottom: 6 }}>
                          ✗ Something went wrong. Email me directly:
                        </div>
                        <a
                          href="mailto:sujalsingh2204@gmail.com"
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontFamily: MONO,
                            fontSize: 11,
                            textDecoration: "none",
                          }}
                        >
                          sujalsingh2204@gmail.com
                        </a>
                        <br />
                        <button
                          onClick={handleRestart}
                          style={{
                            fontFamily: MONO,
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            background: "none",
                            border: "1px solid rgba(255,255,255,0.14)",
                            padding: "5px 14px",
                            cursor: "pointer",
                            marginTop: 10,
                          }}
                        >
                          ↩ try again
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>

              <AnimatePresence>
                {["enter_email", "enter_message"].includes(step) && (
                  <motion.div
                    key={`input-${step}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="contact-page-inputbar"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      padding: "10px 22px",
                      display: "flex",
                      alignItems:
                        step === "enter_message" ? "flex-end" : "center",
                      gap: 10,
                      background: "rgba(255,255,255,0.015)",
                    }}
                  >
                    <span
                      style={{
                        color: "#4ade80",
                        fontFamily: MONO,
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.28)",
                        fontFamily: MONO,
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      ~$
                    </span>

                    {step === "enter_email" ? (
                      <input
                        ref={inputRef}
                        type="email"
                        value={inputVal}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="your@email.com"
                        className="contact-page-input"
                        style={{
                          flex: 1,
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          fontFamily: MONO,
                          fontSize: 13,
                          color: "#fff",
                          caretColor: "#4ade80",
                          letterSpacing: "0.06em",
                        }}
                      />
                    ) : (
                      <textarea
                        ref={inputRef}
                        value={inputVal}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleMsgKey}
                        placeholder="Your message... (Enter to send)"
                        rows={3}
                        className="contact-page-input"
                        style={{
                          flex: 1,
                          background: "transparent",
                          border: "none",
                          outline: "none",
                          resize: "none",
                          fontFamily: MONO,
                          fontSize: 13,
                          color: "#fff",
                          caretColor: "#4ade80",
                          letterSpacing: "0.05em",
                          lineHeight: 1.65,
                        }}
                      />
                    )}

                    <button
                      onClick={
                        step === "enter_email" ? submitEmail : submitMessage
                      }
                      style={{
                        fontFamily: MONO,
                        fontSize: 9.5,
                        letterSpacing: "0.2em",
                        color: "#4ade80",
                        background: "none",
                        border: "1px solid rgba(74,222,128,0.3)",
                        padding: "4px 10px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        flexShrink: 0,
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#4ade80")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(74,222,128,0.3)")
                      }
                    >
                      ↵
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <VRail n={8} right={false} />
      </div>
      <HRail n={14} down={false} />
    </motion.div>
  );
}
