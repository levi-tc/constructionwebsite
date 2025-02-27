import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AMEC GRUP - Distribuitor Panouri Sandwich | Construcții Civile și Industriale",
  description: "AMEC GRUP - Distribuitor de panouri sandwich și tablă tip Lindab la cele mai competitive prețuri din România. Oferim servicii complete de construcții civile și industriale, hale metalice, amenajări interioare și exterioare, instalații electrice și sanitare. Cu peste 20 ani de experiență din 2002.",
  keywords: [
    "panouri sandwich", 
    "tablă Lindab", 
    "construcții civile", 
    "construcții industriale", 
    "hale metalice", 
    "amenajări interioare", 
    "amenajări exterioare", 
    "instalații electrice", 
    "instalații sanitare", 
    "transport și logistică", 
    "AMEC GRUP",
    "firme construcții România"
  ],
  authors: [{ name: "AMEC GRUP" }],
  creator: "AMEC GRUP",
  publisher: "AMEC GRUP",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://amecgrup.ro/",
    title: "AMEC GRUP - Distribuitor Panouri Sandwich | Construcții Civile și Industriale",
    description: "AMEC GRUP - Distribuitor de panouri sandwich și tablă tip Lindab la cele mai competitive prețuri din România. Servicii complete de construcții civile și industriale, hale metalice și amenajări.",
    siteName: "AMEC GRUP",
    images: [
      {
        url: "/construction-hero.svg",
        width: 1200,
        height: 630,
        alt: "AMEC GRUP - Servicii complete de construcții"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMEC GRUP - Distribuitor Panouri Sandwich | Construcții Civile și Industriale",
    description: "Distribuitor de panouri sandwich și tablă tip Lindab la cele mai competitive prețuri. Servicii complete de construcții civile și industriale din 2002.",
    images: ["/construction-hero.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "construction",
  verification: {
    // Add your Google verification ID here if you have one
    // google: "your-google-site-verification-id",
  },
  alternates: {
    canonical: "https://amecgrup.ro/",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

