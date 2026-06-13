"use client";

import { JOURNEY_STEPS } from "@/data/journey";
import { backgrounds } from "@/lib/images";
import { JourneyCarousel } from "./ui/JourneyCarousel";
import { SectionBackground } from "./ui/SectionBackground";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowRight } from "./icons";

export function Journey() {
  return (
    <section id="journey" className="relative overflow-x-clip pattern-leaves py-12 sm:py-20 lg:py-24">
      <SectionBackground
        src={backgrounds.journey}
        patternSrc={backgrounds.journeyPattern}
        patternOpacity={0.28}
        overlay="from-cream/88 via-cream/80 to-cream-dark/88"
        imageClassName="object-cover object-center opacity-60"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-4 sm:gap-8">
        <SectionHeader
          align="center"
          eyebrow="Farm to World · No Middlemen"
          title="The Journey of Our Ginger"
          description="Seven steps we run ourselves — from our Karnataka farms through our facilities to ports worldwide. No traders, no brokers."
        />

        <div className="-mx-4 sm:mx-0">
          <JourneyCarousel steps={JOURNEY_STEPS} />
        </div>

        <div className="flex items-center justify-center">
          <a
            href="#products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep hover:text-green-forest transition-colors"
          >
            Explore our products
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
