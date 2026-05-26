import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AIchatAssistant from "../components/features/AIchatAssistant";
import "./globals.css";

// Initialize Inter font with optimized loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
<div className="fixed bottom-6 right-6 z-50 bg-red-500 text-white p-3 rounded">
  AI TEST BOX
</div>;
// Enhanced metadata for SEO and social sharing
export const metadata: Metadata = {
  metadataBase: new URL("https://deepcleaninget.com"),
  title: {
    default: "Deep Cleaning et | Premium Cleaning Services Ethiopia",
    template: "%s | Deep Cleaning et",
  },
  description:
    "Experience the highest standard of cleanliness with Deep Cleaning et. Professional deep cleaning services for homes, offices, and commercial spaces in Addis Ababa, Ethiopia.",
  keywords: [
    "cleaning services",
    "deep cleaning",
    "home cleaning",
    "office cleaning",
    "commercial cleaning",
    "carpet cleaning",
    "sofa cleaning",
    "post-construction cleaning",
    "Addis Ababa",
    "Ethiopia",
    "premium cleaning",
    "professional cleaners",
    "deep cleaning et",
  ].join(", "),
  authors: [{ name: "Deep Cleaning et", url: "https://deepcleaninget.com" }],
  creator: "Deep Cleaning et",
  publisher: "Deep Cleaning et",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Deep Cleaning et - Premium Cleaning Services",
    description:
      "Professional deep cleaning services for homes, offices, and commercial spaces in Ethiopia",
    url: "https://deepcleaninget.com",
    siteName: "Deep Cleaning et",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deep Cleaning et - Premium Cleaning Services in Ethiopia",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Cleaning et | Premium Cleaning Services",
    description: "Professional deep cleaning services in Ethiopia",
    images: ["/twitter-image.jpg"],
    creator: "@deepcleaninget",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  category: "Cleaning Services",
  alternates: {
    canonical: "https://deepcleaninget.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light only" />

        {/* Mobile app capabilities */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Additional meta tags for better UX */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>

      <body className="bg-white text-gray-900 antialiased flex flex-col min-h-screen">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          Skip to main content
        </a>

        {/* Navigation Bar - Fixed at top */}
        <Navbar />

        {/* Main Content - Grows to fill space */}
        <main id="main-content" className="grow">
          {children}
        </main>
        

        {/* Footer - Always at bottom */}
        <AIchatAssistant />
        <Footer />
      </body>
    </html>
  );
}
