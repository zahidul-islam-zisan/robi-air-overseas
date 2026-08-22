import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { RobiAirLogo } from "../ui/Icons"
import { HeroSlidesManager } from "./HeroSlidesManager"
import { ServicesManager } from "./ServicesManager"
import { PackagesManager } from "./PackagesManager"
import { OverseasServicesManager } from "./OverseasServicesManager"
import { GalleryManager } from "./GalleryManager"
import { TestimonialsManager } from "./TestimonialsManager"
import { ContactMessagesManager } from "./ContactMessagesManager"
import { BookingInquiriesManager } from "./BookingInquiriesManager"

interface AdminLayoutProps {
  children: React.ReactNode
  onLogoutSuccess: () => void
  currentTab?: string
  onTabChange?: (tab: string) => void
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  onLogoutSuccess,
  currentTab = "dashboard",
  onTabChange,
}) => {
  const { admin, logout } = useAuth()
  const [internalTab, setInternalTab] = useState("dashboard")
  const activeTab = onTabChange ? currentTab : internalTab

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId)
    } else {
      setInternalTab(tabId)
    }
  }

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      onLogoutSuccess()
    } finally {
      setIsLoggingOut(false)
    }
  }

  const MENU_ITEMS = [
    { id: "dashboard", label: "Dashboard", badge: "Live" },
    { id: "hero", label: "Hero Slides", badge: "CRUD Ready" },
    { id: "services", label: "Services", badge: "CRUD Ready" },
    { id: "packages", label: "Packages", badge: "CRUD Ready" },
    { id: "overseas", label: "Overseas Services", badge: "CRUD Ready" },
    { id: "gallery", label: "Gallery Assets", badge: "CRUD Ready" },
    { id: "testimonials", label: "Testimonials", badge: "CRUD Ready" },
    { id: "messages", label: "Contact Messages", badge: "CRUD Ready" },
    { id: "inquiries", label: "Booking Inquiries", badge: "CRUD Ready" },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Admin Header */}
      <header
        style={{
          background: "#041B18",
          borderBottom: "1px solid rgba(0, 168, 107, 0.25)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <RobiAirLogo size={38} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#ffffff" }}>
              Robi Air Overseas
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#6ee7b7",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              ADMIN CONTROL PANEL
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }} className="hidden sm:block">
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>
              {admin?.name || "Admin"}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>
              {admin?.email || "admin@robiair.com"}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              background: "rgba(220, 38, 38, 0.15)",
              color: "#f87171",
              border: "1px solid rgba(220, 38, 38, 0.4)",
              borderRadius: 10,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: isLoggingOut ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main Admin Sidebar & Content Layout */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: 260,
            background: "#03241F",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
          }}
          className="hidden md:flex"
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#6ee7b7",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              paddingLeft: 12,
              marginBottom: 16,
            }}
          >
            Navigation
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              flex: 1,
            }}
          >
            {MENU_ITEMS.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? "#ffffff" : "#9ca3af",
                    background: isActive
                      ? "rgba(0, 168, 107, 0.25)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(0, 168, 107, 0.4)"
                      : "1px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 6,
                      background: isActive
                        ? "#00A86B"
                        : "rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                    }}
                  >
                    {item.badge}
                  </span>
                </button>
              )
            })}
          </nav>

          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: 16,
              marginTop: 24,
            }}
          >
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                color: "#f87171",
                background: "rgba(220, 38, 38, 0.1)",
                border: "1px solid rgba(220, 38, 38, 0.3)",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Right Main Content */}
        <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>
          {activeTab === "dashboard" ? (
            children
          ) : activeTab === "hero" ? (
            <HeroSlidesManager />
          ) : activeTab === "services" ? (
            <ServicesManager />
          ) : activeTab === "packages" ? (
            <PackagesManager />
          ) : activeTab === "overseas" ? (
            <OverseasServicesManager />
          ) : activeTab === "gallery" ? (
            <GalleryManager />
          ) : activeTab === "testimonials" ? (
            <TestimonialsManager />
          ) : activeTab === "messages" ? (
            <ContactMessagesManager />
          ) : activeTab === "inquiries" ? (
            <BookingInquiriesManager />
          ) : (
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                {MENU_ITEMS.find((m) => m.id === activeTab)?.label} Module
              </h2>
              <p style={{ color: "#6b7280", fontSize: 14 }}>
                This module interface is scheduled for full CRUD integration in
                upcoming tasks.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
