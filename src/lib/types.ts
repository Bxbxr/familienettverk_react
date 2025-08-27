// src/lib/types.ts
export interface Activity {
  id: number;
  created_at: string;
  title: string;
  date: string;
  description: string | null;
  image_url: string | null;
  registration_link: string | null;
}
