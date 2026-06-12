"use client";

import { useEffect, useState } from "react";
import { whatsappMessages } from "@/lib/whatsapp";
import { LogoMark } from "./icons";
import { WhatsAppLink } from "./WhatsAppLink";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Products", href: "#products" },
  { label: "Global Reach", href: "#global-reach" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] isolate transition-shadow duration-300 bg-green-deep border-b border-white/10 ${
        scrolled
          ? "shadow-lg shadow-green-deep/30"
          : "shadow-md shadow-green-deep/15"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink-0 group"
          >
            <LogoMark className="w-10 h-10 sm:w-11 sm:h-11 text-gold/85 shrink-0" />
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight leading-none">
                Liam6Agro
              </span>
              <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-gold/90 leading-none">
                Exports
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] text-white/85 hover:text-white hover:bg-white/10 rounded-full transition-all tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#products"
              className="px-5 py-2.5 text-[13px] font-medium text-white border border-white/35 rounded-full hover:border-white/60 hover:bg-white/10 transition-all"
            >
              View Products
            </a>
            <WhatsAppLink
              message={whatsappMessages.quote}
              ariaLabel="Request a quote on WhatsApp"
              className="px-5 py-2.5 text-[13px] font-semibold text-white bg-orange-accent rounded-full hover:bg-orange-warm shadow-lg shadow-orange-accent/25 transition-all hover:shadow-orange-accent/40"
            >
              Request Quote
            </WhatsAppLink>
          </div>

          <button
            type="button"
            className="lg:hidden relative z-[101] w-11 h-11 flex items-center justify-center text-white hover:text-gold transition-colors touch-manipulation"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="lg:hidden fixed inset-0 top-16 z-[90] bg-black/40"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[95] bg-green-deep border-t border-white/10 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]"
          >
            <nav className="flex flex-col px-5 sm:px-6 py-6 sm:py-8 gap-1 min-h-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3.5 text-base sm:text-lg font-serif text-white/90 hover:text-gold border-b border-white/8 transition-colors touch-manipulation"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-8 mt-4">
                <a
                  href="#products"
                  className="text-center py-3.5 font-medium text-white border border-white/30 rounded-full touch-manipulation"
                  onClick={closeMenu}
                >
                  View Products
                </a>
                <WhatsAppLink
                  message={whatsappMessages.quote}
                  ariaLabel="Request a quote on WhatsApp"
                  className="text-center py-3.5 font-semibold text-white bg-orange-accent rounded-full shadow-lg touch-manipulation"
                  onClick={closeMenu}
                >
                  Request Quote
                </WhatsAppLink>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
