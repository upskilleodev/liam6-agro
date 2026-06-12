import { whatsappMessages } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";

type FooterLink =
  | { label: string; href: string }
  | { label: string; whatsapp: string };

const footerLinks: Record<string, FooterLink[]> = {
  Products: [
    { label: "Fresh & Young Ginger", href: "#products" },
    { label: "Ginger Powder & Flakes", href: "#products" },
    { label: "Pastes & Pickles", href: "#products" },
    { label: "Oils & Extracts", href: "#products" },
    { label: "Ginger Tea & Coffee", href: "#products" },
  ],
  Company: [
    { label: "Our Story", href: "#about" },
    { label: "Our Journey", href: "#journey" },
    { label: "Global Reach", href: "#global-reach" },
    { label: "Why Trust Us", href: "#why-trust" },
    { label: "WhatsApp Us", whatsapp: whatsappMessages.contact },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brown-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-deep/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo variant="gold" onDark className="w-10 h-10 shrink-0" />
              <div className="flex flex-col gap-1 sm:gap-0.5">
                <span className="font-serif text-xl font-semibold text-white tracking-tight leading-none block">
                  Liam6Agro
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-gold block leading-none pl-[3px]">
                  Exports
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              Premium ginger and agro exports from Karnataka&apos;s fertile lands to 28+ countries
              worldwide. Established 2013.
            </p>
            <div className="flex flex-wrap gap-2">
              {["FSSAI", "USDA Organic", "FDA", "ISO 22000", "APEDA"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-gold/80 border border-gold/20 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"whatsapp" in link ? (
                      <WhatsAppLink
                        message={link.whatsapp}
                        className="text-sm text-white/55 hover:text-white transition-colors"
                      >
                        {link.label}
                      </WhatsAppLink>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/55 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-white/35 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Liam6 Agro Exports. Crafted for global trade.
          </p>
          <p className="text-white/25 text-xs tracking-wide">
            Karnataka, India → Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
