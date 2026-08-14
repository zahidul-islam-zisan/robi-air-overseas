import React, { useState } from "react"
import type { Language } from "../../types"
import { NAV_LINKS, UI_TEXT } from "../../data/siteData"
import { RobiAirLogo, MenuIcon, XIcon } from "../ui/Icons"

interface HeaderProps {
  scrolled: boolean
  language: Language
  onNavigate: (id: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  scrolled,
  language,
  onNavigate,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id: string) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(4, 27, 24, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        borderBottom: scrolled ? "1px solid rgba(220, 38, 38, 0.2)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleNav("home")}
            onKeyDown={(e) => e.key === "Enter" && handleNav("home")}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <RobiAirLogo size={56} />
            <div>
              <div
                style={{
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  fontSize: 18,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.3px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                }}
                className="sm:text-xl"
              >
                {UI_TEXT.header.brandName}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6ee7b7",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {UI_TEXT.header.tagline[language]}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.85)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  padding: "4px 0",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)"
                }}
              >
                {link.label[language]}
              </button>
            ))}
          </nav>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav("contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white border-none cursor-pointer transition-all hover:scale-105 shadow-md"
              style={{
                background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)",
              }}
            >
              {UI_TEXT.header.contactCta[language]}
            </button>

            <button
              type="button"
              className="lg:hidden text-white bg-transparent border-none cursor-pointer p-1"
              aria-label={
                menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <XIcon size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? 500 : 0,
          transition: "max-height 0.35s ease-in-out",
          background: "rgba(4, 27, 24, 0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: menuOpen ? "1px solid rgba(220, 38, 38, 0.3)" : "none",
          boxShadow: menuOpen ? "0 20px 40px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div
          style={{
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              style={{
                textAlign: "left",
                padding: "12px 16px",
                color: "rgba(255, 255, 255, 0.85)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 8,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"
                e.currentTarget.style.color = "#ffffff"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none"
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)"
              }}
            >
              {link.label[language]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNav("contact")}
            style={{
              marginTop: 10,
              padding: "13px 16px",
              borderRadius: 10,
              fontWeight: 700,
              background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              boxShadow: "0 4px 16px rgba(220, 38, 38, 0.4)",
            }}
          >
            {UI_TEXT.header.contactCta[language]}
          </button>
        </div>
      </div>
    </header>
  )
}
