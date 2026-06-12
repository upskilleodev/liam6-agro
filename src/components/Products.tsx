"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { backgrounds } from "@/lib/images";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "./WhatsAppLink";
import {
  CATEGORY_DESCRIPTIONS,
  GINGER_PRODUCTS,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/data/products";
import { ProductsPlantationDecor } from "./ui/ProductsPlantationDecor";
import { SectionBackground } from "./ui/SectionBackground";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowRight, StarIcon } from "./icons";

function ProductStars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="text-orange-accent w-3 h-3" />
      ))}
    </div>
  );
}

export function Products() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [catalogExpanded, setCatalogExpanded] = useState(false);

  useEffect(() => {
    setCatalogExpanded(false);
  }, [activeCategory]);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? GINGER_PRODUCTS
        : GINGER_PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const featured = filtered.filter((p) => p.featured);
  const catalog = filtered.filter((p) => !p.featured);
  const collapsibleCatalog = featured.length > 0 && catalog.length > 0;
  const showCatalog = catalog.length > 0 && (catalogExpanded || !collapsibleCatalog);

  return (
    <section
      id="products"
      className="relative py-14 sm:py-20 lg:py-32 overflow-hidden pattern-products-plantation"
    >
      <SectionBackground
        src={backgrounds.products}
        accentSrc={backgrounds.farmingPattern}
        accentOpacity={0.14}
        patternSrc={backgrounds.productsPattern}
        patternOpacity={0.26}
        overlay="from-cream/90 via-cream/84 to-cream/92"
        imageClassName="object-cover object-center opacity-90"
      />
      <ProductsPlantationDecor />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <SectionHeader
            eyebrow="Curated Collection"
            title="Ginger Products We Export"
            description="After our farm-to-export journey, these are the premium ginger products we deliver worldwide — from fresh rhizomes to oils, pastes, and beverages."
          />
          <WhatsAppLink
            message={whatsappMessages.catalog}
            ariaLabel="Request product catalog on WhatsApp"
            className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-brown-primary hover:text-orange-accent transition-colors shrink-0 group w-full sm:w-auto py-2"
          >
            Request product catalog
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </WhatsAppLink>
        </div>

        {/* Category filters — horizontal scroll on mobile */}
        <div className="relative z-10 flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 sm:px-4 py-2.5 text-[10px] sm:text-xs font-semibold tracking-wide uppercase rounded-full border transition-all shrink-0 touch-manipulation cursor-pointer ${
              activeCategory === "all"
                ? "bg-green-deep text-white border-green-deep shadow-md"
                : "bg-white/80 text-brown-primary/70 border-brown-primary/15 hover:border-orange-accent/40"
            }`}
          >
            All Products ({GINGER_PRODUCTS.length})
          </button>
          {PRODUCT_CATEGORIES.map((cat) => {
            const count = GINGER_PRODUCTS.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-2.5 text-[10px] sm:text-xs font-semibold tracking-wide uppercase rounded-full border transition-all shrink-0 touch-manipulation cursor-pointer ${
                  activeCategory === cat
                    ? "bg-orange-accent text-white border-orange-accent shadow-md"
                    : "bg-white/80 text-brown-primary/70 border-brown-primary/15 hover:border-orange-accent/40"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {activeCategory !== "all" && (
          <p className="text-brown-primary/60 text-sm mb-8 max-w-2xl">
            {CATEGORY_DESCRIPTIONS[activeCategory]}
          </p>
        )}

        {/* Featured products */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-10">
            {featured.map((product) => (
              <article
                key={product.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(93,58,38,0.1)] hover:shadow-[0_20px_48px_-12px_rgba(93,58,38,0.2)] transition-all duration-500 border border-brown-primary/8 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-brown-dark/5">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/65 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2 max-w-[85%]">
                    <span className="px-2 sm:px-3 py-1 bg-green-deep/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-full">
                      Export Grade
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-orange-accent/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-full">
                      {product.tag}
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/90 text-brown-primary/70 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase rounded-full">
                    {product.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold drop-shadow-sm">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6 pt-4 sm:pt-5">
                  <ProductStars />
                  <p className="text-brown-primary/65 text-sm leading-relaxed mt-3 mb-5">
                    {product.description}
                  </p>
                <WhatsAppLink
                  message={whatsappMessages.product(product.name)}
                  ariaLabel={`Inquire about ${product.name} on WhatsApp`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-accent hover:text-orange-warm transition-colors group/link"
                >
                  Inquire Now
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </WhatsAppLink>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Expand to view more catalog products */}
        {collapsibleCatalog && !catalogExpanded && (
          <div className="flex justify-center mt-2 mb-4">
            <button
              type="button"
              onClick={() => setCatalogExpanded(true)}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/90 border border-brown-primary/15 rounded-full text-sm font-semibold text-brown-primary shadow-sm hover:border-orange-accent/45 hover:shadow-md transition-all w-full sm:w-auto max-w-md mx-auto"
              aria-expanded={false}
            >
              View more ginger products
              <span className="px-2 py-0.5 rounded-full bg-orange-accent/15 text-orange-accent text-xs font-bold tabular-nums">
                +{catalog.length}
              </span>
              <ChevronDown className="w-4 h-4 text-orange-accent transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        )}

        {/* Catalog grid */}
        {showCatalog && (
          <div className="animate-fade-up">
            {collapsibleCatalog && (
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="font-serif text-xl text-brown-primary font-semibold">
                  More Ginger Products
                </h3>
                <button
                  type="button"
                  onClick={() => setCatalogExpanded(false)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-primary/60 hover:text-orange-accent transition-colors"
                  aria-expanded={true}
                >
                  Show less
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catalog.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 bg-white/85 backdrop-blur-sm rounded-xl border border-brown-primary/8 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="relative w-full h-36 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 ring-1 ring-brown-primary/10">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold tracking-wider uppercase text-orange-accent">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-lg text-brown-primary font-semibold leading-tight mt-0.5">
                      {product.name}
                    </h4>
                    <p className="text-brown-primary/55 text-xs leading-relaxed mt-1 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <WhatsAppLink
                      message={whatsappMessages.product(product.name)}
                      ariaLabel={`Inquire about ${product.name} on WhatsApp`}
                      className="text-xs font-semibold text-orange-accent hover:text-orange-warm"
                    >
                      Inquire →
                    </WhatsAppLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-brown-primary/50 py-12">No products in this category.</p>
        )}
      </div>
    </section>
  );
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 10l4-4 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
