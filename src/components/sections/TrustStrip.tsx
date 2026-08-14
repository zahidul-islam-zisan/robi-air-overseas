import React from "react"
import type { Language } from "../../types"
import { TRUST_STRIP_ITEMS } from "../../data/siteData"
import { DynamicIcon } from "../ui/Icons"

interface TrustStripProps {
  language: Language
}

export const TrustStrip: React.FC<TrustStripProps> = ({ language }) => {
  return (
    <section className="-mt-22 sm:-mt-24 lg:-mt-14 relative z-20 bg-transparent">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            border: "1px solid rgba(0, 122, 94, 0.35)",
          }}
        >
          {TRUST_STRIP_ITEMS.map((item, i) => {
            const borderClasses =
              i === 0
                ? "border-r border-b lg:border-b-0 border-white/20"
                : i === 1
                  ? "border-b lg:border-b-0 lg:border-r border-white/20"
                  : i === 2
                    ? "border-r lg:border-r border-white/20"
                    : ""

            return (
              <div
                key={i}
                className={`relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center gap-3 p-5 sm:p-7 text-center ${borderClasses}`}
                style={{ minHeight: 140 }}
              >
                {/* Background Service Image - Highly Visible */}
                {item.bgImg && (
                  <img
                    src={item.bgImg}
                    alt={item.label[language]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}

                {/* Lightweight Dark Overlay for High Image Visibility & Perfect Contrast */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(4, 27, 24, 0.78) 0%, rgba(4, 27, 24, 0.40) 50%, rgba(4, 27, 24, 0.25) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-2.5">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(4, 27, 24, 0.75)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:scale-110"
                  >
                    <DynamicIcon
                      name={item.iconName}
                      size={22}
                      style={{ color: i % 2 === 0 ? "#6ee7b7" : "#f87171" }}
                    />
                  </div>

                  <div
                    style={{
                      background: "rgba(4, 27, 24, 0.65)",
                      backdropFilter: "blur(6px)",
                      padding: "6px 14px",
                      borderRadius: 10,
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#ffffff",
                        fontSize: 14,
                        letterSpacing: "-0.2px",
                        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      }}
                      className="sm:text-base"
                    >
                      {item.label[language]}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6ee7b7",
                        marginTop: 2,
                        fontWeight: 600,
                      }}
                      className="sm:text-xs"
                    >
                      {item.sub[language]}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
