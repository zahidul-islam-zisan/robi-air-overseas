import React from "react"
import type { Language } from "../../types"
import { OVERSEAS_FEATURES, UI_TEXT } from "../../data/siteData"
import { Badge } from "../ui/Badge"
import { CheckIcon, ArrowRightIcon } from "../ui/Icons"

interface OverseasSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

export const OverseasSection: React.FC<OverseasSectionProps> = ({
  language,
  onNavigate,
}) => {
  return (
    <section style={{ padding: "96px 24px", background: "#f8faf9" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: 20,
              background: "linear-gradient(135deg, #006A4E, #0f2018)",
              opacity: 0.12,
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              height: 480,
              background: "#041B18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/overseas_consultant.jpg"
              alt={UI_TEXT.overseas.title[language]}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,50,35,0.35) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <Badge>{UI_TEXT.overseas.badge[language]}</Badge>
          </div>

          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800,
              marginBottom: 20,
              lineHeight: 1.3,
              color: "#0f2018",
            }}
          >
            {UI_TEXT.overseas.title[language]}
          </h2>

          <p
            style={{
              color: "#5a7066",
              lineHeight: 1.9,
              marginBottom: 32,
              fontSize: 15,
            }}
          >
            {UI_TEXT.overseas.desc[language]}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {OVERSEAS_FEATURES.map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#0f2018",
                    border: "1px solid rgba(0,168,107,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon size={14} style={{ color: "#6ee7b7" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 4,
                      color: "#0f2018",
                    }}
                  >
                    {item.title[language]}
                  </div>
                  <div style={{ color: "#5a7066", fontSize: 14 }}>
                    {item.desc[language]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate("contact")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(220,38,38,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            {UI_TEXT.overseas.cta[language]} <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
