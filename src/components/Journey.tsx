"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JOURNEY_STEPS } from "@/data/journey";
import { backgrounds } from "@/lib/images";
import { JourneyScrollStage } from "./ui/JourneyScrollStage";
import { SectionBackground } from "./ui/SectionBackground";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowRight } from "./icons";

const STEP_COUNT = JOURNEY_STEPS.length;

function getScrollPerStepVh() {
  if (typeof window === "undefined") return 50;
  return window.innerWidth < 640 ? 42 : window.innerWidth < 1024 ? 46 : 50;
}

function getStickyTopPx(stickyEl: HTMLElement | null) {
  if (stickyEl) {
    const top = parseFloat(getComputedStyle(stickyEl).top);
    if (!Number.isNaN(top)) return top;
  }
  return window.innerWidth >= 1024 ? 72 : 64;
}

function getScrollMetrics(section: HTMLElement, stickyEl: HTMLElement | null) {
  const stickyTop = getStickyTopPx(stickyEl);
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const scrollable = Math.max(0, section.offsetHeight - window.innerHeight);
  const pinScrollStart = sectionTop - stickyTop;
  return { scrollable, pinScrollStart };
}

function stepProgress(index: number) {
  return STEP_COUNT <= 1 ? 0 : index / (STEP_COUNT - 1);
}

function progressToStep(progress: number) {
  if (STEP_COUNT <= 1) return 0;
  return Math.max(0, Math.min(STEP_COUNT - 1, Math.round(progress * (STEP_COUNT - 1))));
}

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);

  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [scrollPerStepVh, setScrollPerStepVh] = useState(50);

  activeStepRef.current = activeStep;

  const snapToStep = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) {
      activeStepRef.current = index;
      setActiveStep(index);
      return;
    }

    const { scrollable, pinScrollStart } = getScrollMetrics(section, stickyRef.current);
    const y = pinScrollStart + stepProgress(index) * scrollable;

    window.scrollTo({ top: y, behavior: "smooth" });

    activeStepRef.current = index;
    setActiveStep(index);
  }, []);

  const goNext = useCallback(() => {
    const next = Math.min(STEP_COUNT - 1, activeStepRef.current + 1);
    if (next !== activeStepRef.current) snapToStep(next);
  }, [snapToStep]);

  const goPrev = useCallback(() => {
    const prev = Math.max(0, activeStepRef.current - 1);
    if (prev !== activeStepRef.current) snapToStep(prev);
  }, [snapToStep]);

  const scrollToStep = useCallback(
    (index: number) => {
      snapToStep(index);
    },
    [snapToStep]
  );

  useEffect(() => {
    const onResize = () => setScrollPerStepVh(getScrollPerStepVh());
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "-64px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync active step from scroll position only — no auto snap (that caused shake/jank).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    const syncStepFromScroll = () => {
      rafId = 0;

      const { scrollable, pinScrollStart } = getScrollMetrics(section, stickyRef.current);
      if (scrollable <= 0) return;

      const scrolled = window.scrollY - pinScrollStart;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const step = progressToStep(progress);

      if (step !== activeStepRef.current) {
        activeStepRef.current = step;
        setActiveStep(step);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(syncStepFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    syncStepFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollPerStepVh]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-x-clip pattern-leaves"
      style={{
        height: `calc(100dvh - 4rem + ${(STEP_COUNT - 1) * scrollPerStepVh}dvh)`,
      }}
    >
      <SectionBackground
        src={backgrounds.journey}
        patternSrc={backgrounds.journeyPattern}
        patternOpacity={0.28}
        overlay="from-cream/88 via-cream/80 to-cream-dark/88"
        imageClassName="object-cover object-center opacity-60"
      />

      <div
        ref={stickyRef}
        className="sticky top-16 lg:top-[4.5rem] z-10 h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4.5rem)] flex flex-col py-3 sm:py-5"
      >
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 flex flex-col flex-1 min-h-0 w-full gap-3 sm:gap-4">
          <div
            className={`shrink-0 transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-0"}`}
          >
            <SectionHeader
              align="center"
              eyebrow="Farm to World Export"
              title="The Journey of Our Ginger"
              description="Seven chapters from Karnataka farms to global tables."
            />
          </div>

          <div
            className={`flex-1 min-h-0 flex flex-col transition-opacity duration-500 delay-100 ${isInView ? "opacity-100" : "opacity-0"}`}
          >
            <JourneyScrollStage
              steps={JOURNEY_STEPS}
              activeStep={activeStep}
              onStepClick={scrollToStep}
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>

          <div
            className={`shrink-0 flex items-center justify-center pb-1 transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-0"}`}
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep hover:text-green-forest transition-colors"
            >
              Explore our products
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
