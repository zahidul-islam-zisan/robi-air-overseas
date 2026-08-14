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

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("robiair_lang")
    return saved === "en" ? "en" : "bn"
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem("robiair_lang", language)
    document.body.setAttribute("data-lang", language)

    // Dynamic Title & Meta update for SEO
    if (language === "bn") {
      document.title = "রবি এয়ার ওভারসিজ - ট্রাভেল ও ওভারসিজ সেবা"
    } else {
      document.title = "Robi Air Overseas - Travel & Overseas Services"
    }
  }, [language])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
  }

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

      {/* Footer & Language Toggle */}
      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
        onNavigate={scrollTo}
      />
    </div>
  )
}
