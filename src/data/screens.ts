export type DeviceKind = "phone" | "tablet" | "store" | "board";

export interface AppScreen {
  src: string;
  width: number;
  height: number;
  label: string;
  device: DeviceKind;
}

export const screens: Record<string, AppScreen[]> = {
  "enterprise-hcm": [
    { src: "/projects/enterprise-hcm/screens/01-home-dashboard.webp", width: 640, height: 1425, label: "Home dashboard", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/02-self-service.webp", width: 640, height: 1425, label: "Self-service", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/03-attendance.webp", width: 640, height: 1425, label: "Attendance", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/04-location-check-in.webp", width: 640, height: 1425, label: "Location check-in", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/05-payslip.webp", width: 640, height: 1425, label: "Payslip", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/06-month-picker.webp", width: 640, height: 1425, label: "Month picker", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/07-menu.webp", width: 640, height: 1425, label: "Menu", device: "phone" },
    { src: "/projects/enterprise-hcm/screens/08-language-switch.webp", width: 640, height: 1425, label: "Language switch", device: "phone" },
  ],
  "hospital-ticketing": [
    { src: "/projects/hospital-ticketing/screens/01-display-states-layouts.webp", width: 1521, height: 1015, label: "Display states & layouts", device: "board" },
  ],
  "aqar": [
    { src: "/projects/aqar/screens/01-home.webp", width: 640, height: 1428, label: "Home", device: "phone" },
    { src: "/projects/aqar/screens/02-offers-carousel.webp", width: 640, height: 1428, label: "Offers carousel", device: "phone" },
    { src: "/projects/aqar/screens/03-featured-listings.webp", width: 640, height: 1428, label: "Featured listings", device: "phone" },
  ],
  "streakup": [
    { src: "/projects/streakup/screens/01-today.webp", width: 640, height: 1384, label: "Today", device: "phone" },
    { src: "/projects/streakup/screens/02-habits.webp", width: 640, height: 1384, label: "Habits", device: "phone" },
    { src: "/projects/streakup/screens/03-challenges.webp", width: 640, height: 1384, label: "Challenges", device: "phone" },
    { src: "/projects/streakup/screens/04-friends.webp", width: 640, height: 1384, label: "Friends", device: "phone" },
    { src: "/projects/streakup/screens/05-create-habit.webp", width: 640, height: 1384, label: "Create habit", device: "phone" },
    { src: "/projects/streakup/screens/06-sign-in.webp", width: 640, height: 1384, label: "Sign in", device: "phone" },
    { src: "/projects/streakup/screens/07-create-account.webp", width: 640, height: 1384, label: "Create account", device: "phone" },
    { src: "/projects/streakup/screens/08-verify-email.webp", width: 640, height: 1384, label: "Verify email", device: "phone" },
    { src: "/projects/streakup/screens/09-restoring-session.webp", width: 640, height: 1384, label: "Restoring session", device: "phone" },
    { src: "/projects/streakup/screens/10-unsynced-work-guard.webp", width: 640, height: 1384, label: "Unsynced-work guard", device: "phone" },
    { src: "/projects/streakup/screens/11-switch-account.webp", width: 640, height: 1384, label: "Switch account", device: "phone" },
    { src: "/projects/streakup/screens/12-session-expired.webp", width: 640, height: 1384, label: "Session expired", device: "phone" },
  ],
  "cafe-pos": [
    { src: "/projects/cafe-pos/screens/01-staff-sign-in.webp", width: 390, height: 886, label: "Staff sign-in", device: "phone" },
    { src: "/projects/cafe-pos/screens/02-floor-plan.webp", width: 430, height: 916, label: "Floor plan", device: "phone" },
    { src: "/projects/cafe-pos/screens/03-table-order.webp", width: 400, height: 1420, label: "Table order", device: "phone" },
    { src: "/projects/cafe-pos/screens/04-order-review.webp", width: 390, height: 884, label: "Order review", device: "phone" },
    { src: "/projects/cafe-pos/screens/05-checkout.webp", width: 394, height: 1732, label: "Checkout", device: "phone" },
    { src: "/projects/cafe-pos/screens/06-shift-overview.webp", width: 400, height: 2413, label: "Shift overview", device: "phone" },
    { src: "/projects/cafe-pos/screens/07-admin-dashboard.webp", width: 430, height: 900, label: "Admin dashboard", device: "phone" },
    { src: "/projects/cafe-pos/screens/08-menu-management.webp", width: 398, height: 887, label: "Menu management", device: "phone" },
    { src: "/projects/cafe-pos/screens/09-add-item.webp", width: 430, height: 1046, label: "Add item", device: "phone" },
    { src: "/projects/cafe-pos/screens/10-staff-roles.webp", width: 394, height: 851, label: "Staff & roles", device: "phone" },
    { src: "/projects/cafe-pos/screens/11-audit-log.webp", width: 394, height: 1127, label: "Audit log", device: "phone" },
    { src: "/projects/cafe-pos/screens/12-shift-reports.webp", width: 430, height: 1104, label: "Shift reports", device: "phone" },
    { src: "/projects/cafe-pos/screens/13-printer-tax-settings.webp", width: 430, height: 1172, label: "Printer & tax settings", device: "phone" },
  ],
  "tidal-activator": [
    { src: "/projects/tidal-activator/screens/01-overview.webp", width: 640, height: 1385, label: "Overview", device: "store" },
    { src: "/projects/tidal-activator/screens/02-monitor-activations.webp", width: 640, height: 1385, label: "Monitor activations", device: "store" },
    { src: "/projects/tidal-activator/screens/03-expiring-licences.webp", width: 640, height: 1385, label: "Expiring licences", device: "store" },
    { src: "/projects/tidal-activator/screens/04-share-licence-files.webp", width: 640, height: 1385, label: "Share licence files", device: "store" },
    { src: "/projects/tidal-activator/screens/05-client-onboarding.webp", width: 640, height: 1385, label: "Client onboarding", device: "store" },
    { src: "/projects/tidal-activator/screens/06-onboarding-steps.webp", width: 640, height: 1385, label: "Onboarding steps", device: "store" },
    { src: "/projects/tidal-activator/screens/07-delete-safeguard.webp", width: 640, height: 1385, label: "Delete safeguard", device: "store" },
    { src: "/projects/tidal-activator/screens/08-licence-analytics.webp", width: 640, height: 1385, label: "Licence analytics", device: "store" },
    { src: "/projects/tidal-activator/screens/09-user-control.webp", width: 640, height: 1385, label: "User control", device: "store" },
    { src: "/projects/tidal-activator/screens/10-secure-sign-in.webp", width: 640, height: 1385, label: "Secure sign-in", device: "store" },
  ],
  "go-bite": [
    { src: "/projects/go-bite/screens/01-splash.webp", width: 392, height: 850, label: "Splash", device: "phone" },
    { src: "/projects/go-bite/screens/02-onboarding.webp", width: 393, height: 851, label: "Onboarding", device: "phone" },
    { src: "/projects/go-bite/screens/03-sign-in.webp", width: 374, height: 810, label: "Sign in", device: "phone" },
    { src: "/projects/go-bite/screens/04-verify-code.webp", width: 374, height: 810, label: "Verify code", device: "phone" },
    { src: "/projects/go-bite/screens/05-home.webp", width: 374, height: 811, label: "Home", device: "phone" },
    { src: "/projects/go-bite/screens/06-home-full-scroll.webp", width: 374, height: 1084, label: "Home · full scroll", device: "phone" },
    { src: "/projects/go-bite/screens/07-menu-item.webp", width: 374, height: 811, label: "Menu item", device: "phone" },
    { src: "/projects/go-bite/screens/08-checkout.webp", width: 374, height: 809, label: "Checkout", device: "phone" },
    { src: "/projects/go-bite/screens/09-order-placed.webp", width: 374, height: 810, label: "Order placed", device: "phone" },
    { src: "/projects/go-bite/screens/10-live-tracking.webp", width: 374, height: 810, label: "Live tracking", device: "phone" },
    { src: "/projects/go-bite/screens/11-rate-your-order.webp", width: 374, height: 810, label: "Rate your order", device: "phone" },
    { src: "/projects/go-bite/screens/12-payment-method.webp", width: 374, height: 810, label: "Payment method", device: "phone" },
    { src: "/projects/go-bite/screens/13-profile.webp", width: 374, height: 810, label: "Profile", device: "phone" },
    { src: "/projects/go-bite/screens/14-notifications.webp", width: 374, height: 810, label: "Notifications", device: "phone" },
  ],
  "biometric-2fa": [
    { src: "/projects/biometric-2fa/screens/01-sign-in.webp", width: 640, height: 1436, label: "Sign in", device: "phone" },
    { src: "/projects/biometric-2fa/screens/02-otp-verification.webp", width: 640, height: 1436, label: "OTP verification", device: "phone" },
    { src: "/projects/biometric-2fa/screens/03-qr-scan.webp", width: 640, height: 1436, label: "QR scan", device: "phone" },
    { src: "/projects/biometric-2fa/screens/04-home.webp", width: 640, height: 1436, label: "Home", device: "phone" },
    { src: "/projects/biometric-2fa/screens/05-register.webp", width: 640, height: 1436, label: "Register", device: "phone" },
    { src: "/projects/biometric-2fa/screens/06-reset-password.webp", width: 640, height: 1436, label: "Reset password", device: "phone" },
    { src: "/projects/biometric-2fa/screens/07-register-tablet.webp", width: 900, height: 1600, label: "Register · tablet", device: "tablet" },
    { src: "/projects/biometric-2fa/screens/08-otp-tablet.webp", width: 900, height: 1600, label: "OTP · tablet", device: "tablet" },
  ],
};
