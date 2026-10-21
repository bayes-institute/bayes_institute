'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Slide = { src: string; alt: string };

export function HeroCarousel({
  slides,
  children,
}: {
  slides: Slide[];
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="hero-carousel">
      <div className="hero-carousel__track">
        {slides.map((slide, i) => (
          <div key={slide.src} className={`hero-carousel__slide${i === current ? ' is-active' : ''}`}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="hero-carousel__img"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="hero-carousel__overlay" />
      </div>

      <div className="hero-carousel__content">
        <div className="hero-carousel__content-inner">{children}</div>
      </div>

      <div className="hero-carousel__dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-carousel__dot${i === current ? ' is-active' : ''}`}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
