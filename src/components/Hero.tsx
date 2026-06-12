import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "./WhatsAppLink";
import { ArrowRight } from "./icons";

const stats = [
  { value: "28+", label: "Countries Served" },
  { value: "500+", label: "MT Exported" },
  { value: "12", label: "Years of Trust" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex-1 min-h-0 h-full flex flex-col grain overflow-hidden"
    >
      <div
        className="flex-1 min-h-0 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-16 pb-5 sm:py-20 sm:pb-6"
      >
        <div className="w-full max-w-3xl">
          <p
            className="text-gold text-[10px] sm:text-xs font-semibold uppercase mb-2 sm:mb-4 tracking-[0.14em] sm:tracking-[0.18em]"
          >
            Liam6 Agro · Exports — Est. 2013
          </p>
          <h1
            className="font-serif text-[clamp(1.85rem,7.5vw,4.25rem)] text-white leading-[1.05] font-semibold mb-2 sm:mb-4"
          >
            From Fertile Soil
            <br />
            <span className="text-gold-light">to Global Tables.</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-xl">
            Cinematic agricultural craftsmanship meets international trade. We export
            premium organic ginger, ginger coffee, and rare spices from the lands of
            Karnataka to the world&apos;s finest markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
            <WhatsAppLink
              message={whatsappMessages.quote}
              ariaLabel="Request a quote on WhatsApp"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-orange-accent text-white rounded-full hover:bg-orange-warm transition-all text-sm font-semibold shadow-xl shadow-orange-accent/30 hover:shadow-orange-accent/50 active:scale-[0.98] w-full sm:w-auto"
            >
              Request a Quote
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </WhatsAppLink>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 border border-white/40 text-white rounded-full hover:bg-white/10 hover:border-white/60 transition-all text-sm font-medium backdrop-blur-sm w-full sm:w-auto"
            >
              Explore Products
            </a>
          </div>

          <div
            className="mt-5 sm:mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-white/15"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left sm:px-8 first:sm:pl-0">
                <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-semibold tabular-nums">
                  {stat.value}
                </p>
                <p className="text-white/55 text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.16em] uppercase mt-0.5 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
