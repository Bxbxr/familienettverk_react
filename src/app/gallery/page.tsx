// src/app/gallery/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from "@/context/LanguageContext"; // <-- Import hook

const galleryImages = [
  // ... (your image array remains the same)
  { src: "/images/gallery/1.jpg", width: 800, height: 600 },
  { src: "/images/gallery/2.jpg", width: 800, height: 600 },
  { src: "/images/gallery/3.jpg", width: 600, height: 800 },
  { src: "/images/gallery/4.jpg", width: 800, height: 600 },
  { src: "/images/gallery/5.jpg", width: 800, height: 600 },
  { src: "/images/gallery/6.jpg", width: 800, height: 600 },
  { src: "/images/gallery/7.jpg", width: 600, height: 800 },
  { src: "/images/gallery/8.jpg", width: 800, height: 600 },
  { src: "/images/gallery/9.jpg", width: 800, height: 600 },
  { src: "/images/gallery/10.jpg", width: 800, height: 600 },
  { src: "/images/gallery/11.jpg", width: 800, height: 600 },
  { src: "/images/gallery/12.jpg", width: 800, height: 600 },
];

export default function GalleryPage() {
  const [index, setIndex] = useState(-1);
  const { messages } = useLanguage(); // <-- Use hook

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{messages.GalleryPage.title}</h1>
        <p className="lead">{messages.GalleryPage.subtitle}</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image, idx) =>
          image ? (
            <div
              key={idx}
              className="gallery-item"
              onClick={() => setIndex(idx)}
            >
              <Image
                src={image.src}
                alt={`Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="img-fluid"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : null
        )}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={galleryImages}
      />
    </div>
  );
}
