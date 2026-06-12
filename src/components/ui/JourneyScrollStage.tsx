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
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0, locked: false });
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const progress = (activeStep + 1) / steps.length;

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, index));
    if (clamped !== activeStep) onStepChange(clamped);
  };

  const goPrev = () => goTo(activeStep - 1);
  const goNext = () => goTo(activeStep + 1);

  useEffect(() => {
    setExpandedStep(null);
  }, [activeStep]);

  const startDrag = (clientX: number, clientY: number) => {
    draggingRef.current = true;
    pointerRef.current = { x: clientX, y: clientY, locked: false };
    setIsDragging(true);
    setDragX(0);
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!draggingRef.current) return;

    const dx = clientX - pointerRef.current.x;
    const dy = clientY - pointerRef.current.y;

    if (!pointerRef.current.locked) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        pointerRef.current.locked = true;
      }
    }

    if (pointerRef.current.locked && Math.abs(dx) > Math.abs(dy)) {
      let offset = dx;
      if (activeStep === 0 && offset > 0) offset *= 0.35;
      if (activeStep === steps.length - 1 && offset < 0) offset *= 0.35;
      setDragX(offset);
    }
  };

  const endDrag = (clientX: number) => {
    if (!draggingRef.current) return;

    const dx = clientX - pointerRef.current.x;
    const width = containerRef.current?.offsetWidth ?? 320;
    const threshold = Math.min(48, width * 0.15);

    if (dx < -threshold) goNext();
    else if (dx > threshold) goPrev();

    draggingRef.current = false;
    setDragX(0);
    setIsDragging(false);
    pointerRef.current.locked = false;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    startDrag(e.clientX, e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    moveDrag(e.clientX, e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    endDrag(e.clientX);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onPointerCancel = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragX(0);
    setIsDragging(false);
    pointerRef.current.locked = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const toggleExpanded = (index: number) => {
    setExpandedStep((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-3">
      <div
        ref={containerRef}
        className={`relative min-h-[min(58vh,420px)] sm:min-h-[min(62vh,520px)] rounded-2xl overflow-hidden shadow-[0_20px_50px_-24px_rgba(44,24,16,0.45)] ring-1 ring-brown-primary/10 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <div
          className={`grid grid-flow-col auto-cols-[100%] h-full min-h-[inherit] ${
            isDragging ? "" : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `translateX(calc(-${activeStep * 100}% + ${dragX}px))`,
          }}
        >
          {steps.map((s, i) => (
            <article
              key={s.id}
              className="relative min-h-[min(58vh,420px)] sm:min-h-[min(62vh,520px)]"
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority={i === 0}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/30 via-transparent to-brown-dark/88 pointer-events-none" />

              <span
                className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 font-serif text-[clamp(3rem,8vw,5rem)] font-bold text-white/12 leading-none pointer-events-none"
                aria-hidden="true"
              >
                {s.step}
              </span>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl">
                  <p className="text-gold-light/90 text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-2">
                    {s.location}
                  </p>
                  <h3 className="font-serif text-[clamp(1.5rem,4vw,2.25rem)] text-white font-semibold leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-white/88 text-sm sm:text-[15px] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {s.description}
                  </p>

                  {expandedStep === i && (
                    <p className="mt-2 text-white/72 text-sm leading-relaxed">{s.detail}</p>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(i);
                    }}
                    className="mt-2 text-xs font-semibold text-gold-light hover:text-white transition-colors touch-manipulation"
                  >
                    {expandedStep === i ? "Less" : "More about this step"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/15 pointer-events-none">
          <div
            className="h-full bg-orange-accent transition-[width] duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeStep === 0}
          className="flex items-center justify-center w-10 h-10 text-brown-primary hover:text-orange-accent transition-colors disabled:opacity-30 disabled:pointer-events-none touch-manipulation shrink-0"
          aria-label="Previous step"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-1">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
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
          onClick={goNext}
          disabled={activeStep === steps.length - 1}
          className="flex items-center justify-center w-10 h-10 text-brown-primary hover:text-orange-accent transition-colors disabled:opacity-30 disabled:pointer-events-none touch-manipulation shrink-0"
          aria-label="Next step"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-[11px] text-brown-primary/45 font-medium tracking-wide">
        Swipe or drag the card to explore each step
      </p>
    </div>
  );
}
