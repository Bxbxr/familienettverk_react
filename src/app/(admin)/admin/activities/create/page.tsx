// src/app/(admin)/admin/activities/create/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default function CreateActivityPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const newActivity = {
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      registration_link: formData.get("registration_link"),
    };

    const { error: insertError } = await supabase
      .from("activities")
      .insert([newActivity]);

    if (insertError) {
      console.error("Error creating activity:", insertError);
      setError(
        "Failed to create activity. Please check the details and try again."
      );
      setIsSubmitting(false);
    } else {
      // On success, redirect back to the main activities list
      router.push("/admin/activities");
      // Important: This tells Next.js to refresh the data on the page we're navigating to
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
          <form onSubmit={handleSubmit}>
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
                Registration Link (e.g., Google Form)
              </label>
              <input
                type="url"
                id="registration_link"
                name="registration_link"
                className="form-control"
                placeholder="https://forms.gle/your-form"
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
