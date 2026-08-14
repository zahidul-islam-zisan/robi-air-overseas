import type {
  NavLink,
  ServiceItem,
  PackageItem,
  WhyUsItem,
  TrustItem,
  ContactInfoItem,
  LocalizedString,
} from "../types"

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: { bn: "হোম", en: "Home" } },
  { id: "about", label: { bn: "আমাদের সম্পর্কে", en: "About Us" } },
  { id: "services", label: { bn: "সেবাসমূহ", en: "Services" } },
  { id: "packages", label: { bn: "প্যাকেজ", en: "Packages" } },
  { id: "why-us", label: { bn: "কেন আমরা", en: "Why Choose Us" } },
  { id: "contact", label: { bn: "যোগাযোগ", en: "Contact" } },
]

export const TRUST_STRIP_ITEMS: TrustItem[] = [
  {
    iconName: "Plane",
    label: { bn: "এয়ার টিকেটিং", en: "Air Ticketing" },
    sub: { bn: "দেশ ও বিদেশ", en: "Domestic & Intl" },
    bgImg:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&auto=format",
  },
  {
    iconName: "Globe",
    label: { bn: "ভিসা প্রসেসিং", en: "Visa Processing" },
    sub: { bn: "ওয়ার্ক ও ট্যুরিস্ট", en: "Work & Tourist" },
    bgImg:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop&auto=format",
  },
  {
    iconName: "Mosque",
    label: { bn: "হজ ও উমরাহ", en: "Hajj & Umrah" },
    sub: { bn: "পবিত্র যাত্রার প্যাকেজ", en: "Pilgrimage Packages" },
    bgImg: "/images/kaaba_group.jpg",
  },
  {
    iconName: "Hotel",
    label: { bn: "হোটেল ও ট্যুর", en: "Hotel & Tour" },
    sub: { bn: "বিশ্বব্যাপী বুকিং", en: "Worldwide Booking" },
    bgImg:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&auto=format",
  },
]

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "air-ticketing",
    iconName: "Plane",
    title: { bn: "এয়ার টিকেটিং", en: "Air Ticketing" },
    desc: {
      bn: "দেশ-বিদেশের সকল রুটে পেশাদার ফ্লাইট টিকেট বুকিং ও ভ্রমণ সহায়তা।",
      en: "Professional flight ticket booking and travel assistance for domestic and international routes.",
    },
  },
  {
    id: "work-visa",
    iconName: "Briefcase",
    title: { bn: "ওয়ার্ক ভিসা প্রসেসিং", en: "Work Visa Processing" },
    desc: {
      bn: "বিদেশে কর্মসংস্থানের জন্য ভিসা প্রক্রিয়াকরণ ও প্রয়োজনীয় কাগজপত্রে সহায়তা।",
      en: "Support for overseas employment visa processing and required documentation.",
    },
  },
  {
    id: "bmet-services",
    iconName: "Worker",
    title: { bn: "BMET সেবা", en: "BMET Services" },
    desc: {
      bn: "বিএমইটি রেজিস্ট্রেশন ও বিদেশগামী কর্মসংস্থান প্রক্রিয়ায় পূর্ণ সহযোগিতা।",
      en: "Complete assistance with BMET registration and overseas employment procedures.",
    },
  },
  {
    id: "tourist-visa",
    iconName: "Visa",
    title: { bn: "ট্যুরিস্ট ভিসা", en: "Tourist Visa" },
    desc: {
      bn: "আন্তর্জাতিক ভ্রমণকারীদের জন্য ট্যুরিস্ট ভিসা প্রক্রিয়াকরণ সেবা।",
      en: "Visa processing assistance for international travelers and tourists around the globe.",
    },
  },
  {
    id: "umrah-packages",
    iconName: "Mosque",
    title: { bn: "উমরাহ প্যাকেজ", en: "Umrah Packages" },
    desc: {
      bn: "সারা বছর উমরাহ পালনের জন্য সুসংগঠিত প্যাকেজ ও পূর্ণ সহায়তা।",
      en: "Organized Umrah packages with end-to-end travel and religious support year-round.",
    },
  },
  {
    id: "hajj-packages",
    iconName: "Mosque",
    title: { bn: "হজ প্যাকেজ", en: "Hajj Packages" },
    desc: {
      bn: "পবিত্র হজ পালনের জন্য নির্ভরযোগ্য প্যাকেজ ও আন্তরিক সেবা।",
      en: "Reliable Hajj packages designed to provide a smooth and peaceful pilgrimage journey.",
    },
  },
  {
    id: "tour-packages",
    iconName: "Tour",
    title: { bn: "ট্যুর প্যাকেজ", en: "Tour Packages" },
    desc: {
      bn: "দেশ ও বিদেশের বিভিন্ন গন্তব্যে আকর্ষণীয় ট্যুর প্যাকেজ।",
      en: "Attractive domestic and international tour packages for family and corporate travel.",
    },
  },
  {
    id: "hotel-booking",
    iconName: "Hotel",
    title: { bn: "হোটেল বুকিং", en: "Hotel Booking" },
    desc: {
      bn: "ব্যবসায়িক ও অবকাশ ভ্রমণকারীদের জন্য বিশ্বব্যাপী হোটেল রিজার্ভেশন সহায়তা।",
      en: "Worldwide hotel reservation assistance for leisure and corporate travelers.",
    },
  },
  {
    id: "b2b-agency",
    iconName: "Handshake",
    title: { bn: "B2B এজেন্সি", en: "B2B Agency" },
    desc: {
      bn: "ট্রাভেল এজেন্সিগুলোর জন্য পেশাদার B2B সেবা ও পার্টনারশিপের সুযোগ।",
      en: "Professional B2B travel solutions and partnership opportunities for agencies.",
    },
  },
]

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: "hajj-pkg",
    title: { bn: "হজ প্যাকেজ", en: "Hajj Packages" },
    subtitle: { bn: "পবিত্র হজ যাত্রা", en: "Holy Hajj Journey" },
    img: "/images/kaaba_group.jpg",
    alt: { bn: "মক্কায় কাবা শরীফ", en: "Holy Kaaba in Makkah" },
    cta: { bn: "প্যাকেজের বিস্তারিত জানুন", en: "Get Package Details" },
    badge: { bn: "হজ", en: "Hajj" },
  },
  {
    id: "umrah-pkg",
    title: { bn: "উমরাহ প্যাকেজ", en: "Umrah Packages" },
    subtitle: { bn: "সারা বছর উমরাহ", en: "Year-Round Umrah" },
    img: "https://images.unsplash.com/photo-1771170983433-1576bc4a7eec?w=600&h=400&fit=crop&auto=format",
    alt: { bn: "রাতের আলোয় কাবা শরীফ", en: "Kaaba illuminated at night" },
    cta: { bn: "প্যাকেজের বিস্তারিত জানুন", en: "Get Package Details" },
    badge: { bn: "উমরাহ", en: "Umrah" },
  },
  {
    id: "tour-pkg",
    title: { bn: "ট্যুর প্যাকেজ", en: "Tour Packages" },
    subtitle: { bn: "আন্তর্জাতিক গন্তব্য", en: "International Destinations" },
    img: "https://images.unsplash.com/photo-1776521587569-f84b4ff92600?w=600&h=400&fit=crop&auto=format",
    alt: { bn: "আন্তর্জাতিক শহরের দৃশ্য", en: "International skyline view" },
    cta: { bn: "প্যাকেজ দেখুন", en: "Explore Packages" },
    badge: { bn: "ট্যুর", en: "Tour" },
  },
]

