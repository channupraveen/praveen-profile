import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { MobileDock } from "@/components/MobileDock";
import { Nav } from "@/components/Nav";
import "./globals.css";

const heading = Bricolage_Grotesque({ variable: "--font-heading", subsets: ["latin"] });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });

const description =
  "Praveen Kumar is a Software Engineer and AI Engineer with 3+ years of experience building AI-powered SaaS products, backend systems, distributed AI infrastructure, and full-stack applications.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f5f7",
  colorScheme: "light",
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    title: "Praveen Kumar",
    statusBarStyle: "default",
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
    "Voice AI",
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
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        {children}
        <MobileDock />
      </body>
    </html>
  );
}
