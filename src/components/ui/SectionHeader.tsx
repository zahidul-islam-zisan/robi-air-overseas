import React from "react"
import { Badge } from "./Badge"

interface SectionHeaderProps {
  badge: string
  title: string
  subtitle?: string
  align?: "center" | "left"
  light?: boolean
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === "center" ? 640 : "100%",
        margin: align === "center" ? "0 auto 64px" : "0 0 32px",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <Badge variant={light ? "glass" : "brand"}>{badge}</Badge>
      </div>

      <h2
        style={{
          fontSize: "clamp(26px, 3vw, 38px)",
          fontWeight: 800,
          marginBottom: subtitle ? 16 : 0,
          lineHeight: 1.3,
          color: light ? "#ffffff" : "#0f2018",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            color: light ? "rgba(255, 255, 255, 0.72)" : "#5a7066",
            fontSize: 15,
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
