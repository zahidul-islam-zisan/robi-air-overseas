import React from "react"
import type { Language } from "../../types"
import { UI_TEXT } from "../../data/siteData"
import { CheckIcon, ArrowRightIcon, RobiAirLogo, PhoneIcon } from "../ui/Icons"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"

interface AboutSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  onNavigate,
}) => {
  return (
    <section id="about" style={{ padding: "96px 24px", background: "#ffffff" }}>
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
        {/* Image Frame */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: 20,
              background: "linear-gradient(135deg, #053B36, #DC2626)",
              opacity: 0.15,
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              height: 420,
              background: "#e2ebe6",
            }}
          >
            <img
              src="/images/about/about-office.jpg"
              alt={UI_TEXT.about.title[language]}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(4,27,24,0.5) 0%, transparent 60%)",
              }}
            />
          </div>
          <div className="absolute -bottom-8 right-0 sm:-right-11 rounded-2xl p-4 sm:p-5 bg-[#041B18] border border-[rgba(0,122,94,0.35)] shadow-2xl z-10">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <RobiAirLogo size={44} />
              <div>
                <div
                  style={{ color: "#ffffff", fontSize: 13, fontWeight: 700 }}
                >
                  {UI_TEXT.about.cardBadgeTitle[language]}
                </div>
                <div style={{ fontSize: 11, color: "#6ee7b7" }}>
                  {UI_TEXT.about.cardBadgeSub[language]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <Badge>{UI_TEXT.about.badge[language]}</Badge>
          </div>

          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 800,
              marginBottom: 20,
              lineHeight: 1.3,
              color: "#041B18",
            }}
          >
            {UI_TEXT.about.title[language]}
          </h2>

          <p
            style={{
              color: "#4a635d",
              lineHeight: 1.9,
              marginBottom: 32,
              fontSize: 15,
            }}
          >
            {UI_TEXT.about.desc[language]}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {UI_TEXT.about.trustPoints.map((point, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "rgba(5,59,54,0.10)",
                    border: "1px solid rgba(5,59,54,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon
                    size={13}
                    style={{ color: "var(--color-brand, #053B36)" }}
                  />
                </div>
                <span
                  style={{ color: "#122b27", fontWeight: 600, fontSize: 15 }}
                >
                  {point[language]}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <a
              href="tel:01825679099"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white border-none cursor-pointer transition-all hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #041B18 0%, #053B36 100%)",
                boxShadow: "0 4px 16px rgba(4, 27, 24, 0.35)",
                textDecoration: "none",
              }}
            >
              <PhoneIcon size={16} />
              {UI_TEXT.about.cta[language]}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
