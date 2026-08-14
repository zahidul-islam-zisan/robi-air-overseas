import React from "react"
import type { Language } from "../../types"
import { WHY_US_DATA, UI_TEXT } from "../../data/siteData"
import { SectionHeader } from "../ui/SectionHeader"
import { WhyUsCard } from "../ui/Card"

interface WhyUsSectionProps {
  language: Language
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ language }) => {
  return (
    <section
      id="why-us"
      style={{ padding: "96px 24px", background: "#ffffff" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeader
          badge={UI_TEXT.whyUs.badge[language]}
          title={UI_TEXT.whyUs.title[language]}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {WHY_US_DATA.map((item) => (
            <WhyUsCard
              key={item.id}
              iconName={item.iconName}
              title={item.title[language]}
              description={item.desc[language]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
