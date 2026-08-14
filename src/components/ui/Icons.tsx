import React from "react"

export interface IconProps {
  size?: number
  style?: React.CSSProperties
  className?: string
}

export const RobiAirLogo: React.FC<IconProps> = ({
  size = 52,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: "drop-shadow(0 2px 10px rgba(0, 168, 107, 0.35))",
      ...style,
    }}
    className={className}
  >
    <defs>
      <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A86B" />
        <stop offset="50%" stopColor="#053B36" />
        <stop offset="100%" stopColor="#03241F" />
      </linearGradient>
      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="35%" stopColor="#EF4444" />
        <stop offset="70%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>

    {/* 3 Stars at top with crisp gold stroke */}
    <polygon
      points="50,4 53,11 60,11.5 55,16 56.5,23 50,19 43.5,23 45,16 40,11.5 47,11"
      fill="url(#goldGrad)"
      stroke="#78350F"
      strokeWidth="0.8"
    />
    <polygon
      points="27,14 29.5,19 35,19.5 31,23 32,28.5 27,25.5 22,28.5 23,23 19,19.5 24.5,19"
      fill="url(#goldGrad)"
      stroke="#78350F"
      strokeWidth="0.8"
    />
    <polygon
      points="73,14 75.5,19 81,19.5 77,23 78,28.5 73,25.5 68,28.5 69,23 65,19.5 70.5,19"
      fill="url(#goldGrad)"
      stroke="#78350F"
      strokeWidth="0.8"
    />

    {/* Outer Crescent Emblem "O" */}
    <path
      d="M 50 25 C 28 25 14 40 14 61 C 14 80 28 94 50 94 C 72 94 86 80 86 61 C 86 44 75 31 60 27 C 69 34 74 47 74 59 C 74 72 63 82 50 82 C 37 82 26 72 26 59 C 26 43 37 30 50 25 Z"
      fill="url(#tealGrad)"
      stroke="#6ee7b7"
      strokeWidth="0.6"
    />
    <path
      d="M 33 33 C 45 28 60 30 70 37 C 59 35 46 37 37 45 Z"
      fill="#34D399"
      opacity="0.9"
    />

    {/* Airplane Silhouette in Vibrant Red */}
    <path
      d="M 12 64 Q 35 57 60 48 L 90 43 C 94 42.5 96 44.5 94 47 C 89 50 72 55 62 57 L 46 70 L 37 70 L 44 59 L 24 63 L 18 68 L 12 68 L 16 65 Z"
      fill="url(#redGrad)"
      stroke="#ffffff"
      strokeWidth="0.5"
    />

    {/* Window Dots on Plane */}
    <circle cx="68" cy="51" r="1.2" fill="#ffffff" />
    <circle cx="73" cy="50" r="1.2" fill="#ffffff" />
    <circle cx="78" cy="48.5" r="1.2" fill="#ffffff" />
    <circle cx="83" cy="47" r="1.2" fill="#ffffff" />
    <circle cx="87" cy="45.5" r="1.2" fill="#ffffff" />
  </svg>
)

export const PlaneIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L8 11 1.8 9.2a.5.5 0 0 0-.5.8L5 14l-1 2 2 2 2-1 3.2 3.7a.5.5 0 0 0 .8-.5z" />
  </svg>
)

export const GlobeIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

export const MosqueIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M2 20h20M6 20V10M18 20V10M12 4a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4zM6 10H2l2-4M22 10h-4l-2-4M10 20v-4a2 2 0 0 1 4 0v4" />
  </svg>
)

export const HotelIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M3 22V8l9-6 9 6v14" />
    <path d="M9 22V12h6v10" />
    <rect x="9" y="4" width="6" height="4" />
  </svg>
)

export const VisaIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M14 9h4M14 12h4M14 15h4" />
  </svg>
)

export const BriefcaseIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 12h20" />
  </svg>
)

export const WorkerIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const TourIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M3 11l19-9-9 19-2-8z" />
  </svg>
)

export const HandshakeIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M11 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
    <path d="M9.5 14.5 11 17" />
    <path d="M13 17l1.5-2.5" />
    <path d="M8 12l-4 3 3 5 4-2" />
    <path d="M16 12l4 3-3 5-4-2" />
    <path d="M9 12h6l1-4-4-4-4 4z" />
  </svg>
)

export const CheckIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 18,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const PhoneIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.01-.01a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const MailIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export const MapPinIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const ClockIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
)

export const XIcon: React.FC<IconProps> = ({ size = 24, style, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const ShieldIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const StarIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export const HeartIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const ZapIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

export const UsersIcon: React.FC<IconProps> = ({
  size = 24,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export const WhatsAppIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

export const FacebookIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export const InstagramIcon: React.FC<IconProps> = ({
  size = 20,
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className={className}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

export const ICON_MAP: Record<string, React.FC<IconProps>> = {
  Plane: PlaneIcon,
  Globe: GlobeIcon,
  Mosque: MosqueIcon,
  Hotel: HotelIcon,
  Visa: VisaIcon,
  Briefcase: BriefcaseIcon,
  Worker: WorkerIcon,
  Tour: TourIcon,
  Handshake: HandshakeIcon,
  Check: CheckIcon,
  Shield: ShieldIcon,
  Star: StarIcon,
  Heart: HeartIcon,
  Zap: ZapIcon,
  Users: UsersIcon,
  Phone: PhoneIcon,
  Mail: MailIcon,
  MapPin: MapPinIcon,
  Clock: ClockIcon,
  WhatsApp: WhatsAppIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
}

export const DynamicIcon: React.FC<IconProps & { name: string }> = ({
  name,
  ...props
}) => {
  const IconComponent = ICON_MAP[name] || GlobeIcon
  return <IconComponent {...props} />
}
