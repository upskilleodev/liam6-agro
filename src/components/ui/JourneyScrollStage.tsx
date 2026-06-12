"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { JourneyStep } from "@/data/journey";
import { ChevronLeft, ChevronRight } from "../icons";

type JourneyStageProps = {
  steps: JourneyStep[];
  activeStep: number;
  onStepChange: (index: number) => void;
};

export function JourneyScrollStage({
  steps,
  activeStep,
  onStepChange,
}: JourneyStageProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageReady, setImageReady] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const step = steps[activeStep];
  const progress = (activeStep + 1) / steps.length;

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, index));
    if (clamped !== activeStep) {
      setImageReady(false);
      onStepChange(clamped);
    }
  };

  const goPrev = () => goTo(activeStep - 1);
  const goNext = () => goTo(activeStep + 1);

  useEffect(() => {
    setExpanded(false);
    setImageReady(false);
  }, [activeStep]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start === null) return;
    touchStartX.current = null;

    const delta = e.changedTouches[0].clientX - start;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-3">
      <div
        className="relative min-h-[min(58vh,420px)] sm:min-h-[min(62vh,520px)] rounded-2xl overflow-hidden shadow-[0_20px_50px_-24px_rgba(44,24,16,0.45)] ring-1 ring-brown-primary/10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={step.id}
          src={step.image}
          alt={step.title}
          fill
          className={`object-cover transition-opacity duration-300 ${imageReady ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 1024px) 100vw, 900px"
          priority={activeStep === 0}
          onLoad={() => setImageReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/30 via-transparent to-brown-dark/88 pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-white/15 pointer-events-none">
          <div
            className="h-full bg-orange-accent transition-[width] duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <span
          className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 font-serif text-[clamp(3rem,8vw,5rem)] font-bold text-white/12 leading-none select-none pointer-events-none"
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
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-xs font-semibold text-gold-light hover:text-white transition-colors touch-manipulation"
            >
              {expanded ? "Less" : "More about this step"}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between gap-2 sm:gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeStep === 0}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none touch-manipulation shrink-0"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-0.5 sm:gap-1 flex-1 min-w-0">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 touch-manipulation shrink-0"
                  aria-label={`Step ${s.step}: ${s.title}`}
                  aria-current={i === activeStep ? "step" : undefined}
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      i === activeStep
                        ? "w-7 sm:w-8 h-2.5 bg-orange-accent"
                        : "w-2.5 h-2.5 bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={activeStep === steps.length - 1}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none touch-manipulation shrink-0"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-brown-primary/45 font-medium tracking-wide">
        Tap arrows or swipe the card to explore each step
      </p>
    </div>
  );
}
