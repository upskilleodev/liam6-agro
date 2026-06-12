import Image from "next/image";
import { backgrounds, sections } from "@/lib/images";
import { WHATSAPP_DISPLAY, whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppLink } from "./WhatsAppLink";
import { ArrowRight } from "./icons";

export function CTA() {
  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-32 bg-cream-dark relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brown-dark/25 grain min-h-[280px] sm:min-h-[320px]">
          <Image
            src={backgrounds.cta}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            aria-hidden="true"
          />
          <Image
            src={sections.gingerCloseUp}
            alt=""
            fill
            className="object-cover mix-blend-overlay opacity-40"
            sizes="(max-width: 1024px) 100vw, 1024px"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brown-dark/92 via-brown-primary/88 to-green-deep/90" />

          <div className="relative p-6 sm:p-12 lg:p-16 text-center">
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
              Partner With Us
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] text-white font-semibold mb-4 leading-tight max-w-2xl mx-auto">
              Ready to Source Premium Agro Products?
            </h2>
            <p className="text-white/75 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Reliable supply, certified quality, and seamless international logistics — chat with
              our export team on WhatsApp for quotes and orders.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <WhatsAppLink
                message={whatsappMessages.contact}
                ariaLabel="Contact export team on WhatsApp"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-orange-accent text-white rounded-full hover:bg-orange-warm transition-all text-sm font-semibold shadow-lg shadow-orange-accent/25 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                Chat on WhatsApp
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </WhatsAppLink>
              <WhatsAppLink
                message={whatsappMessages.quote}
                ariaLabel="Request a quote on WhatsApp"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white rounded-full hover:bg-white/10 hover:border-white/55 transition-all text-sm font-medium backdrop-blur-sm whitespace-nowrap"
              >
                Request a Quote
              </WhatsAppLink>
            </div>

            <p className="mt-8 text-white/45 text-sm">
              WhatsApp:{" "}
              <a
                href={whatsappUrl(whatsappMessages.contact)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold transition-colors"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 7.078 2.887a9.825 9.825 0 012.887 7.078c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}
