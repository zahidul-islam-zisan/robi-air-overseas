export type Language = "bn" | "en"

export interface LocalizedString {
  bn: string
  en: string
}

export interface NavLink {
  id: string
  label: LocalizedString
}

export interface ServiceItem {
  id: string
  iconName: string
  title: LocalizedString
  desc: LocalizedString
}

export interface PackageItem {
  id: string
  title: LocalizedString
  subtitle: LocalizedString
  img: string
  alt: LocalizedString
  cta: LocalizedString
  badge: LocalizedString
}

export interface WhyUsItem {
  id: string
  iconName: string
  title: LocalizedString
  desc: LocalizedString
}

export interface TrustItem {
  iconName: string
  label: LocalizedString
  sub: LocalizedString
  bgImg?: string
}

export interface ContactInfoItem {
  iconName: string
  label: LocalizedString
  value: LocalizedString
}

export interface InquiryFormData {
  name: string
  phone: string
  email: string
  service: string
  message: string
}

export interface FormErrors {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
}
