// src/lib/types.ts
export interface Activity {
  id: number;
  created_at: string;
  // The old fields are removed
  // title: string;
  // description: string | null;

  // New bilingual fields
  title_no: string | null;
  title_ar: string | null;
  description_no: string | null;
  description_ar: string | null;

  // Unchanged fields
  start_date: string; // Changed to required
  end_date: string | null; // Can be optional for single-day events
  image_url: string | null;
  registration_link: string | null;
}
export interface GalleryImage {
  id: number;
  created_at: string;
  image_url: string;
  alt_text: string | null;
}
