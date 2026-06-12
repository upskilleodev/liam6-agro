import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://liam6agro.com"),
  title: "Liam6Agro Exports | Premium Ginger from Karnataka to the World",
  description:
    "Export-grade organic ginger, ginger coffee, and spices from Karnataka's fertile lands to 28+ countries. FSSAI, USDA Organic, FDA approved.",
  icons: {
    icon: [{ url: "/icons/logo-emblem.png", type: "image/png" }],
    apple: [{ url: "/icons/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Liam6Agro Exports",
    description: "From fertile soil to global tables — premium ginger exports since 2013.",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1536, height: 1024 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-brown-primary bg-cream">
        <Script id="scroll-to-hero" strategy="beforeInteractive">
          {`if("scrollRestoration" in history){history.scrollRestoration="manual"}if(location.hash){history.replaceState(null,"",location.pathname+location.search)}window.scrollTo(0,0)`}
        </Script>
        {children}
      </body>
    </html>
  );
}
