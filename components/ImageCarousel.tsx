"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  mobileImage?: string;
  alt: string;
}

export default function ImageCarousel({
  slides,
  children,
}: {
  slides: Slide[];
  children?: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[75vh] overflow-hidden group">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}>
          <picture>
            {slide.mobileImage && (
              <source
                media="(max-width: 767px)"
                srcSet={slide.mobileImage}
              />
            )}
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      ))}

      <div className="absolute inset-0" />

      <div className="relative z-10 h-full flex items-center">{children}</div>

      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2.5 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Previous slide">
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2.5 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Next slide">
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