export const WHY_US_DATA: WhyUsItem[] = [
  {
    id: "trusted",
    iconName: "Shield",
    title: { bn: "বিশ্বস্ত ও নির্ভরযোগ্য সেবা", en: "Trusted & Reliable Service" },
    desc: {
      bn: "আমরা প্রতিটি গ্রাহকের প্রতি সততা ও দায়িত্বশীলতার সাথে সেবা প্রদান করি।",
      en: "We provide honest, transparent, and responsible services for every client.",
    },
  },
  {
    id: "team",
    iconName: "Users",
    title: { bn: "অভিজ্ঞ পেশাদার দল", en: "Experienced Team" },
    desc: {
      bn: "ভিসা, টিকেটিং ও বিদেশ সেবায় অভিজ্ঞ একটি দক্ষ দল সর্বদা আপনার পাশে।",
      en: "A skilled team with years of expertise in visas, ticketing, and overseas support.",
    },
  },
  {
    id: "support",
    iconName: "Heart",
    title: { bn: "গ্রাহকমুখী সহায়তা", en: "Customer-Focused Support" },
    desc: {
      bn: "আপনার সন্তুষ্টিই আমাদের অগ্রাধিকার — আমরা আপনার কথা শুনি ও সমাধান দিই।",
      en: "Your satisfaction is our priority — we listen carefully and offer tailored solutions.",
    },
  },
  {
    id: "hassle-free",
    iconName: "Zap",
    title: { bn: "ঝামেলামুক্ত প্রক্রিয়া", en: "Hassle-Free Processing" },
    desc: {
      bn: "জটিল প্রশাসনিক প্রক্রিয়াগুলো সহজ করে আপনার যাত্রা শুরু করি স্বস্তিতে।",
      en: "Simplifying complex administrative documentation for a stress-free experience.",
    },
  },
  {
    id: "solutions",
    iconName: "Globe",
    title: { bn: "সম্পূর্ণ ভ্রমণ সমাধান", en: "Complete Travel Solutions" },
    desc: {
      bn: "টিকেটিং থেকে হজ প্যাকেজ পর্যন্ত সকল ভ্রমণ সেবা এক ছাদের নিচে।",
      en: "From air ticketing to pilgrimage packages, all travel needs under one roof.",
    },
  },
  {
    id: "dedicated",
    iconName: "Star",
    title: { bn: "ব্যক্তিগত সহায়তা", en: "Dedicated Assistance" },
    desc: {
      bn: "ভ্রমণ প্রক্রিয়ার প্রতিটি ধাপে আপনাকে ব্যক্তিগতভাবে গাইড করি।",
      en: "Personalized step-by-step guidance throughout your entire travel journey.",
    },
  },
]

