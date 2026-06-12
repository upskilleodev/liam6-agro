"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JOURNEY_STEPS } from "@/data/journey";
import { backgrounds } from "@/lib/images";
import { JourneyScrollStage } from "./ui/JourneyScrollStage";
import { SectionBackground } from "./ui/SectionBackground";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowRight } from "./icons";

const STEP_COUNT = JOURNEY_STEPS.length;
const WHEEL_COOLDOWN_MS = 700;
const SNAP_DEBOUNCE_MS = 120;

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

function isInJourneyPinZone(
  section: HTMLElement,
  stickyEl: HTMLElement | null,
  margin = 24
) {
  const { scrollable, pinScrollStart } = getScrollMetrics(section, stickyEl);
  if (scrollable <= 0) return false;
  const scrolled = window.scrollY - pinScrollStart;
  return scrolled >= -margin && scrolled <= scrollable + margin;
}

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  const isSnappingRef = useRef(false);
  const wheelCooldownRef = useRef(false);
  const touchStartYRef = useRef(0);

  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [scrollPerStepVh, setScrollPerStepVh] = useState(50);

  activeStepRef.current = activeStep;

  const snapToStep = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const section = sectionRef.current;
      if (!section) {
        activeStepRef.current = index;
        setActiveStep(index);
        return;
      }

      const { scrollable, pinScrollStart } = getScrollMetrics(section, stickyRef.current);
      const y = pinScrollStart + stepProgress(index) * scrollable;

      isSnappingRef.current = true;
      window.scrollTo({ top: y, behavior });

      activeStepRef.current = index;
      setActiveStep(index);

      window.setTimeout(() => {
        isSnappingRef.current = false;
      }, behavior === "smooth" ? WHEEL_COOLDOWN_MS : 200);
    },
    []
  );

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      snapToStep(index, behavior);
    },
    [snapToStep]
  );

  const goNext = useCallback(() => {
    const next = Math.min(STEP_COUNT - 1, activeStepRef.current + 1);
    if (next !== activeStepRef.current) goTo(next);
  }, [goTo]);

  const goPrev = useCallback(() => {
    const prev = Math.max(0, activeStepRef.current - 1);
    if (prev !== activeStepRef.current) goTo(prev);
  }, [goTo]);

  const scrollToStep = useCallback(
    (index: number) => {
      goTo(index);
    },
    [goTo]
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
      { threshold: 0.1, rootMargin: "-64px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let snapTimer: ReturnType<typeof setTimeout> | undefined;

    const syncStepFromScroll = () => {
      rafId = 0;
      if (isSnappingRef.current) return;

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

    const scheduleSnap = () => {
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (isSnappingRef.current) return;
        if (!isInJourneyPinZone(section, stickyRef.current)) return;

        const { scrollable, pinScrollStart } = getScrollMetrics(section, stickyRef.current);
        if (scrollable <= 0) return;

        const scrolled = window.scrollY - pinScrollStart;
        const progress = Math.max(0, Math.min(1, scrolled / scrollable));
        const step = progressToStep(progress);
        const targetY = pinScrollStart + stepProgress(step) * scrollable;

        if (Math.abs(window.scrollY - targetY) > 4) {
          snapToStep(step, "smooth");
        }
      }, SNAP_DEBOUNCE_MS);
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(syncStepFromScroll);
      scheduleSnap();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    syncStepFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(snapTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollPerStepVh, snapToStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const jumpStep = (direction: 1 | -1) => {
      if (wheelCooldownRef.current || isSnappingRef.current) return;
      if (!isInJourneyPinZone(section, stickyRef.current)) return;

      const step = activeStepRef.current;
      const next = step + direction;
      if (next < 0 || next >= STEP_COUNT) return;

      wheelCooldownRef.current = true;
      snapToStep(next, "smooth");
      window.setTimeout(() => {
        wheelCooldownRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInJourneyPinZone(section, stickyRef.current, 48)) return;
      if (Math.abs(e.deltaY) < 8) return;

      const atFirst = activeStepRef.current === 0 && e.deltaY < 0;
      const atLast = activeStepRef.current === STEP_COUNT - 1 && e.deltaY > 0;
      if (atFirst || atLast) return;

      e.preventDefault();
      jumpStep(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isInJourneyPinZone(section, stickyRef.current, 48)) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - endY;
      if (Math.abs(delta) < 40) return;

      jumpStep(delta > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [snapToStep]);

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
            className={`shrink-0 transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <SectionHeader
              align="center"
              eyebrow="Farm to World Export"
              title="The Journey of Our Ginger"
              description="Seven chapters from Karnataka farms to global tables."
            />
          </div>

          <div
            className={`flex-1 min-h-0 flex flex-col transition-all duration-500 delay-100 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
            className={`shrink-0 flex items-center justify-center pb-1 transition-all duration-500 ${isInView ? "opacity-100" : "opacity-0"}`}
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
