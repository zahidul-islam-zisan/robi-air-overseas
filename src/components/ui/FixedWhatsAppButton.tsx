import React from "react"
import { WHATSAPP_NUMBER } from "../../data/siteData"
import { WhatsAppIcon } from "./Icons"

export const FixedWhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 88,
        borderRadius: "20px 0 0 20px",
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.35)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.35)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.35)",
        borderRight: "none",
        boxShadow:
          "-4px 8px 24px rgba(37, 211, 102, 0.45), 0 0 16px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) translateX(-5px)"
        e.currentTarget.style.boxShadow =
          "-6px 12px 32px rgba(37, 211, 102, 0.65), 0 0 20px rgba(0, 0, 0, 0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(-50%)"
        e.currentTarget.style.boxShadow =
          "-4px 8px 24px rgba(37, 211, 102, 0.45), 0 0 16px rgba(0, 0, 0, 0.25)"
      }}
    >
      <WhatsAppIcon
        size={28}
        style={{
          color: "#ffffff",
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
        }}
        className="transition-transform duration-300 group-hover:scale-110"
      />
    </a>
  )
}
