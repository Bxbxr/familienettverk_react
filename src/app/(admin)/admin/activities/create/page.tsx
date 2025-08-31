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
    // This function remains unchanged
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
    if (imageFile) {
      finalImageUrl = await uploadActivityImage();
      if (!finalImageUrl) {
        setIsSubmitting(false);
        return;
      }
    }

    const formData = new FormData(formRef.current);
    if (!finalImageUrl) {
      finalImageUrl = formData.get("image_url") as string | null;
    }

    // UPDATED: The newActivity object now includes bilingual fields
    const newActivity = {
      // old title and description are removed from here
      date: formData.get("date"),
      image_url: finalImageUrl,
      registration_link: formData.get("registration_link"),
      // New bilingual fields
      title_no: formData.get("title_no"),
      title_ar: formData.get("title_ar"),
      description_no: formData.get("description_no"),
      description_ar: formData.get("description_ar"),
    };

    const { error: insertError } = await supabase
      .from("activities")
      .insert([newActivity]);

    if (insertError) {
      setError(
        "Failed to create activity. Please check the details and try again. " +
          insertError.message
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
            {/* === UPDATED BILINGUAL FIELDS === */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title_no" className="form-label">
                  Title (Norwegian)
                </label>
                <input
                  type="text"
                  id="title_no"
                  name="title_no"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="title_ar" className="form-label">
                  Title (Arabic)
                </label>
                <input
                  type="text"
                  id="title_ar"
                  name="title_ar"
                  className="form-control"
                  dir="rtl"
                />
              </div>
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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="description_no" className="form-label">
                  Description (Norwegian)
                </label>
                <textarea
                  id="description_no"
                  name="description_no"
                  className="form-control"
                  rows={4}
                ></textarea>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description_ar" className="form-label">
                  Description (Arabic)
                </label>
                <textarea
                  id="description_ar"
                  name="description_ar"
                  className="form-control"
                  rows={4}
                  dir="rtl"
                ></textarea>
              </div>
            </div>
            {/* =============================== */}

            {/* Your existing image and link fields remain unchanged */}
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
