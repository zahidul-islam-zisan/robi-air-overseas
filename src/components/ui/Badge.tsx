import React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "brand" | "emerald" | "red" | "gold" | "glass"
  style?: React.CSSProperties
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "brand",
  style,
}) => {
  const getStyles = (): React.CSSProperties => {
    switch (variant) {
      case "red":
        return {
          color: "#ffffff",
          background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
        }
      case "gold":
        return {
          color: "#041B18",
          background: "linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)",
        }
      case "glass":
        return {
          color: "#6ee7b7",
          border: "1px solid rgba(110, 231, 183, 0.3)",
          background: "rgba(5, 59, 54, 0.4)",
        }
      case "emerald":
        return {
          color: "#ffffff",
          background: "linear-gradient(135deg, #053B36 0%, #007A5E 100%)",
        }
      case "brand":
      default:
        return {
          color: "var(--color-brand, #053B36)",
          background: "rgba(5, 59, 54, 0.08)",
          border: "1px solid rgba(5, 59, 54, 0.22)",
        }
    }
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        padding: "6px 14px",
        borderRadius: 6,
        ...getStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
