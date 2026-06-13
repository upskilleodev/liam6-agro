import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "./WhatsAppLink";
import { ArrowRight } from "./icons";

const stats = [
  { value: "28+", label: "Countries" },
  { value: "500+", label: "MT Exported" },
  { value: "0", label: "Middlemen" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex-1 min-h-0 h-full flex flex-col grain overflow-hidden"
    >
      <div className="flex-1 min-h-0 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-14 pb-4 sm:py-20 sm:pb-6">
        <div className="w-full max-w-2xl lg:max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 animate-fade-up">
            <span className="h-px w-8 sm:w-12 bg-gold/70 shrink-0" aria-hidden="true" />
            <p className="text-gold-light/90 text-[10px] sm:text-xs font-medium uppercase tracking-[0.22em] sm:tracking-[0.28em]">
              We Grow · We Process · We Export
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[clamp(2rem,7.2vw,4.5rem)] text-white leading-[1.02] font-semibold mb-3 sm:mb-5 animate-fade-up delay-100"
          >
            Karnataka Ginger,
            <br />
            <span className="text-gold-light font-normal italic">from our farms to the world.</span>
          </h1>

          <p
            className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md sm:max-w-xl font-light animate-fade-up delay-200"
          >
            No middlemen — we grow on our farms, process in our own facilities, and export
            directly to importers worldwide. One company, one chain, from Karnataka soil to
            global tables.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up delay-300">
            <WhatsAppLink
              message={whatsappMessages.quote}
              ariaLabel="Request export quote on WhatsApp"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 bg-gold text-green-deep rounded-sm hover:bg-gold-light transition-colors text-sm font-semibold tracking-wide shadow-lg shadow-black/20 active:scale-[0.98] w-full sm:w-auto"
            >
              Request Export Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </WhatsAppLink>
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-white/90 text-sm font-medium tracking-wide border border-white/25 rounded-sm hover:border-gold/50 hover:text-gold-light transition-colors backdrop-blur-[2px] w-full sm:w-auto"
            >
              View Product Range
              <span
                className="inline-block w-4 h-px bg-white/40 group-hover:bg-gold-light group-hover:w-5 transition-all"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Stats — editorial panel */}
          <div
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 animate-fade-up delay-400"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md sm:max-w-lg">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-semibold tabular-nums leading-none">
                    {stat.value}
                  </p>
                  <p className="text-gold-light/60 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase mt-1.5 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
