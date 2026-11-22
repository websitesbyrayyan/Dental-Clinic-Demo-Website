import type { ReactNode } from "react";

/* ========================================
   WEEKLY OPENING HOURS
======================================== */

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type DayHours =
  | {
      open: string;
      close: string;
    }
  | {
      closed: true;
    };

/**
 * ClinicHours contains the weekly schedule only.
 * The timezone belongs to ClinicConfig.
 */
export type ClinicHours = Record<Weekday, DayHours>;

/* ========================================
   CLINIC DETAILS
======================================== */

export interface ClinicAddress {
  streetAddress: string;
  area: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

/* ========================================
   NAVIGATION
======================================== */

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavDropdownChild {
  label: string;
  href: string;
  description: string;
}

export interface NavDropdownItem {
  label: string;
  description?: string;
  children: NavDropdownChild[];
}

export type NavItem = NavLinkItem | NavDropdownItem;

/* ========================================
   IMAGES
======================================== */

export interface ClinicImage {
  src: string;
  alt: string;
  searchHint: string;
  width: number;
  height: number;
}

export interface ClinicImages {
  heroMain: ClinicImage;
  heroSecondary: ClinicImage;
  about: ClinicImage;
  team1: ClinicImage;
  team2: ClinicImage;
  team3: ClinicImage;
  tourReception: ClinicImage;
  tourConsultation: ClinicImage;
  tourTreatment: ClinicImage;
  tourSterilisation: ClinicImage;
}

export type ImageKey = keyof ClinicImages;

/* ========================================
   TREATMENTS AND ICONS
======================================== */

export type TreatmentIconName =
  | "checkup"
  | "whitening"
  | "implant"
  | "aligners"
  | "braces"
  | "root-canal"
  | "veneer"
  | "children";

export interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: TreatmentIconName;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
}

export type PillarIconName =
  | "expertise"
  | "technology"
  | "comfort"
  | "transparency";

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: PillarIconName;
}

export interface SampleStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sample: true;
}

/* ========================================
   PAGE SECTION CONTENT
======================================== */

export interface SampleBannerContent {
  prefix: string;
  studioNamePlaceholder: string;
  notice: string;
  whatsappLabel: string;
  whatsappAriaLabel: string;
  whatsappMessage: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  supportingText: string;
  primaryCta: string;
  secondaryCta: string;
  mainImage: ImageKey;
  secondaryImage: ImageKey;
  liveCardTitle: string;
  openNowLabel: string;
  closedNowLabel: string;
  closesAtLabel: string;
  gentleCareTitle: string;
  trustItems: string[];
}

export interface IntroContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  image: ImageKey;
  principles: Principle[];
}

export interface ServicesContent {
  eyebrow: string;
  heading: string;
  description: string;
  items: Treatment[];
  marqueeLabel: string;
  marqueeItems: string[];
  askAboutLabel: string;
}

export interface WhyChooseUsContent {
  eyebrow: string;
  heading: string;
  description: string;
  pillars: Pillar[];
  stats: SampleStat[];
  sampleLabel: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  eyebrow: string;
  heading: string;
  description: string;
  steps: ProcessStep[];
}

export interface TeamMember {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: ImageKey;
}

export interface TeamContent {
  eyebrow: string;
  heading: string;
  description: string;
  members: TeamMember[];
}

/* ========================================
   VIRTUAL TOUR
======================================== */

export interface TourRoom {
  id: string;
  label: string;
  title: string;
  image: ImageKey;
  caption: string;
  highlights: [string, string];
}

/**
 * Content used by the reusable accessible Tabs component.
 */
export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TourContent {
  eyebrow: string;
  heading: string;
  intro: string;
  sampleLabel: string;
  tourUrl?: string;
  rooms: TourRoom[];
}

/* ========================================
   TESTIMONIALS
======================================== */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
  sampleLabel: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  heading: string;
  featured: Testimonial;
  items: Testimonial[];
}

/* ========================================
   BLOG
======================================== */

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  summary: string;
  sampleContent: string;
  sampleLabel: string;
}

export interface BlogContent {
  eyebrow: string;
  heading: string;
  description: string;
  posts: BlogPost[];
  readMoreLabel: string;
  readLessLabel: string;
}

/* ========================================
   FAQ
======================================== */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  eyebrow: string;
  heading: string;
  description: string;
  items: FAQItem[];
}

/* ========================================
   SOCIAL LINKS
======================================== */

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  ariaLabel: string;
  href: string | null;
}

/* ========================================
   BOOKING FORM
======================================== */

export type BookingTimeWindow =
  | "Morning"
  | "Afternoon"
  | "Evening";

export interface BookingTimeOption {
  value: BookingTimeWindow;
  label: string;
}

export interface BookingFormValues {
  fullName: string;
  mobileNumber: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: BookingTimeWindow | "";
  message: string;
}

export type BookingFieldErrors = Partial<
  Record<keyof BookingFormValues, string>
>;

export interface BookingFieldCopy {
  label: string;
  placeholder: string;
  hint?: string;
}

export interface BookingFieldsContent {
  fullName: BookingFieldCopy;
  mobileNumber: BookingFieldCopy;
  email: BookingFieldCopy;
  treatment: BookingFieldCopy;
  preferredDate: BookingFieldCopy;
  preferredTime: BookingFieldCopy;
  message: BookingFieldCopy;
}

export interface BookingContent {
  eyebrow: string;
  heading: string;
  description: string;
  formTitle: string;
  detailsTitle: string;
  openingHoursTitle: string;
  directionsLabel: string;
  directionsAriaLabel: string;
  submitLabel: string;
  footnote: string;
  successMessage: string;
  openNowLabel: string;
  closedNowLabel: string;
  closedTodayLabel: string;
  fields: BookingFieldsContent;
  timeWindows: BookingTimeOption[];
}

/* ========================================
   SEO
======================================== */

export interface SEOContent {
  title: string;
  description: string;
}

/* ========================================
   REUSABLE UI TYPES
======================================== */

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

/* ========================================
   COMPLETE CLINIC CONFIGURATION
======================================== */

export interface ClinicConfig {
  name: string;
  tagline: string;
  /** True while the clinic details, team and patient content are illustrative. */
  isSample: boolean;

  timeZone: string;

  phone: string;
  whatsappNumber: string;
  email: string;

  address: ClinicAddress;
  hours: ClinicHours;

  socialLinks: SocialLink[];
  nav: NavItem[];

  banner: SampleBannerContent;
  hero: HeroContent;
  intro: IntroContent;
  services: ServicesContent;
  whyChooseUs: WhyChooseUsContent;
  process: ProcessContent;
  team: TeamContent;
  tour: TourContent;
  testimonials: TestimonialsContent;
  blog: BlogContent;
  faqs: FAQContent;

  images: ClinicImages;

  booking: BookingContent;
  seo: SEOContent;
}