"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { JourneyStep } from "@/data/journey";
import { ChevronLeft, ChevronRight } from "../icons";

type JourneyScrollStageProps = {
  steps: JourneyStep[];
  activeStep: number;
  onStepClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function JourneyScrollStage({
  steps,
  activeStep,
  onStepClick,
  onPrev,
  onNext,
}: JourneyScrollStageProps) {
  const [expanded, setExpanded] = useState(false);
  const step = steps[activeStep];
  const progress = (activeStep + 1) / steps.length;

  useEffect(() => {
    setExpanded(false);
  }, [activeStep]);

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-3">
      <div
        className="relative flex-1 min-h-[min(52vh,440px)] sm:min-h-[min(62vh,560px)] rounded-2xl overflow-hidden shadow-[0_20px_50px_-24px_rgba(44,24,16,0.45)] ring-1 ring-brown-primary/10"
      >
        <div className="absolute inset-0">
          <Image
            key={step.image}
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority={activeStep === 0}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/25 via-transparent to-brown-dark/85 z-[2] pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-white/15">
          <div
            className="h-full origin-left bg-orange-accent"
            style={{
              width: `${progress * 100}%`,
              transition: "width 0.2s ease-out",
            }}
          />
        </div>

        <span
          className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 font-serif text-[clamp(3rem,8vw,5rem)] font-bold text-white/12 leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          {step.step}
        </span>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 lg:p-8">
          <div key={step.id} className="max-w-2xl">
            <p className="text-gold-light/90 text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-2">
              {step.location}
            </p>
            <h3 className="font-serif text-[clamp(1.5rem,4vw,2.25rem)] text-white font-semibold leading-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-white/88 text-sm sm:text-[15px] leading-relaxed line-clamp-2 sm:line-clamp-none">
              {step.description}
            </p>

            {expanded && (
              <p className="mt-2 text-white/72 text-sm leading-relaxed animate-journey-step-in">
                {step.detail}
              </p>
            )}

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-xs font-semibold text-gold-light hover:text-white transition-colors"
            >
              {expanded ? "Less" : "More about this step"}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onPrev}
              disabled={activeStep === 0}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStepClick(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeStep
                      ? "w-6 sm:w-8 h-2 bg-orange-accent"
                      : "w-2 h-2 bg-white/35 hover:bg-white/55"
                  }`}
                  aria-label={`Step ${s.step}: ${s.title}`}
                  aria-current={i === activeStep ? "step" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={activeStep === steps.length - 1}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-brown-primary/45 font-medium tracking-wide sm:hidden">
        Tap the arrows or dots to explore each step
      </p>
      <p className="text-center text-[11px] text-brown-primary/45 font-medium tracking-wide hidden sm:block">
        Scroll to move through the journey
      </p>
    </div>
  );
}