export const OVERSEAS_FEATURES: {
  title: LocalizedString
  desc: LocalizedString
}[] = [
  {
    title: { bn: "ওয়ার্ক ভিসা প্রসেসিং", en: "Work Visa Processing" },
    desc: {
      bn: "কর্মসংস্থান ভিসা আবেদন ও কাগজপত্রে বিশেষজ্ঞ সহায়তা।",
      en: "Expert guidance for employment visa applications and document attestation.",
    },
  },
  {
    title: { bn: "BMET সহায়তা", en: "BMET Assistance" },
    desc: {
      bn: "বিএমইটি রেজিস্ট্রেশন ও বিদেশগামী ছাড়পত্রে পূর্ণ সহযোগিতা।",
      en: "Full clearance support for BMET registration and emigration formalities.",
    },
  },
  {
    title: { bn: "ট্যুরিস্ট ভিসা প্রসেসিং", en: "Tourist Visa Processing" },
    desc: {
      bn: "আন্তর্জাতিক ভ্রমণের জন্য সহজ ও দ্রুত ভিসা প্রক্রিয়াকরণ।",
      en: "Fast and reliable tourist visa application processing for international destinations.",
    },
  },
]

export const CONTACT_INFO_LIST: ContactInfoItem[] = [
  {
    iconName: "Phone",
    label: { bn: "ফোন", en: "Phone" },
    value: { bn: "+৮৮০ ১৮২৫-৬৭৯০৯৯", en: "+880 1825-679099" },
  },
  {
    iconName: "WhatsApp",
    label: { bn: "WhatsApp", en: "WhatsApp" },
    value: { bn: "+৮৮০ ১৯২৮-৮২৬৭৩৬", en: "+880 1928-826736" },
  },
  {
    iconName: "Mail",
    label: { bn: "ইমেইল", en: "Email" },
    value: { bn: "robiairoverseas@gmail.com", en: "robiairoverseas@gmail.com" },
  },
  {
    iconName: "MapPin",
    label: { bn: "অফিস ঠিকানা", en: "Office Address" },
    value: {
      bn: "ফকিরাপুল, মতিঝিল, ঢাকা, বাংলাদেশ",
      en: "Motijheel, Fakirapool, Dhaka, Bangladesh",
    },
  },
  {
    iconName: "Clock",
    label: { bn: "অফিস সময়", en: "Business Hours" },
    value: {
      bn: "শনি–বৃহঃ: সকাল ৯টা – সন্ধ্যা ৭টা",
      en: "Sat–Thu: 9:00 AM – 7:00 PM",
    },
  },
]

