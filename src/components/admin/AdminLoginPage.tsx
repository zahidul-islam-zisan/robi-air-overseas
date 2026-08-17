import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { RobiAirLogo } from "../ui/Icons"

interface AdminLoginPageProps {
  onLoginSuccess: () => void
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
}) => {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await login(email.trim(), password)

      if (result.success) {
        onLoginSuccess()
      } else {
        setErrorMessage(
          result.message || "Invalid credentials or unauthorized access.",
        )
      }
    } catch (err) {
      setErrorMessage(
        "An unexpected error occurred while connecting to the backend server.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #041B18 0%, #053B36 50%, #03241F 100%)",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "rgba(4, 27, 24, 0.85)",
          backdropFilter: "blur(16px)",
          borderRadius: 24,
          border: "1px solid rgba(0, 168, 107, 0.3)",
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 168, 107, 0.15)",
          padding: "40px 32px",
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <RobiAirLogo size={64} />
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: 6,
              letterSpacing: "-0.3px",
            }}
          >
            Robi Air Overseas
          </h1>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#6ee7b7",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Admin Management Portal
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              background: "rgba(220, 38, 38, 0.15)",
              border: "1px solid rgba(220, 38, 38, 0.4)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 24,
              color: "#fca5a5",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "#e2ebe6",
                marginBottom: 8,
                letterSpacing: "0.02em",
              }}
            >
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@robiair.com"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.18)",
                background: "rgba(3, 36, 31, 0.6)",
                color: "#ffffff",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "#e2ebe6",
                marginBottom: 8,
                letterSpacing: "0.02em",
              }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.18)",
                background: "rgba(3, 36, 31, 0.6)",
                color: "#ffffff",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 28,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontSize: 12,
                color: "#a3b8b0",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                style={{ accentColor: "#00A86B", width: 15, height: 15 }}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 14,
              color: "#ffffff",
              background: isSubmitting
                ? "rgba(0, 168, 107, 0.5)"
                : "linear-gradient(135deg, #00A86B 0%, #053B36 100%)",
              border: "1px solid rgba(0, 168, 107, 0.5)",
              boxShadow: "0 4px 20px rgba(0, 168, 107, 0.3)",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>
        </form>

        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            fontSize: 11,
            color: "#6ee7b7",
            opacity: 0.8,
          }}
        >
          Protected Admin Route • Robi Air Overseas System
        </div>
      </div>
    </div>
  )
}
