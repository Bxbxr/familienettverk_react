// src/app/(admin)/admin/activities/create/page.tsx
"use client";

import { useState, FormEvent, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function CreateActivityPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const uploadActivityImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("activity-images")
      .upload(fileName, imageFile);
    if (uploadError) {
      setError("Failed to upload image. Please try again.");
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("activity-images")
      .getPublicUrl(uploadData.path);
    return urlData.publicUrl;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formRef.current) {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
      return;
    }

    let finalImageUrl: string | null = null;

    // Step 1: Prioritize file upload
    if (imageFile) {
      finalImageUrl = await uploadActivityImage();
      // If upload fails, stop the process
      if (!finalImageUrl) {
        setIsSubmitting(false);
        return;
      }
    }

    // Step 2: If no file was uploaded, use the URL from the form
    const formData = new FormData(formRef.current);
    if (!finalImageUrl) {
      finalImageUrl = formData.get("image_url") as string | null;
    }

    const newActivity = {
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      image_url: finalImageUrl, // Use the determined image URL
      registration_link: formData.get("registration_link"),
    };

    const { error: insertError } = await supabase
      .from("activities")
      .insert([newActivity]);

    if (insertError) {
      setError(
        "Failed to create activity. Please check the details and try again."
      );
      setIsSubmitting(false);
    } else {
      router.push("/admin/activities");
      router.refresh();
    }
  };

  return (
    <div>
      <Link
        href="/admin/activities"
        className="btn btn-outline-secondary mb-4 d-inline-flex align-items-center"
      >
        <FaChevronLeft className="me-2" />
        Back to Activities
      </Link>
      <h1 className="h2 mb-4">Create New Activity</h1>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} ref={formRef}>
            {/* ... (Title, Date, Description inputs remain the same) ... */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows={4}
              ></textarea>
            </div>

            {/* === DUAL IMAGE INPUT SECTION === */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => {
                  if (e.target.files) setImageFile(e.target.files[0]);
                }}
              />
              <div className="form-text">Prioritized over Image URL.</div>
            </div>

            <div className="text-center my-3 text-muted">OR</div>

            <div className="mb-3">
              <label htmlFor="image_url" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                className="form-control"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {/* ================================= */}

            <div className="mb-3">
              <label htmlFor="registration_link" className="form-label">
                Registration Link
              </label>
              <input
                type="url"
                id="registration_link"
                name="registration_link"
                className="form-control"
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Activity"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
