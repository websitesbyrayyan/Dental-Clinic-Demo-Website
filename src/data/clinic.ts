import type { ClinicConfig } from "../types/clinic";

import { buildWhatsAppUrl } from "../lib/whatsapp";

const whatsappNumber = "923261819693";

export const clinic: ClinicConfig = {
  /* ========================================
     GENERAL INFORMATION
  ======================================== */

  name: "Sagewood Dental Studio",

  tagline: "Calm, considered dental care.",

  isSample: true,

  timeZone: "Asia/Karachi",

  phone: "+92 300 0000000",

  whatsappNumber,

  email: "hello@example.com",

  address: {
    streetAddress: "Suite 00, Example Avenue",
    area: "Gulberg III",
    city: "Lahore",
    region: "Punjab",
    postalCode: "00000",
    country: "Pakistan",
    countryCode: "PK",
  },

  /* ========================================
     WEEKLY OPENING HOURS
  ======================================== */

  hours: {
  Monday: {
    open: "10:00",
    close: "20:00",
  },

  Tuesday: {
    open: "10:00",
    close: "20:00",
  },

  Wednesday: {
    open: "10:00",
    close: "20:00",
  },

  Thursday: {
    open: "10:00",
    close: "20:00",
  },

  Friday: {
    open: "10:00",
    close: "20:00",
  },

  Saturday: {
    open: "10:00",
    close: "20:00",
  },

  Sunday: {
    closed: true,
  },
},
  /* ========================================
     NAVIGATION
  ======================================== */

  nav: [
    {
      label: "Services",
      href: "#services",
    },

    {
      label: "About",
      description: "Get to know the practice.",
      children: [
        {
          label: "About us",
          href: "#about",
          description: "Our story and approach",
        },
        {
          label: "Meet our team",
          href: "#team",
          description: "The dentists who will treat you",
        },
        {
          label: "Virtual tour",
          href: "#virtual-tour",
          description: "See the clinic before you visit",
        },
      ],
    },

    {
      label: "Testimonials",
      href: "#testimonials",
    },

    {
      label: "Blog",
      href: "#blog",
    },

    {
      label: "Contact",
      href: "#contact",
    },
  ],

  /* ========================================
     SAMPLE BANNER
  ======================================== */

  banner: {
    prefix: "Concept design by",

    studioNamePlaceholder: "WebsitesByRayyan",

    notice:
      "This is a sample website concept for illustrative purposes only. The clinic, team and content shown are not real.",

    whatsappLabel: "Discuss this concept",

    whatsappAriaLabel:
      "Chat on WhatsApp, opens in a new tab",

    whatsappMessage:
      "Hello, I would like to enquire about this dental website concept.",
  },

  /* ========================================
     HERO
  ======================================== */

  hero: {
    eyebrow: "THOUGHTFUL DENTAL CARE IN LAHORE",

    heading:
      "Calm, considered dental care in the heart of Lahore.",

    supportingText:
      "A welcoming approach to dentistry, where thoughtful conversations, clear treatment plans and patient comfort come first.",

    primaryCta: "Book an appointment",

    secondaryCta: "Explore treatments",

    mainImage: "heroMain",

    secondaryImage: "heroSecondary",

    liveCardTitle: "Clinic availability",

    openNowLabel: "Open now",

    closedNowLabel: "Closed",

    closesAtLabel: "Closes at",

    gentleCareTitle: "Gentle, pain-conscious care",

    trustItems: [
      "Digital X-rays",
      "Strict sterilisation",
      "Same-day emergency slots",
      "Clear treatment plans",
    ],
  },

  /* ========================================
     ABOUT / INTRODUCTION
  ======================================== */

  intro: {
    eyebrow: "A MORE THOUGHTFUL APPROACH",

    heading: "A practice built around you.",

    paragraph:
      "Visiting the dentist should feel straightforward and reassuring. Our concept brings together attentive communication, considered treatment planning and a welcoming environment, so every patient feels heard and understood.",

    image: "about",

    principles: [
      {
        id: "listen-first",
        title: "Listen first",
        description:
          "Understand your concerns, priorities and expectations before discussing treatment.",
      },

      {
        id: "explain-clearly",
        title: "Explain clearly",
        description:
          "Make treatment options easier to understand with straightforward conversations.",
      },

      {
        id: "treat-gently",
        title: "Treat gently",
        description:
          "Create a supportive experience that puts comfort and reassurance first.",
      },
    ],
  },

  /* ========================================
     SERVICES
  ======================================== */

  services: {
    eyebrow: "PERSONALISED DENTAL CARE",

    heading: "Care for every smile.",

    description:
      "Explore a considered range of general, restorative and cosmetic dental treatments.",

    askAboutLabel: "Ask about this",

    items: [
      {
        id: "general-checkups",
        title: "General check-ups and cleaning",
        description:
          "Routine examinations and professional cleaning to support everyday oral health.",
        icon: "checkup",
      },

      {
        id: "teeth-whitening",
        title: "Teeth whitening",
        description:
          "Explore professional whitening options designed around your smile.",
        icon: "whitening",
      },

      {
        id: "dental-implants",
        title: "Dental implants",
        description:
          "Discuss implant-supported options for replacing missing teeth.",
        icon: "implant",
      },

      {
        id: "clear-aligners",
        title: "Clear aligners",
        description:
          "A discreet orthodontic option for suitable alignment concerns.",
        icon: "aligners",
      },

      {
        id: "braces-orthodontics",
        title: "Braces and orthodontics",
        description:
          "Explore treatment options for improving tooth alignment and bite.",
        icon: "braces",
      },

      {
        id: "root-canal",
        title: "Root canal treatment",
        description:
          "Treatment planning focused on addressing problems within a tooth.",
        icon: "root-canal",
      },

      {
        id: "cosmetic-veneers",
        title: "Cosmetic veneers",
        description:
          "Discuss cosmetic options for changing the appearance of your smile.",
        icon: "veneer",
      },

      {
        id: "childrens-dentistry",
        title: "Children's dentistry",
        description:
          "A welcoming approach to children's dental visits and preventive care.",
        icon: "children",
      },
    ],

    marqueeLabel: "Explore our approach to dental care",

    marqueeItems: [
      "Preventive care",
      "Smile restoration",
      "Cosmetic dentistry",
      "Family dentistry",
      "Orthodontics",
      "Patient comfort",
    ],
  },

  /* ========================================
     WHY CHOOSE US
  ======================================== */

  whyChooseUs: {
    eyebrow: "THE SAGEWOOD APPROACH",

    heading: "Thoughtful care, at every step.",

    description:
      "A considered dental experience is built on more than treatment alone. It begins with listening, explaining and making patients feel comfortable.",

    pillars: [
      {
        id: "expertise",
        title: "Expertise",
        description:
          "Thoughtful assessment and treatment planning based on individual needs.",
        icon: "expertise",
      },

      {
        id: "technology",
        title: "Technology",
        description:
          "Modern dental technology presented as part of a considered care experience.",
        icon: "technology",
      },

      {
        id: "patient-comfort",
        title: "Patient comfort",
        description:
          "A welcoming environment and attentive communication throughout your visit.",
        icon: "comfort",
      },

      {
        id: "transparent-care",
        title: "Transparent care",
        description:
          "Clear explanations of suggested treatments, options and estimates.",
        icon: "transparency",
      },
    ],

    sampleLabel: "Sample figure",

    stats: [
      {
        id: "care-principles",
        value: 3,
        suffix: "",
        label: "Guiding care principles",
        sample: true,
      },

      {
        id: "care-pillars",
        value: 4,
        suffix: "",
        label: "Pillars of our approach",
        sample: true,
      },

      {
        id: "treatment-options",
        value: 8,
        suffix: "+",
        label: "Featured treatment categories",
        sample: true,
      },

      {
        id: "patient-first",
        value: 1,
        suffix: "",
        label: "Patient-first approach",
        sample: true,
      },
    ],
  },

  /* ========================================
     YOUR VISIT / PROCESS
  ======================================== */

  process: {
    eyebrow: "YOUR VISIT",

    heading: "A clear path from hello to aftercare.",

    description:
      "A straightforward visit, with clear communication at every stage.",

    steps: [
      {
        id: "book",
        number: "01",
        title: "Book",
        description:
          "Contact the clinic and request a suitable appointment time.",
      },

      {
        id: "consultation",
        number: "02",
        title: "Consultation",
        description:
          "Discuss your concerns and understand the available treatment options.",
      },

      {
        id: "treatment",
        number: "03",
        title: "Treatment",
        description:
          "Proceed with an agreed treatment plan at a pace that feels appropriate.",
      },

      {
        id: "aftercare",
        number: "04",
        title: "Aftercare",
        description:
          "Receive guidance about looking after your oral health after treatment.",
      },
    ],
  },

  /* ========================================
     TEAM
  ======================================== */

  team: {
    eyebrow: "MEET THE TEAM",

    heading: "People behind your care.",

    description:
      "Illustrative team profiles for this sample concept. The people shown are stock-photo subjects, not confirmed Sagewood clinicians.",

    members: [
      {
        id: "dentist-1",
        name: "Dr. Ayesha K.",
        specialty: "General and preventive dentistry",
        bio:
          "A sample team profile illustrating a warm, patient-centred approach to general dental care.",
        image: "team1",
      },

      {
        id: "dentist-2",
        name: "Dr. Hamza R.",
        specialty: "Restorative and cosmetic dentistry",
        bio:
          "A sample team profile focused on clear treatment conversations and considered restorative care.",
        image: "team2",
      },

      {
        id: "dentist-3",
        name: "Dr. Sara M.",
        specialty: "Family and children's dentistry",
        bio:
          "A sample team profile illustrating a welcoming approach to family dental visits.",
        image: "team3",
      },
    ],
  },

  /* ========================================
     VIRTUAL TOUR
  ======================================== */

  tour: {
    eyebrow: "EXPLORE THE SPACE",

    heading: "Take a look inside.",

    intro:
      "Explore illustrative stock photography showing the kinds of spaces found in a calm, contemporary dental practice.",

    sampleLabel: "Photo tour (sample images)",

    tourUrl: "",

    rooms: [
      {
        id: "reception",
        label: "Reception",
        title: "A welcoming first impression",
        image: "tourReception",
        caption:
          "A considered reception space designed to feel welcoming from the moment you arrive.",
        highlights: [
          "Comfortable patient seating",
          "A warm and uncluttered welcome area",
        ],
      },

      {
        id: "consultation",
        label: "Consultation room",
        title: "Space for a conversation",
        image: "tourConsultation",
        caption:
          "A quiet consultation space for discussing concerns and treatment options.",
        highlights: [
          "Private patient discussions",
          "Clear treatment explanations",
        ],
      },

      {
        id: "treatment",
        label: "Treatment room",
        title: "A considered clinical environment",
        image: "tourTreatment",
        caption:
          "A contemporary treatment environment with professional dental equipment.",
        highlights: [
          "Modern dental equipment",
          "An organised clinical workspace",
        ],
      },

      {
        id: "sterilisation",
        label: "Sterilisation area",
        title: "Attention to clinical hygiene",
        image: "tourSterilisation",
        caption:
          "Illustrative stock photography of organised dental instrument storage; replace with the clinic’s own sterilisation-area photograph.",
        highlights: [
          "Dedicated sterilisation workspace",
          "Organised instrument handling",
        ],
      },
    ],
  },

  /* ========================================
     TESTIMONIALS
  ======================================== */

  testimonials: {
    eyebrow: "PATIENT EXPERIENCES",

    heading: "Words that matter.",

    featured: {
      id: "featured-testimonial",
      quote:
        "The experience felt calm and welcoming. Everything was explained clearly, which made the visit feel much more comfortable.",
      name: "Ayesha S.",
      context: "Sample patient experience",
      sampleLabel: "Sample testimonial",
    },

    items: [
      {
        id: "testimonial-1",
        quote:
          "The explanations were easy to follow and I felt comfortable asking questions.",
        name: "Hamza A.",
        context: "Sample patient experience",
        sampleLabel: "Sample testimonial",
      },

      {
        id: "testimonial-2",
        quote:
          "I appreciated the time taken to explain the different treatment options.",
        name: "Fatima R.",
        context: "Sample patient experience",
        sampleLabel: "Sample testimonial",
      },

      {
        id: "testimonial-3",
        quote:
          "A welcoming experience from the first conversation to the end of the visit.",
        name: "Ali M.",
        context: "Sample patient experience",
        sampleLabel: "Sample testimonial",
      },
    ],
  },

  /* ========================================
     BLOG
  ======================================== */

  blog: {
    eyebrow: "THE JOURNAL",

    heading: "From our journal.",

    description:
      "Sample educational articles covering everyday dental care and common patient questions.",

    readMoreLabel: "Read more",

    readLessLabel: "Read less",

    posts: [
      {
        id: "first-checkup",
        category: "Dental visits",
        title: "What to expect at your first check-up",
        summary:
          "A simple guide to understanding what happens during a routine dental appointment.",
        sampleContent:
          "Your first dental check-up typically begins with a conversation about your oral health and any concerns you may have. The dentist may examine your teeth and gums, discuss findings and explain whether any further treatment or preventive care is appropriate. The aim is to help you understand your options and feel comfortable asking questions.",
        sampleLabel: "Sample article",
      },

      {
        id: "ramadan-oral-care",
        category: "Everyday care",
        title: "Caring for your teeth through Ramadan",
        summary:
          "Practical considerations for maintaining an oral care routine during Ramadan.",
        sampleContent:
          "Maintaining a consistent oral hygiene routine is important throughout Ramadan. Brush twice daily with fluoride toothpaste, clean between your teeth and pay attention to hydration between Iftar and Suhoor. Your dentist can help discuss any oral health concerns and suggest an appropriate routine.",
        sampleLabel: "Sample article",
      },

      {
        id: "teeth-whitening",
        category: "Cosmetic dentistry",
        title: "Is teeth whitening right for you?",
        summary:
          "Understand the factors to consider before exploring professional teeth whitening.",
        sampleContent:
          "Teeth whitening may be suitable for some people, but the outcome depends on the cause of tooth discolouration and the condition of your teeth and gums. A dental assessment can help establish whether whitening is appropriate and explain the available options, limitations and potential sensitivities.",
        sampleLabel: "Sample article",
      },
    ],
  },

  /* ========================================
     FAQ
  ======================================== */

  faqs: {
    eyebrow: "GOOD TO KNOW",

    heading: "Questions, answered.",

    description:
      "A few helpful answers to common questions about visiting the clinic.",

    items: [
      {
        id: "first-visit",
        question: "What should I expect at my first visit?",
        answer:
          "Your first visit can begin with a discussion about your dental history, concerns and expectations. The dentist can then assess your needs and explain any suggested next steps.",
      },

      {
        id: "cost-estimates",
        question: "How much will my treatment cost?",
        answer:
          "Treatment costs depend on your individual needs and the options available. Ask the clinic for an assessment and a clear estimate before proceeding.",
      },

      {
        id: "anxious-patients",
        question: "What if I feel anxious about dental treatment?",
        answer:
          "Let the clinic know about your concerns before your appointment. The team can discuss your preferences, explain each stage and consider ways to make the experience more comfortable.",
      },

      {
        id: "emergency",
        question: "What should I do in a dental emergency?",
        answer:
          "Contact the clinic as soon as possible to explain your symptoms and ask about the next available appointment. For serious facial injuries or difficulty breathing or swallowing, seek emergency medical care.",
      },

      {
        id: "children",
        question: "Do you see children?",
        answer:
          "Children's dentistry is included in this sample clinic's treatment offering. Contact the clinic to discuss your child's age, needs and appointment requirements.",
      },

      {
        id: "payment",
        question: "Which payment methods do you accept?",
        answer:
          "Payment options should be confirmed directly with the clinic before your appointment. The available methods can be added here once the clinic owner provides the details.",
      },
    ],
  },

  /* ========================================
     SOCIAL LINKS
  ======================================== */

  socialLinks: [
    {
      platform: "instagram",
      label: "Instagram",
      ariaLabel: "Open Instagram, opens in a new tab",
      href: null,
    },

    {
      platform: "facebook",
      label: "Facebook",
      ariaLabel: "Open Facebook, opens in a new tab",
      href: null,
    },

    {
      platform: "whatsapp",
      label: "WhatsApp",
      ariaLabel: "Chat on WhatsApp, opens in a new tab",
      href: buildWhatsAppUrl(
        whatsappNumber,
        "Hello, I would like to contact Sagewood Dental Studio.",
      ),
    },
  ],

  /* ========================================
     IMAGES
  ======================================== */

  images: {
    heroMain: {
      src: "/images/hero-main.jpg",
      alt: "Illustrative stock photograph of a dentist speaking with a patient during an appointment",
      searchHint:
        "Pexels 5355890 dentist patient appointment",
      width: 1400,
      height: 1600,
    },

    heroSecondary: {
      src: "/images/hero-secondary.jpg",
      alt: "Illustrative stock photograph of a bright modern dentist office and treatment chair",
      searchHint:
        "Pexels 7422520 modern dentist office interior",
      width: 900,
      height: 1100,
    },

    about: {
      src: "/images/about.jpg",
      alt: "Illustrative stock photograph of a clean dental clinic reception desk",
      searchHint:
        "Pexels 6809645 dental clinic reception desk",
      width: 1200,
      height: 1100,
    },

    team1: {
      src: "/images/team-1.jpg",
      alt: "Illustrative stock portrait of a male dentist in a modern clinic; not an actual Sagewood team member",
      searchHint:
        "Pexels 37458047 male dentist portrait",
      width: 800,
      height: 1000,
    },

    team2: {
      src: "/images/team-2.jpg",
      alt: "Illustrative stock portrait of a female dentist in a modern clinic; not an actual Sagewood team member",
      searchHint:
        "Pexels 37458354 female dentist portrait",
      width: 800,
      height: 1000,
    },

    team3: {
      src: "/images/team-3.jpg",
      alt: "Illustrative stock portrait of a female dental professional; not an actual Sagewood team member",
      searchHint:
        "Pexels 31043310 female dentist portrait",
      width: 800,
      height: 1000,
    },

    tourReception: {
      src: "/images/tour-reception.jpg",
      alt: "Illustrative stock photograph of a patient speaking with a receptionist at a dental clinic",
      searchHint:
        "Pexels 6809664 patient dental clinic receptionist",
      width: 1400,
      height: 1000,
    },

    tourConsultation: {
      src: "/images/tour-consultation.jpg",
      alt: "Illustrative stock photograph of a dentist examining a patient in a clinic",
      searchHint:
        "Pexels 5622234 dentist patient examination",
      width: 1400,
      height: 1000,
    },

    tourTreatment: {
      src: "/images/tour-treatment.jpg",
      alt: "Illustrative stock photograph of a modern dental chair and treatment equipment",
      searchHint:
        "Pexels 6812480 dental chair equipment",
      width: 1400,
      height: 1000,
    },

    tourSterilisation: {
      src: "/images/tour-sterilisation.jpg",
      alt: "Illustrative stock photograph of sterilisation storage for dental instruments",
      searchHint:
        "Pexels 6812550 sterile dental instruments individually wrapped",
      width: 1400,
      height: 1000,
    },
  },

  /* ========================================
     BOOKING AND CONTACT
  ======================================== */

  booking: {
    eyebrow: "LET'S GET YOU STARTED",

    heading: "Your next step starts here.",

    description:
      "Tell us a little about what you need. The clinic can follow up to discuss availability and the next steps.",

    formTitle: "Request an appointment",

    detailsTitle: "Clinic details",

    openingHoursTitle: "Opening hours",

    directionsLabel: "Get directions",

    directionsAriaLabel:
      "Get directions to Sagewood Dental Studio, opens in a new tab",

    submitLabel: "Continue on WhatsApp",

    footnote:
      "Submitting this form opens WhatsApp with your request. Your appointment is not confirmed until the clinic replies.",

    successMessage:
      "WhatsApp is opening with your request. Your appointment is not confirmed until the clinic replies.",

    openNowLabel: "Open now",

    closedNowLabel: "Closed",

    closedTodayLabel: "Closed today",

    fields: {
      fullName: {
        label: "Full name *",
        placeholder: "Enter your full name",
        hint: "Please enter your name.",
      },

      mobileNumber: {
        label: "Mobile number *",
        placeholder: "0300 0000000",
        hint:
          "Enter a Pakistani mobile number, for example 0300 0000000.",
      },

      email: {
        label: "Email address (optional)",
        placeholder: "you@example.com",
        hint: "Used only if you choose to provide it.",
      },

      treatment: {
        label: "Treatment of interest *",
        placeholder: "Select a treatment",
      },

      preferredDate: {
        label: "Preferred date *",
        placeholder: "Select a date",
      },

      preferredTime: {
        label: "Preferred time *",
        placeholder: "Select a preferred time",
      },

      message: {
        label: "Additional message (optional)",
        placeholder: "Tell us anything else we should know",
      },
    },

    timeWindows: [
      {
        value: "Morning",
        label: "Morning",
      },

      {
        value: "Afternoon",
        label: "Afternoon",
      },

      {
        value: "Evening",
        label: "Evening",
      },
    ],
  },

  /* ========================================
     SEO
  ======================================== */

  seo: {
    title:
      "Sagewood Dental Studio | Calm, Considered Dental Care in Lahore",

    description:
      "Explore the Sagewood Dental Studio concept, featuring thoughtful dental care, a welcoming clinic experience and a considered approach to treatment.",
  },
};