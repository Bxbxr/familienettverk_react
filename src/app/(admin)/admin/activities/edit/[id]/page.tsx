// src/app/(admin)/admin/activities/edit/[id]/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams, notFound } from "next/navigation";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { Activity } from "@/lib/types";

export default function EditActivityPage() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Get the id from useParams
  const rawId = useParams().id as string | string[] | undefined;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching activity for edit:", error);
        notFound();
      } else {
        setActivity(data);
      }
      setLoading(false);
    };

    fetchActivity();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const updatedActivity = {
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      registration_link: formData.get("registration_link"),
    };

    const { error: updateError } = await supabase
      .from("activities")
      .update(updatedActivity)
      .eq("id", id);

    if (updateError) {
      setError("Failed to update activity. Please try again.");
      setIsSubmitting(false);
    } else {
      router.push("/admin/activities");
      router.refresh();
    }
  };

  const formatDateTimeLocal = (isoDate: string) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  if (loading) {
    return <div className="text-center p-5">Loading activity details...</div>;
  }

  if (!activity) {
    return <div className="alert alert-danger">Activity not found.</div>;
  }

  return (
    <div>
      <Link
        href="/admin/activities"
        className="btn btn-outline-secondary mb-4 d-inline-flex align-items-center"
      >
        <FaChevronLeft className="me-2" />
        Back to Activities
      </Link>
      <h1 className="h2 mb-4">Edit Activity</h1>
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
                defaultValue={activity.title}
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
                defaultValue={formatDateTimeLocal(activity.date)}
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
                defaultValue={activity.description || ""}
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
                defaultValue={activity.image_url || ""}
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
                defaultValue={activity.registration_link || ""}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
