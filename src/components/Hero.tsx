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
      className="relative z-10 flex-1 min-h-0 flex flex-col grain overflow-hidden"
    >
      <div className="relative flex-1 min-h-0 flex flex-col justify-center mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-2 sm:pb-6">
        <div className="max-w-3xl w-full min-h-0">
          <p
            className="text-gold text-[9px] sm:text-xs font-semibold uppercase mb-2 sm:mb-4 animate-fade-up flex flex-wrap items-center gap-x-2 gap-y-0.5 tracking-[0.12em] sm:tracking-[0.18em]"
          >
            <span>Liam6 Agro</span>
            <span className="text-gold/45 font-normal">·</span>
            <span>Exports</span>
            <span className="text-gold/35 font-normal">—</span>
            <span className="text-gold/75">Est. 2013</span>
          </p>
          <h1
            className="font-serif text-[clamp(1.65rem,6.5vw,4.25rem)] text-white leading-[1.05] font-semibold mb-2 sm:mb-4 animate-fade-up delay-100"
          >
            From Fertile Soil
            <br />
            <span className="text-gold-light">to Global Tables.</span>
          </h1>
          <p
            className="text-white/78 text-xs sm:text-base leading-[1.55] mb-3 sm:mb-6 max-w-xl animate-fade-up delay-200 line-clamp-2 sm:line-clamp-none"
          >
            Cinematic agricultural craftsmanship meets international trade. We export
            premium organic ginger, ginger coffee, and rare spices from the lands of
            Karnataka to the world&apos;s finest markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-6 animate-fade-up delay-300">
            <WhatsAppLink
              message={whatsappMessages.quote}
              ariaLabel="Request a quote on WhatsApp"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 bg-orange-accent text-white rounded-full hover:bg-orange-warm transition-all text-sm font-semibold shadow-xl shadow-orange-accent/30 hover:shadow-orange-accent/50 active:scale-[0.98] w-full sm:w-auto"
            >
              Request a Quote
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </WhatsAppLink>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 border border-white/40 text-white rounded-full hover:bg-white/10 hover:border-white/60 transition-all text-sm font-medium backdrop-blur-sm w-full sm:w-auto"
            >
              Explore Products
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-white/15 animate-fade-up delay-400 w-full max-w-md sm:max-w-none shrink-0">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left sm:px-8 first:sm:pl-0">
              <p className="font-serif text-lg sm:text-2xl lg:text-3xl text-white font-semibold tabular-nums">
                {stat.value}
              </p>
              <p className="text-white/50 text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.16em] uppercase mt-0.5 font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
