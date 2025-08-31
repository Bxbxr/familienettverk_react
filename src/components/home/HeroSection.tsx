// src/components/home/HeroSection.tsx
"use client";

import Link from "next/link";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { useLanguage } from "@/context/LanguageContext"; // <-- Step 1: Import the hook

const slides = [
  { image: "/images/slide1.jpg" },
  { image: "/images/slide2.jpg" },
  { image: "/images/slide3.jpg" },
  { image: "/images/slide4.jpg" },
  { image: "/images/slide5.jpg" },
];

export default function HeroSection() {
  const { messages } = useLanguage(); // <-- Step 2: Use the hook to get translations

  return (
    <div className="hero-section">
      {/* Layer 1: The Image Slider (in the background) */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide-image"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Layer 2: The Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Layer 3: The Text and Buttons (on top of everything) */}
      <div className="hero-content">
        {/* Step 3: Replace hardcoded text with dynamic values */}
        <h1>{messages.HeroSection.title}</h1>
        <p className="lead">{messages.HeroSection.subtitle}</p>
        <Link href="/activities" className="btn btn-primary">
          {messages.HeroSection.button}
        </Link>
      </div>
    </div>
  );
}
