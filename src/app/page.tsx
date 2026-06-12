import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HeroBackground } from "@/components/HeroBackground";
import { CertificationsBar } from "@/components/CertificationsBar";
import { Journey } from "@/components/Journey";
import { Products } from "@/components/Products";
import { GlobalExportMap } from "@/components/GlobalExportMap";
import { WhyTrustUs } from "@/components/WhyTrustUs";
import { OurStory } from "@/components/OurStory";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <StickyWhatsApp />
      <main className="overflow-x-clip min-w-0 w-full">
        <div className="h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden">
          <div className="relative flex-1 min-h-0 h-full flex flex-col isolate">
            <HeroBackground />
            <Hero />
          </div>
          <CertificationsBar />
        </div>
        <Journey />
        <Products />
        <GlobalExportMap />
        <WhyTrustUs />
        <OurStory />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
