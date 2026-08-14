import React from "react"
import type { Language } from "../../types"
import { UI_TEXT, NAV_LINKS, SERVICES_DATA } from "../../data/siteData"
import { LanguageToggle } from "../ui/LanguageToggle"
import {
  RobiAirLogo,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
} from "../ui/Icons"

interface FooterProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onNavigate: (id: string) => void
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onNavigate,
}) => {
  return (
    <footer style={{ background: "#041B18" }}>
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(220, 38, 38, 0.5), rgba(0, 122, 94, 0.5), transparent)",
        }}
      />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 40,
          }}
        >
          {/* Column 1: Company Profile */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <RobiAirLogo size={56} />
              <div>
                <div
                  style={{
                    fontWeight: 900,
                    color: "#ffffff",
                    fontSize: 18,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {UI_TEXT.header.brandName}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#6ee7b7",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  {UI_TEXT.header.tagline[language]}
                </div>
              </div>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              {UI_TEXT.footer.desc[language]}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: WhatsAppIcon, label: "WhatsApp" },
              ].map(({ Icon, label }, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(5, 59, 54, 0.6)",
                    color: "#6ee7b7",
                    border: "1px solid rgba(0, 122, 94, 0.3)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#DC2626"
                    e.currentTarget.style.color = "#ffffff"
                    e.currentTarget.style.transform = "scale(1.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(5, 59, 54, 0.6)"
                    e.currentTarget.style.color = "#6ee7b7"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontWeight: 700,
                color: "#ffffff",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              {UI_TEXT.footer.quickLinksHeader[language]}
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "rgba(255, 255, 255, 0.6)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#DC2626",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {link.label[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services & Language Toggle */}
          <div>
            <h4
              style={{
                fontWeight: 700,
                color: "#ffffff",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              {UI_TEXT.footer.servicesHeader[language]}
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate("services")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "rgba(255, 255, 255, 0.6)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      padding: 0,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#007A5E",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {service.title[language]}
                  </button>
                </li>
              ))}
            </ul>

            {/* Compact Language Toggle */}
            <div style={{ marginTop: 12 }}>
              <LanguageToggle
                language={language}
                onLanguageChange={onLanguageChange}
              />
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4
              style={{
                fontWeight: 700,
                color: "#ffffff",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              {UI_TEXT.footer.contactHeader[language]}
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <PhoneIcon
                  size={16}
                  style={{ color: "#6ee7b7", marginTop: 2, flexShrink: 0 }}
                />
                <a
                  href="tel:+8801825679099"
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                  className="hover:text-white transition-colors"
                >
                  {language === "bn" ? "+৮৮০ ১৮২৫-৬৭৯০৯৯" : "+880 1825-679099"}
                </a>
              </li>
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <MailIcon
                  size={16}
                  style={{ color: "#6ee7b7", marginTop: 2, flexShrink: 0 }}
                />
                <a
                  href="mailto:robiairoverseas@gmail.com"
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                  className="hover:text-white transition-colors"
                >
                  robiairoverseas@gmail.com
                </a>
              </li>
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <MapPinIcon
                  size={16}
                  style={{ color: "#6ee7b7", marginTop: 2, flexShrink: 0 }}
                />
                <span
                  style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: 14 }}
                >
                  {UI_TEXT.contact.mapLabel[language]}
                </span>
              </li>
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <WhatsAppIcon
                  size={16}
                  style={{ color: "#6ee7b7", marginTop: 2, flexShrink: 0 }}
                />
                <a
                  href="https://wa.me/8801928826736"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                  className="hover:text-white transition-colors"
                >
                  {language === "bn"
                    ? "WhatsApp: +৮৮০ ১৯২৮-৮২৬৭৩৬"
                    : "WhatsApp: +880 1928-826736"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 14 }}>
            {UI_TEXT.footer.copyright[language]}
          </p>
          <p style={{ color: "rgba(255, 255, 255, 0.25)", fontSize: 12 }}>
            {UI_TEXT.footer.taglineBottom[language]}
          </p>
        </div>
      </div>
    </footer>
  )
}
