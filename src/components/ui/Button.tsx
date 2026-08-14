import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const getPadding = () => {
    switch (size) {
      case "sm":
        return "8px 16px"
      case "lg":
        return "14px 28px"
      case "md":
      default:
        return "12px 24px"
    }
  }

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 13
      case "lg":
        return 16
      case "md":
      default:
        return 15
    }
  }

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "danger":
        return {
          background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 16px rgba(220, 38, 38, 0.35)",
        }
      case "secondary":
        return {
          background: "#041B18",
          color: "#ffffff",
          border: "1px solid rgba(0, 122, 94, 0.3)",
        }
      case "outline":
        return {
          background: "transparent",
          color: "#ffffff",
          border: "1.5px solid rgba(255,255,255,0.35)",
        }
      case "ghost":
        return {
          background: "none",
          color: "var(--color-brand, #053B36)",
          border: "none",
          padding: 0,
        }
      case "primary":
      default:
        return {
          background: "linear-gradient(135deg, #053B36 0%, #007A5E 100%)",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 16px rgba(5, 59, 54, 0.3)",
        }
    }
  }

  return (
    <button
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: getPadding(),
        fontSize: getFontSize(),
        fontWeight: 700,
        borderRadius: 12,
        cursor: "pointer",
        width: fullWidth ? "100%" : "auto",
        transition: "all 0.2s ease-in-out",
        ...getVariantStyles(),
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  )
}
