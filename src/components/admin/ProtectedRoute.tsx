import React from "react"
import { useAuth } from "../../context/AuthContext"
import { AdminLoginPage } from "./AdminLoginPage"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#041B18",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "3px solid rgba(0, 168, 107, 0.2)",
            borderTopColor: "#00A86B",
            animation: "spin 1s linear infinite",
            marginBottom: 16,
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#6ee7b7" }}>
          Verifying Admin Credentials...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => {}} />
  }

  return <>{children}</>
}
