import React from "react"
import { useAuth } from "../../context/AuthContext"

export const AdminDashboard: React.FC = () => {
  const { admin } = useAuth()

  const STAT_CARDS = [
    { title: "Total Services", count: "—", label: "Active Services" },
    { title: "Total Packages", count: "—", label: "Hajj, Umrah & Tours" },
    { title: "Gallery Images", count: "—", label: "Media Assets" },
    { title: "New Messages", count: "—", label: "Customer Queries" },
    { title: "Pending Inquiries", count: "—", label: "Booking Requests" },
  ]

  return (
    <div>
      {/* Dashboard Top Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #041B18 0%, #053B36 100%)",
          borderRadius: 20,
          padding: "28px 32px",
          color: "#ffffff",
          marginBottom: 32,
          border: "1px solid rgba(0, 168, 107, 0.3)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#6ee7b7",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Administrator Dashboard
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
          }}
        >
          Welcome back, {admin?.name || "Administrator"}!
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#a3b8b0",
            marginTop: 8,
            marginBottom: 0,
            maxWidth: 600,
          }}
        >
          Robi Air Overseas Backend Management Portal. Monitor system statuses
          and prepare for database CRUD integrations.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 36,
        }}
      >
        {STAT_CARDS.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#053B36",
                marginBottom: 4,
              }}
            >
              {card.count}
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Module Notice */}
      <div
        style={{
          background: "#f9fafb",
          border: "1px dashed #d1d5db",
          borderRadius: 16,
          padding: 32,
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#374151",
            marginBottom: 8,
          }}
        >
          Backend API & CRUD Modules Integration Ready
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#6b7280",
            margin: 0,
            maxWidth: 540,
            marginInline: "auto",
          }}
        >
          The React Admin authentication and layout foundations are fully
          connected to Laravel Sanctum. Database CRUD modules will be integrated
          in upcoming tasks.
        </p>
      </div>
    </div>
  )
}
