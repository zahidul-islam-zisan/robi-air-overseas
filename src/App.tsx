import { useState, useEffect } from "react"
import type { Language } from "./types"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { HeroSection } from "./components/sections/HeroSection"
import { TrustStrip } from "./components/sections/TrustStrip"
import { AboutSection } from "./components/sections/AboutSection"
import { ServicesSection } from "./components/sections/ServicesSection"
import { PackagesSection } from "./components/sections/PackagesSection"
import { OverseasSection } from "./components/sections/OverseasSection"
import { WhyUsSection } from "./components/sections/WhyUsSection"
import { B2BSection } from "./components/sections/B2BSection"
import { ContactSection } from "./components/sections/ContactSection"
import { FixedWhatsAppButton } from "./components/ui/FixedWhatsAppButton"
import { AuthProvider } from "./context/AuthContext"
import { AdminLoginPage } from "./components/admin/AdminLoginPage"
import { ProtectedRoute } from "./components/admin/ProtectedRoute"
import { AdminLayout } from "./components/admin/AdminLayout"
import { AdminDashboard } from "./components/admin/AdminDashboard"

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("robiair_lang")
    return saved === "en" ? "en" : "bn"
  })

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handleLocationChange)
    return () => window.removeEventListener("popstate", handleLocationChange)
  }, [])

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path)
    setCurrentPath(path)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem("robiair_lang", language)
    document.body.setAttribute("data-lang", language)

    // Dynamic Title & Meta update for SEO
    if (currentPath.startsWith("/admin")) {
      document.title = "Admin Portal - Robi Air Overseas"
    } else if (language === "bn") {
      document.title = "রবি এয়ার ওভারসিজ - ট্রাভেল ও ওভারসিজ সেবা"
    } else {
      document.title = "Robi Air Overseas - Travel & Overseas Services"
    }
  }, [language, currentPath])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
  }

  // Handle Admin Portal Routes
  if (currentPath === "/admin/login") {
    return (
      <AuthProvider>
        <AdminLoginPage onLoginSuccess={() => navigateTo("/admin")} />
      </AuthProvider>
    )
  }

  if (currentPath.startsWith("/admin")) {
    const adminSubTab =
      currentPath === "/admin/hero-slides"
        ? "hero"
        : currentPath === "/admin/services"
          ? "services"
          : currentPath === "/admin/packages"
            ? "packages"
            : "dashboard"

    return (
      <AuthProvider>
        <ProtectedRoute>
          <AdminLayout
            currentTab={adminSubTab}
            onTabChange={(tab) =>
              navigateTo(
                tab === "dashboard"
                  ? "/admin"
                  : `/admin/${tab === "hero" ? "hero-slides" : tab}`,
              )
            }
            onLogoutSuccess={() => navigateTo("/admin/login")}
          >
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      </AuthProvider>
    )
  }

  // Public Website - Approved Client Design (100% Unchanged)
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Navigation Header */}
      <Header scrolled={scrolled} language={language} onNavigate={scrollTo} />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection language={language} onNavigate={scrollTo} />
        <TrustStrip language={language} />
        <AboutSection language={language} onNavigate={scrollTo} />
        <ServicesSection language={language} onNavigate={scrollTo} />
        <PackagesSection language={language} onNavigate={scrollTo} />
        <OverseasSection language={language} onNavigate={scrollTo} />
        <WhyUsSection language={language} />
        <B2BSection language={language} onNavigate={scrollTo} />
        <ContactSection language={language} />
      </main>

      {/* Fixed Right Viewport Edge WhatsApp Contact Tab */}
      <FixedWhatsAppButton />

      {/* Footer & Language Toggle */}
      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
        onNavigate={scrollTo}
      />
    </div>
  )
}
