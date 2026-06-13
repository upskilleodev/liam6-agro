import Image from "next/image";
import { backgrounds } from "@/lib/images";
import { SectionHeader } from "./ui/SectionHeader";
import { ShieldIcon, PlantIcon, GlobeIcon } from "./icons";

const features = [
  {
    icon: ShieldIcon,
    title: "Certified Quality",
    stat: "100%",
    statLabel: "Lab Tested",
    description:
      "Every batch is lab-tested for purity, moisture content, and compliance with FSSAI, FDA, and ISO 22000 international food safety standards.",
  },
  {
    icon: PlantIcon,
    title: "Grow · Process · Export",
    stat: "100%",
    statLabel: "In-House",
    description:
      "We own the chain — our farms, our processing units, our export desk. Ginger is grown, washed, graded, packed, and shipped by our team with zero middlemen in between.",
  },
  {
    icon: GlobeIcon,
    title: "Global Logistics",
    stat: "28+",
    statLabel: "Countries",
    description:
      "We manage cold-chain freight, customs, and APEDA documentation ourselves — your ginger ships from our export desk straight to your port.",
  },
];

export function WhyTrustUs() {
  return (
    <section id="why-trust" className="relative py-14 sm:py-20 lg:py-32 overflow-hidden grain">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backgrounds.trust}
          alt=""
          fill
          className="object-cover scale-105"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-deep/88 via-green-forest/92 to-green-deep/95" />
      </div>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[200px] sm:h-[400px] rounded-full bg-gold/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Liam6 Standard"
          title="Why The World Trusts Us"
          description="Importers choose us because we control every step — cultivation, processing, documentation, and export — without relying on traders or brokers."
          align="center"
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-5 sm:p-8 rounded-2xl bg-white/7 border border-white/12 backdrop-blur-md hover:bg-white/12 hover:border-gold/25 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-gold group-hover:bg-orange-accent/20 transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl text-white font-semibold">{feature.stat}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium">
                      {feature.statLabel}
                    </p>
                  </div>
                </div>
                <h3 className="font-serif text-xl text-white font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/65 leading-relaxed text-sm sm:text-[15px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
