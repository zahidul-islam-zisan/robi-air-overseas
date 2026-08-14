import React from "react"
import type { Language } from "../../types"
import { UI_TEXT } from "../../data/siteData"
import { HandshakeIcon } from "../ui/Icons"

interface B2BSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

export const B2BSection: React.FC<B2BSectionProps> = ({
  language,
  onNavigate,
}) => {
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 24px",
        overflow: "hidden",
        background: "#041B18",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(0,122,94,0.12) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, var(--color-brand-red, #DC2626), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, var(--color-brand-red, #DC2626), transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            marginBottom: 24,
            padding: "8px 16px",
            borderRadius: 100,
            color: "#6ee7b7",
            border: "1px solid rgba(0,122,94,0.3)",
            background: "rgba(5,59,54,0.5)",
          }}
        >
          <HandshakeIcon size={14} style={{ color: "#6ee7b7" }} />
          {UI_TEXT.b2b.badge[language]}
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 24,
            lineHeight: 1.25,
          }}
        >
          {UI_TEXT.b2b.headlineLine1[language]}
          <br />
          <span style={{ color: "#6ee7b7" }}>
            {UI_TEXT.b2b.headlineLine2[language]}
          </span>
        </h2>

        <p
          style={{
            color: "rgba(255, 255, 255, 0.72)",
            fontSize: 17,
            marginBottom: 40,
            maxWidth: 560,
            margin: "0 auto 40px",
            lineHeight: 1.8,
          }}
        >
          {UI_TEXT.b2b.desc[language]}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(220, 38, 38, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            {UI_TEXT.b2b.primaryCta[language]}
          </button>

          <button
            type="button"
            onClick={() => onNavigate("contact")}
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              background: "transparent",
              color: "#ffffff",
              border: "1.5px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
            }}
          >
            {UI_TEXT.b2b.secondaryCta[language]}
          </button>
        </div>
      </div>
    </section>
  )
}
