export interface PortfolioProject {
  id: string;
  title: string;
  company?: string;
  category?: string;
  featured?: boolean;
  description: string;
  technologies: string[];
  contributions?: string[];
  scopeNote?: string;
  coverImage?: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  screenshots?: string[];
  githubUrl?: string;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  liveDemoUrl?: string;
}

export const projects: PortfolioProject[] = [
  {
    id: "enterprise-hcm", title: "Enterprise HCM & ERP Mobile Application", company: "Tidal Systems", category: "Enterprise mobile",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.tidal.tidal_ess&pcampaignid=web_share",
    appStoreUrl: "https://apps.apple.com/eg/app/tidal-ess/id6449649961",
    coverImage: "/projects/enterprise-hcm/header.png", coverImageWidth: 1536, coverImageHeight: 1024,
    description: "Enterprise HCM & ERP application migrated from monolithic setState to Clean Architecture and BLoC/Cubit across 30+ business modules.",
    technologies: ["Flutter", "Dart", "Clean Architecture", "BLoC / Cubit"],
  },
  {
    id: "aqar", title: "AQAR", category: "Real estate · Mobile & web", featured: true,
    coverImage: "/projects/aqar/header.png", coverImageWidth: 1774, coverImageHeight: 887,
    description: "A unified real estate mobile and web experience focused on discovering property listings, residential projects, developers, and geographic areas.",
    technologies: ["Flutter / Dart", "Next.js / React", "TypeScript", "Tailwind CSS", "Supabase"],
    scopeNote: "Project scope; production readiness of individual features has not been verified.",
    contributions: ["Property listings, details, and specifications", "Property discovery, search, and filtering", "Residential projects and real estate developers", "Areas and locations", "Cross-platform product experience"],
  },
  {
    id: "streakup", title: "StreakUp", category: "Habit tracking & social productivity", featured: true,
    githubUrl: "https://github.com/abdoelbendary1/streak_up",
    coverImage: "/projects/streakup/header.png", coverImageWidth: 1672, coverImageHeight: 941,
    description: "A mobile application focused on building consistent habits, tracking daily progress and streaks, connecting with friends, and participating in private habit challenges.",
    technologies: ["Flutter", "Dart", "BLoC / Cubit", "Supabase"],
    scopeNote: "Project scope; production readiness of individual features has not been verified.",
    contributions: ["Habit management and daily check-ins", "Streak tracking", "Social challenges and friends", "Authentication and user sessions", "Offline and synchronization-oriented architecture"],
  },
  {
    id: "cafe-pos", title: "Enterprise Café POS & Floor Management Engine", category: "Independent system", featured: true,
    githubUrl: "https://github.com/abdoelbendary1/captin_order",
    coverImage: "/projects/cafe-pos/header.png", coverImageWidth: 1672, coverImageHeight: 941,
    description: "An enterprise POS system with local-first order lifecycles, granular role-based access, and direct LAN thermal printer communication.",
    technologies: ["Flutter", "Dart", "BLoC", "Fpdart (ROP)", "Freezed", "Injectable", "GoRouter Builder", "Raw TCP/IP Sockets"],
    contributions: ["Engineered an enterprise POS system using Clean Architecture and Railway Oriented Programming (fpdart Either) for deterministic error handling.", "Developed LAN thermal printer communication using asynchronous raw TCP/IP socket streams and ESC/POS byte-protocol serialization.", "Built a local-first transactional state machine managing atomic multi-stage order lifecycles with granular Role-Based Access Control (RBAC)."],
  },
  {
    id: "tidal-activator", title: "TidalActivator", company: "Tidal Systems", category: "Licensing & activation",
    coverImage: "/projects/tidal-activator/header.png", coverImageWidth: 1672, coverImageHeight: 941,
    description: "Mobile application for licensing and activation, using App/Universal Links and OAuth2 Bearer tokens for one-click license activation.",
    technologies: ["Flutter", "Deep Linking", "OAuth2"],
  },
  {
    id: "go-bite", title: "Go Bite", category: "Food ordering & delivery",
    githubUrl: "https://github.com/FAD-Community/fad-team09-Restaurant-app",
    coverImage: "/projects/go-bite/header.png", coverImageWidth: 1774, coverImageHeight: 887,
    description: "A food ordering mobile app experience covering restaurant discovery, menus, checkout, and order tracking.",
    technologies: [],
  },
  {
    id: "biometric-2fa", title: "Administrative Biometric 2FA System", company: "Tidal Systems", category: "Security & authentication",
    coverImage: "/projects/biometric-2fa/header.png", coverImageWidth: 1145, coverImageHeight: 1374,
    description: "Administrative security solution using biometric authentication, local_auth, and QR-to-OTP cryptographic validation handshakes.",
    technologies: ["Flutter", "local_auth", "Biometric 2FA", "QR-to-OTP"],
  },
  {
    id: "hospital-ticketing", title: "Hospital Ticketing Display Application", company: "Tidal Systems", category: "Real-time systems",
    liveDemoUrl: "https://newqueweb.tidalsystems.net/",
    coverImage: "/projects/hospital-ticketing/header.png", coverImageWidth: 1672, coverImageHeight: 941,
    description: "Real-time hospital ticketing display application using SignalR, automatic reconnection, and automated wake locks for reliable operation.",
    technologies: ["Flutter", "Dart", "SignalR", "Wake locks"],
  },
];
