import React, { useState, useEffect, useRef } from "react"
import type { Language } from "../../types"
import { UI_TEXT } from "../../data/siteData"
import { ArrowRightIcon } from "../ui/Icons"

import kaabaGroupImg from "../../assets/images/kaaba_group.jpg"
import hajjBusImg from "../../assets/images/hajj_bus.jpg"
import officeTeamImg from "../../assets/images/office_team.jpg"

interface HeroSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

const HERO_SLIDESHOW_IMAGES = [
  kaabaGroupImg,
  hajjBusImg,
  officeTeamImg,
  "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&h=900&fit=crop&auto=format&q=80",
]

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onNavigate,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const isPreloaded = useRef(false)

  // Preload all slideshow images on initial mount to guarantee instant, seamless transitions on Vercel
  useEffect(() => {
    if (!isPreloaded.current) {
      HERO_SLIDESHOW_IMAGES.forEach((src) => {
        const img = new Image()
        img.src = src
      })
      isPreloaded.current = true
    }

    const timer = setInterval(() => {
      setCurrentSlideIndex(
        (prevIndex) => (prevIndex + 1) % HERO_SLIDESHOW_IMAGES.length,
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#041B18",
      }}
    >
      {/* Background Automatic Image Slideshow with Smooth Cross-Fade */}
      {HERO_SLIDESHOW_IMAGES.map((imgUrl, index) => {
        const isActive = index === currentSlideIndex
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isActive ? 1 : 0,
              transition:
                "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isActive ? "scale(1.04)" : "scale(1.0)",
              zIndex: 1,
              willChange: "opacity, transform",
            }}
          />
        )
      })}

      {/* Dark Teal Overlay Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(4,27,24,0.92) 0%, rgba(5,59,54,0.84) 60%, rgba(4,27,24,0.76) 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: "linear-gradient(to bottom, #DC2626, #007A5E, #D4AF37)",
          zIndex: 3,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "112px 20px 100px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: 20,
              padding: "6px 14px",
              borderRadius: 100,
              color: "#6ee7b7",
              border: "1px solid rgba(0, 122, 94, 0.4)",
              background: "rgba(5, 59, 54, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#DC2626",
                display: "inline-block",
                boxShadow: "0 0 8px #DC2626",
              }}
            />
            {UI_TEXT.hero.badge[language]}
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 56px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {UI_TEXT.hero.headlineLine1[language]}
            <br />
            <span style={{ color: "#6ee7b7" }}>
              {UI_TEXT.hero.headlineLine2[language]}
            </span>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.78)",
              marginBottom: 32,
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            {UI_TEXT.hero.subtext[language]}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate("services")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white border-none cursor-pointer transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                boxShadow: "0 4px 20px rgba(220, 38, 38, 0.4)",
              }}
            >
              {UI_TEXT.hero.primaryCta[language]} <ArrowRightIcon size={16} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-transparent border border-white/35 cursor-pointer transition-all hover:bg-white/10"
            >
              {UI_TEXT.hero.secondaryCta[language]}
            </button>
          </div>
        </div>
      </div>

      {/* Slideshow Progress Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 32,
          zIndex: 10,
          display: "flex",
          gap: 6,
        }}
        className="hidden sm:flex"
      >
        {HERO_SLIDESHOW_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              height: 4,
              width: index === currentSlideIndex ? 24 : 8,
              borderRadius: 2,
              background:
                index === currentSlideIndex
                  ? "#6ee7b7"
                  : "rgba(255, 255, 255, 0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <div
        className="h-24 lg:h-12 absolute bottom-0 left-0 right-0 z-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, transparent 100%)",
        }}
      />
    </section>
  )
}
