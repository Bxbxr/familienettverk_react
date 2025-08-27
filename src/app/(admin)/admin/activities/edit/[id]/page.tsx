// src/app/(admin)/admin/activities/edit/[id]/page.tsx
"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams, notFound } from "next/navigation";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { Activity } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export default function EditActivityPage() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const rawId = useParams().id as string | undefined;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  useEffect(() => {
    if (!id) return;
    const fetchActivity = async () => {
      // ... (fetchActivity logic remains the same)
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        notFound();
      } else {
        setActivity(data);
      }
      setLoading(false);
    };
    fetchActivity();
  }, [id]);

  const uploadActivityImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("activity-images")
      .upload(fileName, imageFile);
    if (uploadError) {
      setError("Failed to upload new image.");
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("activity-images")
      .getPublicUrl(uploadData.path);
    return urlData.publicUrl;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id || !formRef.current) return;
    setIsSubmitting(true);
    setError(null);

    let finalImageUrl: string | null = activity?.image_url || null; // Start with the existing image URL

    // 1. If a new file is uploaded, it takes highest priority
    if (imageFile) {
      const newUrl = await uploadActivityImage();
      if (newUrl) {
        finalImageUrl = newUrl;
      } else {
        // Upload failed, so stop submission
        setIsSubmitting(false);
        return;
      }
    }

    const formData = new FormData(formRef.current);
    const pastedUrl = formData.get("image_url") as string;

    // 2. If no new file was uploaded, check if the URL field was changed
    // We check if pastedUrl is different from the original activity.image_url
    if (!imageFile && pastedUrl !== activity?.image_url) {
      finalImageUrl = pastedUrl;
    }

    const updatedActivity = {
      title: formData.get("title"),
      date: formData.get("date"),
      description: formData.get("description"),
      image_url: finalImageUrl,
      registration_link: formData.get("registration_link"),
    };

    const { error: updateError } = await supabase
      .from("activities")
      .update(updatedActivity)
      .eq("id", id);

    if (updateError) {
      setError("Failed to update activity.");
      setIsSubmitting(false);
    } else {
      router.push("/admin/activities");
      router.refresh();
    }
  };

  const formatDateTimeLocal = (isoDate: string) => {
    // ... (This function remains the same)
    if (!isoDate) return "";
    const date = new Date(isoDate);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!activity) return notFound();

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
          <form onSubmit={handleSubmit} ref={formRef}>
            {/* ... (Title, Date, Description inputs are the same) ... */}
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

            {/* Current Image Preview */}
            {activity.image_url && (
              <div className="mb-3">
                <label className="form-label">Current Image</label>
                <div>
                  <img
                    src={activity.image_url}
                    alt="Current activity image"
                    style={{
                      maxWidth: "200px",
                      height: "auto",
                      borderRadius: "0.25rem",
                    }}
                  />
                </div>
              </div>
            )}

            {/* DUAL IMAGE INPUTS */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload New Image
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
              <div className="form-text">
                Uploading a new image will replace the current one.
              </div>
            </div>
            <div className="text-center my-3 text-muted">OR</div>
            <div className="mb-3">
              <label htmlFor="image_url" className="form-label">
                Update Image URL
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                className="form-control"
                defaultValue={activity.image_url || ""}
              />
            </div>
            {/* ======================= */}

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
