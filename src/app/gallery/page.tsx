// src/app/gallery/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Ensure Next.js Image is imported
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabaseClient";
import { GalleryImage } from "@/lib/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);
  const { messages } = useLanguage();

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching public gallery images:", error);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    };

    fetchGalleryImages();
  }, []);

  if (!messages.GalleryPage) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const lightboxSlides = images.map((img) => ({
    src: img.image_url,
    alt: img.alt_text || "Gallery Image",
  }));

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{messages.GalleryPage.title}</h1>
        <p className="lead">{messages.GalleryPage.subtitle}</p>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="gallery-grid">
          {images.map((image, idx) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => setIndex(idx)}
            >
              {/* ✅ THIS IS THE FIX: Using the <Image> component instead of <img> ✅ */}
              <Image
                src={image.image_url}
                alt={image.alt_text || `Gallery image ${idx + 1}`}
                width={400} // Base dimensions for optimization
                height={300}
                className="img-fluid" // Keeps it responsive
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-date">
                  {new Date(image.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center">
          <p>There are currently no images in the gallery.</p>
        </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={lightboxSlides}
      />
    </div>
  );
}
