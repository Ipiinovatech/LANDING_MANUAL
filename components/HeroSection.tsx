"use client";

import { HeroCarousel } from "./sections/hero/HeroCarousel";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <HeroCarousel />
    </section>
  );
}