export const UI_TEXT = {
  header: {
    brandName: "Robi Air Overseas",
    tagline: { bn: "ট্রাভেল ও ওভারসিজ সেবা", en: "Travel & Overseas Services" },
    contactCta: { bn: "যোগাযোগ করুন", en: "Contact Us" },
  },
  hero: {
    badge: {
      bn: "ROBI AIR OVERSEAS-এ স্বাগতম",
      en: "WELCOME TO ROBI AIR OVERSEAS",
    },
    headlineLine1: { bn: "সঠিক অংশীদারের সাথে", en: "Your Journey Begins" },
    headlineLine2: { bn: "আপনার যাত্রা শুরু হোক।", en: "With the Right Partner." },
    subtext: {
      bn: "বাংলাদেশ থেকে বিশ্বের বিভিন্ন গন্তব্যে নির্ভরযোগ্য ভ্রমণ, ভিসা, বিদেশে কর্মসংস্থান ও হজ-উমরাহ সেবা।",
      en: "Reliable travel, visa processing, overseas employment, and pilgrimage services from Bangladesh to the world.",
    },
    primaryCta: { bn: "আমাদের সেবাসমূহ দেখুন", en: "Explore Our Services" },
    secondaryCta: { bn: "যোগাযোগ করুন", en: "Contact Us" },
  },
  about: {
    badge: { bn: "আমাদের সম্পর্কে", en: "ABOUT ROBI AIR OVERSEAS" },
    title: {
      bn: "আপনার ভ্রমণ ও বিদেশ যাত্রাকে করি আরও সহজ",
      en: "Making Your Travel & Overseas Journey Easier",
    },
    desc: {
      bn: "Robi Air Overseas বাংলাদেশ থেকে আন্তর্জাতিক ভ্রমণ, ভিসা প্রক্রিয়াকরণ, বিদেশে কর্মসংস্থান ও হজ-উমরাহ সম্পর্কিত পেশাদার সেবা প্রদান করে। আমাদের লক্ষ্য আপনার যাত্রাকে নিরাপদ, সহজ ও স্বস্তিদায়ক করা।",
      en: "Robi Air Overseas provides professional travel, visa processing, overseas employment, and pilgrimage services designed to make international travel and overseas opportunities easier for our clients.",
    },
    trustPoints: [
      { bn: "পেশাদার সহায়তা", en: "Professional Support" },
      { bn: "নির্ভরযোগ্য সেবা", en: "Reliable Service" },
      { bn: "গ্রাহককেন্দ্রিক দৃষ্টিভঙ্গি", en: "Customer-Focused Approach" },
    ],
    cardBadgeTitle: { bn: "বিশ্বস্ত এজেন্সি", en: "Trusted Agency" },
    cardBadgeSub: { bn: "বাংলাদেশ ভিত্তিক", en: "Based in Bangladesh" },
    cta: { bn: "যোগাযোগ করুন", en: "Contact Us" },
  },
  services: {
    badge: { bn: "আমাদের সেবাসমূহ", en: "OUR SERVICES" },
    title: {
      bn: "সম্পূর্ণ ভ্রমণ ও বিদেশ সেবা",
      en: "Complete Travel & Overseas Solutions",
    },
    subtitle: {
      bn: "আপনার যাত্রা, কাগজপত্র ও বিদেশ ভ্রমণের সকল সহায়তা এক জায়গায়।",
      en: "Everything you need for your journey, documentation, and overseas travel support.",
    },
    contactBtn: { bn: "যোগাযোগ করুন", en: "Contact Us" },
  },
  packages: {
    badge: { bn: "ফিচার্ড প্যাকেজ", en: "FEATURED PACKAGES" },
    title: {
      bn: "আমাদের ভ্রমণ প্যাকেজসমূহ দেখুন",
      en: "Explore Our Travel Packages",
    },
    note: {
      bn: "প্যাকেজ বিস্তারিত ও কাস্টম ইটিনারেরির জন্য আমাদের সাথে যোগাযোগ করুন।",
      en: "Contact us for package details and custom itineraries.",
    },
    viewAllCta: { bn: "সকল সেবা দেখুন", en: "View All Services" },
  },
  overseas: {
    badge: { bn: "বিদেশ সেবাসমূহ", en: "OVERSEAS SERVICES" },
    title: {
      bn: "আপনার বিদেশ যাত্রায় প্রতিটি ধাপে আমরা আপনার পাশে।",
      en: "Your Overseas Journey, Supported at Every Step.",
    },
    desc: {
      bn: "Robi Air Overseas বিদেশে কর্মসংস্থান ও ভ্রমণ সংক্রান্ত ভিসা সেবায় গ্রাহকদের পূর্ণ সহায়তা প্রদান করে। কাগজপত্র প্রস্তুতি থেকে প্রক্রিয়া সম্পন্ন করা পর্যন্ত আমরা আপনার সাথে আছি।",
      en: "Robi Air Overseas assists clients with work visa processing, BMET services, and tourist visa applications with dedicated end-to-end guidance.",
    },
    cta: { bn: "আমাদের টিমের সাথে কথা বলুন", en: "Contact Our Team" },
  },
  whyUs: {
    badge: { bn: "কেন আমাদের বেছে নেবেন", en: "WHY ROBI AIR OVERSEAS" },
    title: { bn: "আস্থার সাথে ভ্রমণ করুন", en: "Travel With Confidence" },
  },
  b2b: {
    badge: { bn: "B2B পার্টনারশিপ", en: "B2B PARTNERSHIP" },
    headlineLine1: {
      bn: "Robi Air Overseas-এর সাথে",
      en: "Grow Your Business With",
    },
    headlineLine2: { bn: "আপনার ব্যবসা বাড়ান", en: "Robi Air Overseas" },
    desc: {
      bn: "আমরা ট্রাভেল এজেন্সি ও ব্যবসায়িক অংশীদারদের সাথে পেশাদার B2B ভ্রমণ ও বিদেশ সেবা সমাধান নিয়ে কাজ করি।",
      en: "We collaborate with travel agencies and business partners to provide professional B2B travel and overseas service solutions.",
    },
    primaryCta: { bn: "B2B পার্টনার হতে যোগাযোগ করুন", en: "Become a B2B Partner" },
    secondaryCta: { bn: "যোগাযোগ করুন", en: "Contact Us" },
  },
  contact: {
    badge: { bn: "যোগাযোগ করুন", en: "CONTACT US" },
    title: { bn: "আপনার যাত্রা পরিকল্পনা করি একসাথে", en: "Let's Plan Your Journey" },
    subtitle: {
      bn: "আমাদের সেবা সম্পর্কে কোনো প্রশ্ন আছে? আপনার প্রয়োজনীয়তা জানান, আমাদের দল আপনার সাথে যোগাযোগ করবে।",
      en: "Have questions about our services? Send us your requirements and our team will respond shortly.",
    },
    formTitle: { bn: "ইনকুয়ারি পাঠান", en: "Send Inquiry" },
    labels: {
      name: { bn: "পূর্ণ নাম", en: "Full Name" },
      namePlaceholder: { bn: "আপনার পূর্ণ নাম", en: "Your full name" },
      phone: { bn: "ফোন নম্বর", en: "Phone Number" },
      phonePlaceholder: { bn: "+৮৮০ ১xxx-xxxxxx", en: "+880 1xxx-xxxxxx" },
      email: { bn: "ইমেইল ঠিকানা", en: "Email Address" },
      emailPlaceholder: { bn: "আপনার@ইমেইল.com", en: "your@email.com" },
      service: { bn: "আগ্রহী সেবা", en: "Interested Service" },
      serviceSelectPlaceholder: {
        bn: "একটি সেবা বেছে নিন",
        en: "Select a service",
      },
      message: { bn: "বার্তা", en: "Message" },
      messagePlaceholder: {
        bn: "আপনার ভ্রমণ প্রয়োজনীয়তা সম্পর্কে জানান...",
        en: "Tell us about your travel requirements...",
      },
      submit: { bn: "জিজ্ঞাসা পাঠান", en: "Send Inquiry" },
      submitting: { bn: "পাঠানো হচ্ছে...", en: "Sending..." },
    },
    successMsg: {
      bn: "ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।",
      en: "Thank you! Your inquiry has been sent. We will contact you soon.",
    },
    mapLabel: {
      bn: "ফকিরাপুল, মতিঝিল, ঢাকা, বাংলাদেশ",
      en: "Motijheel, Fakirapool, Dhaka, Bangladesh",
    },
    mapSub: { bn: "Google Maps-এ দেখুন", en: "View on Google Maps" },
  },
  footer: {
    desc: {
      bn: "বাংলাদেশ থেকে ভ্রমণ, ভিসা প্রক্রিয়াকরণ, বিদেশে কর্মসংস্থান ও হজ-উমরাহ সেবায় আপনার বিশ্বস্ত সঙ্গী।",
      en: "Your trusted partner for travel, visa processing, overseas employment, and pilgrimage services from Bangladesh.",
    },
    quickLinksHeader: { bn: "দ্রুত লিঙ্ক", en: "Quick Links" },
    servicesHeader: { bn: "আমাদের সেবা", en: "Our Services" },
    contactHeader: { bn: "যোগাযোগ", en: "Contact" },
    whatsappNotice: { bn: "WhatsApp সুবিধা উপলব্ধ", en: "WhatsApp available" },
    copyright: {
      bn: "© ২০২৬ Robi Air Overseas। সকল স্বত্ব সংরক্ষিত।",
      en: "© 2026 Robi Air Overseas. All Rights Reserved.",
    },
    taglineBottom: {
      bn: "ট্রাভেল ও ওভারসিজ সেবা — বাংলাদেশ",
      en: "Travel & Overseas Services — Bangladesh",
    },
  },
}
