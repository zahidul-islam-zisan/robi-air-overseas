import React, { useState } from "react"
import type { Language, InquiryFormData, FormErrors } from "../../types"
import { UI_TEXT, CONTACT_INFO_LIST, SERVICES_DATA } from "../../data/siteData"
import { SectionHeader } from "../ui/SectionHeader"
import {
  DynamicIcon,
  CheckIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "../ui/Icons"

interface ContactSectionProps {
  language: Language
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\d\s+\-()]{7,20}$/

    if (!formData.name.trim()) {
      newErrors.name =
        language === "bn" ? "পূর্ণ নাম প্রদান করুন" : "Full name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        language === "bn" ? "ফোন নম্বর প্রদান করুন" : "Phone number is required"
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone =
        language === "bn"
          ? "সঠিক ফোন নম্বর প্রদান করুন"
          : "Enter a valid phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email =
        language === "bn" ? "ইমেইল ঠিকানা প্রদান করুন" : "Email address is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        language === "bn"
          ? "সঠিক ইমেইল ঠিকানা প্রদান করুন"
          : "Enter a valid email address"
    }

    if (!formData.service) {
      newErrors.service =
        language === "bn" ? "একটি সেবা বেছে নিন" : "Please select a service"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: "", phone: "", email: "", service: "", message: "" })
      setErrors({})

      setTimeout(() => setSubmitted(false), 5000)
    }, 800)
  }

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    fontSize: 15,
    background: "#ffffff",
    border: `1.5px solid ${hasError ? "#ef4444" : "#e2ebe6"}`,
    color: "#122b27",
    outline: "none",
    transition: "border-color 0.2s ease",
  })

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: "#041B18",
  }

  return (
    <section
      id="contact"
      style={{ padding: "96px 24px", background: "#ffffff" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeader
          badge={UI_TEXT.contact.badge[language]}
          title={UI_TEXT.contact.title[language]}
          subtitle={UI_TEXT.contact.subtitle[language]}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
          }}
        >
          {/* Left Column: Contact Information */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                marginBottom: 40,
              }}
            >
              {CONTACT_INFO_LIST.map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "#041B18",
                      border: "1px solid rgba(0,122,94,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <DynamicIcon
                      name={item.iconName}
                      size={18}
                      style={{ color: "#6ee7b7" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#5a7066",
                        marginBottom: 2,
                      }}
                    >
                      {item.label[language]}
                    </div>
                    <div
                      style={{
                        color: "#122b27",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      {item.value[language]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
              {[
                {
                  Icon: FacebookIcon,
                  label: "Facebook",
                  href: "https://facebook.com",
                },
                {
                  Icon: InstagramIcon,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                {
                  Icon: WhatsAppIcon,
                  label: "WhatsApp",
                  href: "https://wa.me/8801928826736",
                },
              ].map(({ Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#041B18",
                    color: "#6ee7b7",
                    border: "1px solid rgba(0,122,94,0.3)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#DC2626"
                    e.currentTarget.style.color = "#ffffff"
                    e.currentTarget.style.transform = "scale(1.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#041B18"
                    e.currentTarget.style.color = "#6ee7b7"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Map Placeholder */}
            <div
              style={{
                borderRadius: 20,
                height: 192,
                background: "rgba(5, 59, 54, 0.08)",
                border: "1px solid rgba(5, 59, 54, 0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <MapPinIcon
                  size={28}
                  style={{
                    color: "var(--color-brand, #053B36)",
                    display: "block",
                    margin: "0 auto 8px",
                  }}
                />
                <div
                  style={{ fontSize: 14, color: "#122b27", fontWeight: 600 }}
                >
                  {UI_TEXT.contact.mapLabel[language]}
                </div>
                <div style={{ fontSize: 12, color: "#5a7066", marginTop: 4 }}>
                  {UI_TEXT.contact.mapSub[language]}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                borderRadius: 20,
                padding: 32,
                background: "#f4fbf7",
                border: "1px solid rgba(5, 59, 54, 0.1)",
              }}
            >
              {submitted && (
                <div
                  style={{
                    marginBottom: 24,
                    padding: "12px 16px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(5,59,54,0.10)",
                    color: "#041B18",
                    border: "1px solid rgba(5,59,54,0.25)",
                  }}
                  role="alert"
                >
                  <CheckIcon
                    size={16}
                    style={{ color: "var(--color-brand, #053B36)" }}
                  />
                  {UI_TEXT.contact.successMsg[language]}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label htmlFor="inquiry-name" style={labelStyle}>
                    {UI_TEXT.contact.labels.name[language]} *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    placeholder={
                      UI_TEXT.contact.labels.namePlaceholder[language]
                    }
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={inputStyle(!!errors.name)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-brand, #053B36)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name
                        ? "#ef4444"
                        : "#e2ebe6"
                    }}
                  />
                  {errors.name && (
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: 12,
                        marginTop: 4,
                        display: "block",
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiry-phone" style={labelStyle}>
                    {UI_TEXT.contact.labels.phone[language]} *
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    placeholder={
                      UI_TEXT.contact.labels.phonePlaceholder[language]
                    }
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    style={inputStyle(!!errors.phone)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-brand, #053B36)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.phone
                        ? "#ef4444"
                        : "#e2ebe6"
                    }}
                  />
                  {errors.phone && (
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: 12,
                        marginTop: 4,
                        display: "block",
                      }}
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="inquiry-email" style={labelStyle}>
                  {UI_TEXT.contact.labels.email[language]} *
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  placeholder={
                    UI_TEXT.contact.labels.emailPlaceholder[language]
                  }
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={inputStyle(!!errors.email)}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand, #053B36)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email
                      ? "#ef4444"
                      : "#e2ebe6"
                  }}
                />
                {errors.email && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: 12,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="inquiry-service" style={labelStyle}>
                  {UI_TEXT.contact.labels.service[language]} *
                </label>
                <select
                  id="inquiry-service"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  style={{
                    ...inputStyle(!!errors.service),
                    color: formData.service ? "#122b27" : "#9ca3af",
                    appearance: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand, #053B36)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.service
                      ? "#ef4444"
                      : "#e2ebe6"
                  }}
                >
                  <option value="" disabled>
                    {UI_TEXT.contact.labels.serviceSelectPlaceholder[language]}
                  </option>
                  {SERVICES_DATA.map((svc) => (
                    <option key={svc.id} value={svc.title[language]}>
                      {svc.title[language]}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: 12,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {errors.service}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label htmlFor="inquiry-message" style={labelStyle}>
                  {UI_TEXT.contact.labels.message[language]}
                </label>
                <textarea
                  id="inquiry-message"
                  placeholder={
                    UI_TEXT.contact.labels.messagePlaceholder[language]
                  }
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{ ...inputStyle(), resize: "none" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-brand, #053B36)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2ebe6"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                  color: "#ffffff",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 16px rgba(220, 38, 38, 0.4)",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = "scale(1.02)"
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(220, 38, 38, 0.5)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = "scale(1)"
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(220, 38, 38, 0.4)"
                  }
                }}
              >
                {isSubmitting
                  ? UI_TEXT.contact.labels.submitting[language]
                  : UI_TEXT.contact.labels.submit[language]}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
