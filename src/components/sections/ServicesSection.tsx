import React, { useState, useEffect } from "react"
import type { Language } from "../../types"
import { SERVICES_DATA, UI_TEXT } from "../../data/siteData"
import { SectionHeader } from "../ui/SectionHeader"
import { ServiceCard } from "../ui/Card"
import {
  getPublicServicesApi,
  type ServiceItem,
} from "../../services/serviceApi"

interface ServicesSectionProps {
  language: Language
  onNavigate: (id: string) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onNavigate,
}) => {
  const [apiServices, setApiServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadPublicServices() {
      const response = await getPublicServicesApi()
      if (
        isMounted &&
        response.success &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setApiServices(response.data as ServiceItem[])
      }
    }

    loadPublicServices()

    return () => {
      isMounted = false
    }
  }, [])

  const hasApiServices = apiServices.length > 0

  return (
    <section
      id="services"
      style={{ padding: "96px 24px", background: "#f8faf9" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeader
          badge={UI_TEXT.services.badge[language]}
          title={UI_TEXT.services.title[language]}
          subtitle={UI_TEXT.services.subtitle[language]}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {hasApiServices
            ? apiServices.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  image={svc.image_url}
                  title={svc.title}
                  description={svc.short_description || ""}
                  ctaText={UI_TEXT.services.contactBtn[language]}
                  onContactClick={() => onNavigate("contact")}
                />
              ))
            : SERVICES_DATA.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  iconName={svc.iconName}
                  title={svc.title[language]}
                  description={svc.desc[language]}
                  ctaText={UI_TEXT.services.contactBtn[language]}
                  onContactClick={() => onNavigate("contact")}
                />
              ))}
        </div>
      </div>
    </section>
  )
}
