import Image from "next/image";
import { backgrounds, sections } from "@/lib/images";
import { SectionBackground } from "./ui/SectionBackground";
import { SectionHeader } from "./ui/SectionHeader";

export function OurStory() {
  return (
    <section id="about" className="relative py-14 sm:py-20 lg:py-32 overflow-hidden">
      <SectionBackground
        src={backgrounds.about}
        accentSrc={backgrounds.farmingPattern}
        accentOpacity={0.2}
        overlay="from-cream/88 via-cream/78 to-cream/90"
        imageClassName="object-cover object-center"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1 px-2 sm:px-0">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-orange-accent/20 to-green-deep/10 rounded-3xl -rotate-2" />
            <div className="relative aspect-[4/5] max-w-sm sm:max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-brown-primary/20 ring-1 ring-brown-primary/10">
              <Image
                src={sections.indianFarmer}
                alt="Farmer cultivating ginger in the fertile lands of Karnataka"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/55 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-3 right-3 sm:-bottom-5 sm:-right-2 lg:-right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl border border-brown-primary/8 max-w-[140px] sm:max-w-[200px]">
              <p className="font-serif text-2xl sm:text-4xl text-green-deep font-semibold leading-none">12+</p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-brown-primary/60 font-semibold mt-1">
                Years of Excellence
              </p>
            </div>

            <div className="absolute top-3 left-3 sm:top-6 sm:-left-3 lg:-left-6 bg-green-deep text-white rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold font-semibold">Origin</p>
              <p className="font-serif text-base sm:text-lg font-semibold">Karnataka</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              eyebrow="Our Story"
              title="We Grow It. We Process It. We Export It."
              description="One integrated operation — no traders, no brokers, no layers between our farms and your port."
            />

            <div className="mt-6 sm:mt-8 space-y-5 text-brown-primary/70 leading-relaxed">
              <p>
                Founded in 2013, Liam6Agro Exports was built on a simple promise: own the full
                journey. We cultivate ginger on Karnataka farms, run our own washing, grading,
                and packing facilities, and sell and ship directly to buyers across the world —
                never through middlemen or auction yards.
              </p>
              <p>
                Under Mohammed Irfan&apos;s leadership, every batch is grown, processed, and
                exported under one roof. That means fair value for farmers, certified quality you
                can verify, and a direct relationship with the team that actually moves your
                ginger from field to freight.
              </p>
            </div>

            <blockquote className="mt-6 sm:mt-8 pl-4 sm:pl-5 border-l-2 border-orange-accent">
              <p className="font-serif text-lg sm:text-xl text-brown-primary italic leading-relaxed">
                &ldquo;We don&apos;t buy from traders. We produce on our farms, process in our
                units, and export with our own team — that is how Karnataka ginger reaches the
                world.&rdquo;
              </p>
            </blockquote>

            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/85 backdrop-blur-sm rounded-2xl border border-brown-primary/8 shadow-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-deep to-green-mid flex items-center justify-center text-white font-serif text-lg sm:text-xl font-bold shrink-0 ring-2 sm:ring-4 ring-gold/20">
                MI
              </div>
              <div>
                <p className="font-semibold text-brown-primary text-lg">Mohammed Irfan</p>
                <p className="text-sm text-brown-primary/55 tracking-wide uppercase font-medium">
                  Founder &amp; CEO
                </p>
                <p className="text-sm text-brown-primary/50 mt-0.5">
                  Farm-to-export — grow, process, and ship direct since 2013
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
