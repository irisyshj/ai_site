import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AIChatWidget } from "@/components/ai-coach/AIChatWidget";
import { SkipLink } from "@/components/layout/SkipLink";

// Font configuration with preloading and display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ailiteracycoach.com";

export const metadata: Metadata = {
  title: {
    default: "AI Literacy Coach",
    template: "%s | AI Literacy Coach",
  },
  description: "Helping professionals navigate the AI revolution with curated resources, practical guides, and personalized coaching.",
  keywords: ["AI literacy", "artificial intelligence", "AI coaching", "machine learning", "AI resources", "prompt engineering"],
  authors: [{ name: "AI Literacy Coach" }],
  creator: "AI Literacy Coach",
  publisher: "AI Literacy Coach",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "AI Literacy Coach",
    description: "Helping professionals navigate the AI revolution with curated resources, practical guides, and personalized coaching.",
    siteName: "AI Literacy Coach",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Literacy Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Literacy Coach",
    description: "Helping professionals navigate the AI revolution with curated resources, practical guides, and personalized coaching.",
    images: ["/og-image.png"],
    creator: "@ailiteracycoach",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.className} font-sans antialiased`}
        // Reduce motion for users who prefer it
        style={{
          fontFeatureSettings: "'cv11', 'ss01'",
          fontVariationSettings: "'opsz' 32",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Skip to main content link for keyboard navigation */}
          <SkipLink />

          {/* Main layout structure */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main
              id="main-content"
              className="flex-1"
              tabIndex={-1}
              // Ensure main content is programmatically determinable
              role="main"
            >
              {children}
            </main>
            <Footer />
          </div>

          {/* AI Chat Widget - Fixed position */}
          <AIChatWidget />
        </ThemeProvider>

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Literacy Coach",
              "url": "https://ailiteracycoach.com",
              "description": "Helping professionals navigate the AI revolution",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://ailiteracycoach.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
