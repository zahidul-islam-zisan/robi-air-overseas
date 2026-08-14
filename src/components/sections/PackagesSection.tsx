import React from "react"
import type { Language } from "../../types"
import { PACKAGES_DATA, UI_TEXT } from "../../data/siteData"
import { SectionHeader } from "../ui/SectionHeader"
import { PackageCard } from "../ui/Card"
import { ArrowRightIcon } from "../ui/Icons"

interface PackagesSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  language,
  onNavigate,
}) => {
  return (
    <section
      id="packages"
      style={{ padding: "96px 24px", background: "#ffffff" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeader
          badge={UI_TEXT.packages.badge[language]}
          title={UI_TEXT.packages.title[language]}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {PACKAGES_DATA.map((pkg) => (
            <PackageCard
              key={pkg.id}
              image={pkg.img}
              imageAlt={pkg.alt[language]}
              badge={pkg.badge[language]}
              title={pkg.title[language]}
              subtitle={pkg.subtitle[language]}
              description={UI_TEXT.packages.note[language]}
              ctaText={pkg.cta[language]}
              onContactClick={() => onNavigate("contact")}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            type="button"
            onClick={() => onNavigate("services")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              background: "transparent",
              color: "#053B36",
              border: "2px solid #053B36",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#053B36"
              e.currentTarget.style.color = "#ffffff"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "#053B36"
            }}
          >
            {UI_TEXT.packages.viewAllCta[language]} <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
