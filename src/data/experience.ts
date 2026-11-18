export const experience = [
  {
    company: "Tidal Systems", role: "Flutter Developer", period: "Feb 2025 – Present", location: "Cairo, Egypt",
    achievements: [
      "Spearheaded the architectural migration of an enterprise HCM & ERP mobile application from monolithic setState to Clean Architecture with BLoC/Cubit, replacing setState in 100% of the 30+ business modules.",
      "Engineered a high-throughput hospital ticketing display app using SignalR with self-healing auto-reconnection and automated wake locks for real-time operation.",
      "Developed an administrative biometric 2FA security system supporting 2 biometric modalities (FaceID and Fingerprint) via local_auth, with zero-touch QR-to-OTP cryptographic validation handshakes.",
      "Built the TidalActivator licensing app with 2 deep-link types (App Links and Universal Links) and OAuth2 Bearer tokens, reducing license activation to 1 click.",
      "Delivered 4 production apps end to end to the Apple App Store and Google Play: configured automated CI/CD release pipelines, code signing, and Firebase Crashlytics monitoring.",
    ],
  },
  {
    company: "Code Icons", role: "Flutter Developer", period: "Jun 2024 – Jan 2025", location: "Cairo, Egypt",
    achievements: [
      "Architected a multi-tenant enterprise ERP mobile app with 3 core modules (Finance, HR Self-Service, Inventory) supporting 500–1,000 active business users.",
      "Integrated Saudi Arabian ZATCA e-invoicing compliance logic, handling real-time tax calculation and cryptographic QR code generation.",
      "Eliminated 2 classes of stability defects (setState-after-dispose crashes and memory leaks) by building a dependency injection graph with GetIt/Injectable and enforcing mounted lifecycle guards.",
      "Implemented offline-first persistence and optimistic UI caching across 2 storage layers (Hive and encrypted SharedPreferences).",
    ],
  },
  {
    company: "AhdafWeb", role: "Flutter Developer (Contract)", period: "Dec 2024 – Jan 2025", location: "Remote",
    achievements: [
      "Engineered checkout and cart state management for an e-commerce platform (High Digital), integrating 1 payment gateway (Kuwait’s KNET) and 2-language Arabic/English localization.",
      "Delivered 2 apps in 2 months. Developed a booking app (BeautyOn) integrating Google Maps API, real-time provider discovery, and Riverpod state management optimized for 60 FPS scrolling.",
    ],
  },
  {
    company: "GenSystems", role: "Flutter Developer Intern", period: "Feb 2024 – Apr 2024", location: "Remote",
    achievements: ["Converted Figma design systems into responsive cross-platform UI workflows and custom Dart actions in FlutterFlow during a 3-month internship, connecting 2 backend services (REST APIs and Firebase Auth)."],
  },
];
