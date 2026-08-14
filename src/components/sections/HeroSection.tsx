import React, { useState, useEffect, useRef } from "react"
import type { Language } from "../../types"
import { UI_TEXT } from "../../data/siteData"
import { ArrowRightIcon, WhatsAppIcon } from "../ui/Icons"

interface HeroSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

const HERO_SLIDESHOW_IMAGES = [
  "/images/hero/hero-01.jpg",
  "/images/hero/hero-02.jpg",
  "/images/hero/hero-03.jpg",
  "/images/hero/hero-04.jpg",
  "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop&auto=format&q=80",
]

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onNavigate,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const isPreloadedRef = useRef(false)

  // Preload all hero slideshow images on mount for instant seamless cross-fading
  useEffect(() => {
    if (!isPreloadedRef.current) {
      HERO_SLIDESHOW_IMAGES.forEach((src) => {
        const img = new Image()
        img.src = src
        if (img.decode) {
          img.decode().catch(() => {
            // Ignore decode cancellation
          })
        }
      })
      isPreloadedRef.current = true
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {HERO_SLIDESHOW_IMAGES.map((imgUrl, index) => {
          const isActive = index === currentSlideIndex
          return (
            <img
              key={index}
              src={imgUrl}
              alt={`Robi Air Overseas Hero Slide ${index + 1}`}
              loading="eager"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                opacity: isActive ? 1 : 0,
                transition: "opacity 1.2s ease-in-out",
                willChange: "opacity",
                pointerEvents: "none",
              }}
            />
          )
        })}
      </div>

      {/* Dark Teal Overlay Gradient - Balanced Shadow Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(4,27,24,0.84) 0%, rgba(5,59,54,0.68) 60%, rgba(4,27,24,0.60) 100%)",
          zIndex: 2,
          pointerEvents: "none",
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
          pointerEvents: "none",
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
              background: "rgba(5, 59, 54, 0.55)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
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
              textShadow: "0 3px 24px rgba(0, 0, 0, 0.85)",
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
              color: "rgba(255, 255, 255, 0.92)",
              marginBottom: 32,
              lineHeight: 1.75,
              maxWidth: 520,
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.85)",
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

        {/* Right Side Floating WhatsApp Quick Contact Badge */}
        <a
          href="https://wa.me/8801928826736"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 hover:scale-105 group"
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            background: "rgba(4, 27, 24, 0.82)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(37, 211, 102, 0.45)",
            boxShadow:
              "0 12px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(37, 211, 102, 0.25)",
            textDecoration: "none",
            width: 175,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(37, 211, 102, 0.6)",
            }}
            className="group-hover:rotate-12 transition-transform duration-300"
          >
            <WhatsAppIcon size={28} style={{ color: "#ffffff" }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#25D366",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              WhatsApp
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#ffffff",
                marginTop: 2,
                letterSpacing: "0.3px",
              }}
            >
              01928826736
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255, 255, 255, 0.75)",
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              {language === "bn" ? "সরাসরি চ্যাট করুন" : "Chat Directly"}
            </div>
          </div>
        </a>
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
