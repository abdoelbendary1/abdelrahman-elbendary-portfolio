import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-heading" });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const roboto = Roboto({ subsets: ["latin"], display: "swap", variable: "--font-ui" });

const title = "Abdelrahman Elbendary | Flutter & Mobile Software Engineer";
const description = "Cairo-based Flutter engineer with 2+ years of production experience. Explore mobile and web projects, enterprise architecture, technical skills, and professional experience.";
export const metadata: Metadata = {
  title, description,
  authors: [{ name: "Abdelrahman Elbendary" }],
  keywords: ["Flutter Developer", "Mobile Software Engineer", "Dart", "Clean Architecture", "Cairo", "Abdelrahman Elbendary"],
  openGraph: { title, description, type: "website", locale: "en_US", siteName: "Abdelrahman Elbendary" },
  twitter: { card: "summary", title, description },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fafbf9" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${montserrat.variable} ${openSans.variable} ${roboto.variable}`}><body>{children}</body></html>;
}
