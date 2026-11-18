import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-mono" });

const title = "Abdelrahman Elbendary — Flutter & Mobile Engineer";
const description = "Cairo-based Flutter engineer shipping iOS and Android apps: enterprise HCM, real-time queue displays, biometric 2FA, POS systems and consumer products.";
export const metadata: Metadata = {
  title, description,
  authors: [{ name: "Abdelrahman Elbendary" }],
  keywords: ["Flutter Developer", "Mobile Software Engineer", "Dart", "Clean Architecture", "Cairo", "Abdelrahman Elbendary"],
  openGraph: { title, description, type: "website", locale: "en_US", siteName: "Abdelrahman Elbendary" },
  twitter: { card: "summary", title, description },
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#efeae1" }, { media: "(prefers-color-scheme: dark)", color: "#141210" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body>{children}</body></html>;
}
