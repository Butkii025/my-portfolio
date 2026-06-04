"use client"

import { useState, useEffect, useRef } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [focused, setFocused] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn || !rippleRef.current) return
    const rect = btn.getBoundingClientRect()
    const r = rippleRef.current
    r.style.left = `${e.clientX - rect.left - 5}px`
    r.style.top = `${e.clientY - rect.top - 5}px`
    r.style.animation = "none"
    void r.offsetWidth
    r.style.animation = "ripple 0.6s ease-out forwards"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")

    const ACCESS_KEY = "b16dd9e8-f9c5-4d0e-adb3-6997acc3787f"

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Inquiry",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
    }
  }

  const fields = [
    { id: "name", type: "text", label: "Name", placeholder: "Your name", icon: UserIcon },
    { id: "email", type: "email", label: "Email", placeholder: "you@example.com", icon: MailIcon },
  ]

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.08; }
          50%       { opacity: 0.45; }
        }
        @keyframes particleDrift {
          0%, 100% { transform: translate(0, 0)                       scale(1);   opacity: 0.25; }
          33%      { transform: translate(var(--dx), var(--dy))        scale(1.2); opacity: 0.55; }
          66%      { transform: translate(calc(var(--dx) * -0.5), 0px) scale(0.9); opacity: 0.15; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0   rgba(99,102,241,0);   }
          50%       { box-shadow: 0 0 0 6px rgba(99,102,241,0.12); }
        }
        @keyframes ripple {
          0%   { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(4); opacity: 0;   }
        }
        @keyframes steam {
          0%   { transform: translateY(0)    scaleX(1);   opacity: 0;   }
          20%  {                                           opacity: 0.6; }
          100% { transform: translateY(-52px) scaleX(1.3); opacity: 0;   }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0;  }
        }
        .cf-field-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(139,130,200,0.15);
          border-radius: 12px;
          color: #e8e4ff;
          font-size: 14px;
          padding: 11px 14px 11px 38px;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          font-family: inherit;
        }
        .cf-field-input::placeholder { color: rgba(180,175,220,0.3); }
        .cf-field-input:focus {
          border-color: rgba(139,130,200,0.5);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cf-textarea {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(139,130,200,0.15);
          border-radius: 12px;
          color: #e8e4ff;
          font-size: 14px;
          padding: 12px 14px 12px 38px;
          outline: none;
          resize: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          font-family: inherit;
        }
        .cf-textarea::placeholder { color: rgba(180,175,220,0.3); }
        .cf-textarea:focus {
          border-color: rgba(139,130,200,0.5);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cf-send-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 11px 32px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, background 0.4s;
          letter-spacing: 0.2px;
          animation: pulseGlow 3s ease-in-out infinite;
          font-family: inherit;
        }
        .cf-send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }
        .cf-send-btn:active:not(:disabled) { transform: scale(0.97); }
        .cf-send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .cf-send-btn.success { background: linear-gradient(135deg, #059669, #10b981); animation: none; }
        .cf-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        .cf-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          width: 10px;
          height: 10px;
          pointer-events: none;
        }
        .cf-icon-wrap {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: color 0.3s;
          display: flex;
          align-items: center;
        }
        .cf-icon-wrap-ta {
          position: absolute;
          left: 12px;
          top: 14px;
          pointer-events: none;
          transition: color 0.3s;
          display: flex;
          align-items: center;
        }
      `}</style>

      <section
        style={{
          width: "100%",
          maxWidth: "560px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Outer card */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #0f0e17 0%, #1a1830 55%, #0d1b2e 100%)",
            borderRadius: "20px",
            padding: "2.5rem 2rem 2rem",
            overflow: "hidden",
            animation: mounted ? "fadeSlideUp 0.7s ease both" : undefined,
          }}
        >
          {/* Radial glows */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 60% at 90% 10%, rgba(99,102,241,0.08), transparent)," +
                "radial-gradient(ellipse 50% 50% at 10% 90%, rgba(167,139,250,0.06), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Stars */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 2,
                  height: 2,
                  background: "#fff",
                  borderRadius: "50%",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 4}s ease-in-out infinite`,
                  opacity: 0.1,
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          {[
            { l: "8%",  t: "30%", dx: "12px",  dy: "-16px", pd: "5s",   delay: "0s"   },
            { l: "88%", t: "20%", dx: "-10px", dy: "-14px", pd: "6s",   delay: "2s"   },
            { l: "92%", t: "72%", dx: "6px",   dy: "-8px",  pd: "8s",   delay: "0.5s" },
            { l: "50%", t: "8%",  dx: "10px",  dy: "-12px", pd: "5.5s", delay: "1.5s" },
            { l: "5%",  t: "68%", dx: "-8px",  dy: "-10px", pd: "7s",   delay: "1s"   },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(139,130,200,0.25)",
                left: p.l,
                top: p.t,
                // @ts-ignore
                "--dx": p.dx,
                "--dy": p.dy,
                animation: `particleDrift ${p.pd} ${p.delay} ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Form content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 500,
                color: "#e8e4ff",
                margin: "0 0 4px",
                letterSpacing: "-0.3px",
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(180,175,220,0.55)",
                margin: "0 0 1.75rem",
              }}
            >
              Let's plan a chai meeting ...
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                {fields.map(({ id, type, label, placeholder, icon: Icon }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "rgba(180,175,220,0.6)",
                        marginBottom: "5px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        id={id}
                        type={type}
                        required
                        value={formData[id as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                        onFocus={() => setFocused(id)}
                        onBlur={() => setFocused(null)}
                        placeholder={placeholder}
                        className="cf-field-input"
                      />
                      <span
                        className="cf-icon-wrap"
                        style={{ color: focused === id ? "rgba(167,139,250,0.8)" : "rgba(139,130,200,0.45)" }}
                      >
                        <Icon />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(180,175,220,0.6)",
                    marginBottom: "5px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Message
                </label>
                <div style={{ position: "relative" }}>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your message here..."
                    className="cf-textarea"
                  />
                  <span
                    className="cf-icon-wrap-ta"
                    style={{ color: focused === "message" ? "rgba(167,139,250,0.8)" : "rgba(139,130,200,0.45)" }}
                  >
                    <MessageIcon />
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                ref={btnRef}
                type="submit"
                disabled={status === "loading"}
                onMouseDown={handleRipple}
                className={`cf-send-btn${status === "success" ? " success" : ""}`}
              >
                <span className="cf-shimmer" />
                <span ref={rippleRef} className="cf-ripple" />
                <span style={{ position: "relative", display: "flex", alignItems: "center", gap: "6px" }}>
                  {status === "loading" && <SpinnerIcon />}
                  {status === "success" && <CheckIcon />}
                  {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
                </span>
              </button>

              {/* Status messages */}
              {status === "success" && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6ee7b7",
                    marginTop: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    animation: "fadeSlideUp 0.4s ease both",
                  }}
                >
                  <CheckCircleIcon />
                  Message sent! I'll get back to you over chai.
                </p>
              )}
              {status === "error" && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#fca5a5",
                    marginTop: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    animation: "fadeSlideUp 0.4s ease both",
                  }}
                >
                  <AlertIcon />
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}


function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" strokeDasharray="40" strokeDashoffset="0" style={{ animation: "checkDraw 0.5s ease forwards" }} />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}