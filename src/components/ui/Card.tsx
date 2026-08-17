import React from "react"
import { DynamicIcon, ArrowRightIcon } from "./Icons"

interface ServiceCardProps {
  iconName?: string
  image?: string
  title: string
  description: string
  ctaText: string
  onContactClick: () => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  iconName,
  image,
  title,
  description,
  ctaText,
  onContactClick,
}) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        padding: 28,
        border: "1px solid rgba(0, 106, 78, 0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.3s ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 106, 78, 0.12)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"
      }}
    >
      <div>
        {image ? (
          <div
            style={{
              width: "100%",
              height: 160,
              borderRadius: 14,
              overflow: "hidden",
              background: "#041B18",
              marginBottom: 20,
              border: "1px solid rgba(0, 106, 78, 0.12)",
            }}
          >
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "rgba(0, 106, 78, 0.10)",
              border: "1px solid rgba(0, 106, 78, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <DynamicIcon
              name={iconName || "BriefcaseIcon"}
              size={22}
              style={{ color: "var(--color-brand, #006A4E)" }}
            />
          </div>
        )}
        <h3
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 10,
            color: "#0f2018",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#5a7066",
            fontSize: 14,
            lineHeight: 1.8,
            marginBottom: 20,
          }}
        >
          {description}
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={onContactClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 700,
            color: "var(--color-brand, #006A4E)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = "12px"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = "6px"
          }}
        >
          {ctaText} <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  )
}

interface PackageCardProps {
  image: string
  imageAlt: string
  badge: string
  title: string
  subtitle: string
  description: string
  ctaText: string
  onContactClick: () => void
}

export const PackageCard: React.FC<PackageCardProps> = ({
  image,
  imageAlt,
  badge,
  title,
  subtitle,
  description,
  ctaText,
  onContactClick,
}) => {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 220,
          overflow: "hidden",
          background: "#e2ebe6",
        }}
      >
        <img
          src={image}
          alt={imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,50,35,0.65) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 14,
            fontWeight: 700,
            padding: "6px 16px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #006A4E 0%, #00A86B 100%)",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {badge}
        </div>
      </div>

      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-brand, #006A4E)",
              marginBottom: 6,
            }}
          >
            {subtitle}
          </div>
          <h3
            style={{
              fontWeight: 800,
              fontSize: 22,
              marginBottom: 12,
              color: "#0f2018",
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 14, color: "#5a7066", marginBottom: 20 }}>
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={onContactClick}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            background: "#0f2018",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-brand, #006A4E)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#0f2018"
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}

interface WhyUsCardProps {
  iconName: string
  title: string
  description: string
}

export const WhyUsCard: React.FC<WhyUsCardProps> = ({
  iconName,
  title,
  description,
}) => {
  return (
    <div
      style={{
        padding: 28,
        borderRadius: 20,
        background: "#f8faf9",
        border: "1px solid rgba(0, 106, 78, 0.07)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 106, 78, 0.1)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "#0f2018",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <DynamicIcon name={iconName} size={22} style={{ color: "#6ee7b7" }} />
      </div>
      <h3
        style={{
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 10,
          color: "#0f2018",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#5a7066", fontSize: 14, lineHeight: 1.8 }}>
        {description}
      </p>
    </div>
  )
}
