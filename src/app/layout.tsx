import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const portfolioDescription =
  "The official architectural portfolio of Eugene Sasu Appiah, highlighting concept development, Revit modelling, architectural visualization and thoughtful project delivery.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Vanta Forma — Architecture with Intention",
  description: portfolioDescription,
  keywords: [
    "architectural portfolio",
    "student architect",
    "Eugene Sasu Appiah",
    "Accra",
    "Ghana",
    "Vanta Forma",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Vanta Forma",
    title: "Vanta Forma — Architecture with Intention",
    description: portfolioDescription,
    url: "/",
    images: [
      {
        url: "/images/vanta-forma-social-preview.png",
        width: 1200,
        height: 630,
        alt: "Vanta Forma — Where Shadow Shapes Form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanta Forma — Architecture with Intention",
    description: portfolioDescription,
    images: ["/images/vanta-forma-social-preview.png"],
  },
  icons: {
    icon: "/images/brand/vanta-forma-icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
