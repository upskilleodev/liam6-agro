"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { JourneyStep } from "@/data/journey";
import { ChevronLeft, ChevronRight } from "../icons";

const AUTOPLAY_MS = 1500;
const SWIPE_TRANSITION = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";

type JourneyCarouselProps = {
  steps: JourneyStep[];
};

function isAdjacent(index: number, active: number, total: number) {
  if (index === active) return true;
  if (index === (active + 1) % total) return true;
  if (index === (active - 1 + total) % total) return true;
  return false;
}

type JourneySlideProps = {
  step: JourneyStep;
  index: number;
  activeStep: number;
  total: number;
  expanded: boolean;
  onToggleExpand: (index: number) => void;
};

const JourneySlide = memo(function JourneySlide({
  step,
  index,
  activeStep,
  total,
  expanded,
  onToggleExpand,
}: JourneySlideProps) {
  const near = isAdjacent(index, activeStep, total);

  return (
    <article
      className="relative flex-shrink-0 w-full h-full min-h-[inherit]"
      style={{
        contentVisibility: near ? "visible" : "hidden",
        containIntrinsicSize: near ? undefined : "0 480px",
      }}
    >
      {near ? (
        <Image
          src={step.image}
          alt={step.title}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority={index === 0}
          loading={index === 0 ? undefined : "lazy"}
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-brown-dark/50 pointer-events-none" aria-hidden="true" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/30 via-transparent to-brown-dark/88 pointer-events-none" />

      <span
        className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 font-serif text-[clamp(3rem,8vw,5rem)] font-bold text-white/12 leading-none pointer-events-none"
        aria-hidden="true"
      >
        {step.step}
      </span>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl">
          <p className="text-gold-light/90 text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-2">
            {step.location}
          </p>
          <h3 className="font-serif text-[clamp(1.5rem,4vw,2.25rem)] text-white font-semibold leading-tight">
            {step.title}
          </h3>
          <p className="mt-2 text-white/88 text-sm sm:text-[15px] leading-relaxed line-clamp-3 sm:line-clamp-none">
            {step.description}
          </p>

          {expanded && (
            <p className="mt-2 text-white/72 text-sm leading-relaxed">{step.detail}</p>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(index);
            }}
            className="mt-2 text-xs font-semibold text-gold-light hover:text-white touch-manipulation"
          >
            {expanded ? "Less" : "More about this step"}
          </button>
        </div>
      </div>
    </article>
  );
});

export function JourneyCarousel({ steps }: JourneyCarouselProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(activeStep);
  const draggingRef = useRef(false);
  const pointerRef = useRef({ id: -1, x: 0, y: 0, locked: false });
  const prevStepRef = useRef(0);

  activeStepRef.current = activeStep;

  const stopAutoplay = useCallback(() => setAutoplay(false), []);

  const applyTransform = useCallback((offsetPx: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = animate ? SWIPE_TRANSITION : "none";
    track.style.transform = `translate3d(calc(-${activeStepRef.current * 100}% + ${offsetPx}px), 0, 0)`;
  }, []);

  const goTo = useCallback(
    (index: number, fromUser = false) => {
      if (fromUser) stopAutoplay();
      const clamped = Math.max(0, Math.min(steps.length - 1, index));
      setActiveStep(clamped);
      setExpandedStep(null);
    },
    [steps.length, stopAutoplay]
  );

  const goNext = useCallback(
    (fromUser = false) => {
      if (fromUser) stopAutoplay();
      setExpandedStep(null);
      setActiveStep((prev) => (prev + 1) % steps.length);
    },
    [steps.length, stopAutoplay]
  );

  const goPrev = useCallback(
    (fromUser = false) => {
      if (fromUser) stopAutoplay();
      setExpandedStep(null);
      setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    },
    [steps.length, stopAutoplay]
  );

  const toggleExpand = useCallback(
    (index: number) => {
      stopAutoplay();
      setExpandedStep((prev) => (prev === index ? null : index));
    },
    [stopAutoplay]
  );

  useEffect(() => {
    applyTransform(0, false);
  }, [applyTransform]);

  useEffect(() => {
    const prev = prevStepRef.current;
    const wrapped =
      (prev === steps.length - 1 && activeStep === 0) ||
      (prev === 0 && activeStep === steps.length - 1);

    prevStepRef.current = activeStep;
    applyTransform(0, !wrapped);
  }, [activeStep, applyTransform, steps.length]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !isVisible) return;

    const timer = window.setInterval(() => {
      if (draggingRef.current) return;
      setExpandedStep(null);
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplay, isVisible, steps.length]);

  const releasePointer = (target: Element, pointerId: number) => {
    if (target instanceof HTMLElement && target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;

    draggingRef.current = true;
    pointerRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY, locked: false };
    applyTransform(0, false);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || pointerRef.current.id !== e.pointerId) return;

    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;

    if (!pointerRef.current.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dx) <= Math.abs(dy)) {
        draggingRef.current = false;
        return;
      }
      pointerRef.current.locked = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    let offset = dx;
    const step = activeStepRef.current;
    if (step === 0 && offset > 0) offset *= 0.35;
    if (step === steps.length - 1 && offset < 0) offset *= 0.35;

    applyTransform(offset, false);
  };

  const finishDrag = (e: React.PointerEvent, fromUser = true) => {
    if (!draggingRef.current || pointerRef.current.id !== e.pointerId) return;

    const dx = e.clientX - pointerRef.current.x;
    const width = containerRef.current?.offsetWidth ?? 320;
    const threshold = Math.min(48, width * 0.15);
    const horizontalSwipe =
      fromUser && pointerRef.current.locked && Math.abs(dx) >= threshold;

    if (horizontalSwipe) {
      stopAutoplay();
      setExpandedStep(null);
      if (dx < 0) {
        setActiveStep((prev) => (prev + 1) % steps.length);
      } else {
        setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
      }
    } else {
      applyTransform(0, true);
    }

    draggingRef.current = false;
    pointerRef.current.locked = false;
    pointerRef.current.id = -1;
    releasePointer(e.currentTarget, e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => finishDrag(e, true);
  const onPointerCancel = (e: React.PointerEvent) => finishDrag(e, false);

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div
        ref={containerRef}
        className="relative w-full h-[min(70vh,640px)] sm:h-auto sm:aspect-[16/10] sm:max-h-[min(62vh,560px)] rounded-none sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_-24px_rgba(44,24,16,0.45)] select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div ref={trackRef} className="flex h-full w-full">
          {steps.map((s, i) => (
            <JourneySlide
              key={s.id}
              step={s}
              index={i}
              activeStep={activeStep}
              total={steps.length}
              expanded={expandedStep === i}
              onToggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
        <button
          type="button"
          onClick={() => goPrev(true)}
          className="flex items-center justify-center w-10 h-10 text-brown-primary hover:text-orange-accent touch-manipulation shrink-0"
          aria-label="Previous step"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-1">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i, true)}
              className="flex items-center justify-center w-5 h-5 touch-manipulation"
              aria-label={`Step ${s.step}: ${s.title}`}
              aria-current={i === activeStep ? "step" : undefined}
            >
              <span
                className={`rounded-full transition-all duration-200 ${
                  i === activeStep
                    ? "w-4 h-1.5 bg-orange-accent"
                    : "w-1.5 h-1.5 bg-brown-primary/25"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goNext(true)}
          className="flex items-center justify-center w-10 h-10 text-brown-primary hover:text-orange-accent touch-manipulation shrink-0"
          aria-label="Next step"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-[11px] text-brown-primary/45 font-medium tracking-wide px-4 sm:px-0">
        {autoplay ? "Auto-playing — swipe or tap arrows to take control" : "Swipe or use arrows to explore each step"}
      </p>
    </div>
  );
}
