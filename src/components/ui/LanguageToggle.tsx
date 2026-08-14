import React from "react"
import type { Language } from "../../types"

interface LanguageToggleProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  onLanguageChange,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.06)",
        borderRadius: 8,
        padding: "3px 4px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        marginTop: 14,
      }}
    >
      <button
        type="button"
        onClick={() => onLanguageChange("bn")}
        aria-label="Switch to Bengali"
        style={{
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: language === "bn" ? 700 : 500,
          background:
            language === "bn" ? "var(--color-brand, #006A4E)" : "transparent",
          color: language === "bn" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "'Hind Siliguri', sans-serif",
        }}
      >
        বাংলা
      </button>

      <span
        style={{
          color: "rgba(255, 255, 255, 0.3)",
          padding: "0 4px",
          fontSize: 11,
        }}
      >
        |
      </span>

      <button
        type="button"
        onClick={() => onLanguageChange("en")}
        aria-label="Switch to English"
        style={{
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: language === "en" ? 700 : 500,
          background:
            language === "en" ? "var(--color-brand, #006A4E)" : "transparent",
          color: language === "en" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        English
      </button>
    </div>
  )
}
