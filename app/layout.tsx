import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MobileDock } from "@/components/MobileDock";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Praveen Kumar is a Software Engineer and AI Engineer with 3+ years of experience building AI-powered SaaS products, backend systems, distributed AI infrastructure, and full-stack applications.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    title: "Praveen Kumar",
    statusBarStyle: "black-translucent",
  },
  title: {
    default: "Praveen Kumar | Software Engineer & AI Engineer",
    template: "%s | Praveen Kumar",
  },
  description,
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "AI Developer",
    "Python Developer",
    "FastAPI Developer",
    "Angular Developer",
    "Full Stack Developer",
    "LLM Engineer",
    "AI SaaS",
    "Distributed AI",
    "UK Software Engineer",
  ],
  authors: [{ name: "Praveen Kumar" }],
  openGraph: {
    title: "Praveen Kumar | Software Engineer & AI Engineer",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praveen Kumar | Software Engineer & AI Engineer",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Nav />
        {children}
        <MobileDock />
      </body>
    </html>
  );
}
