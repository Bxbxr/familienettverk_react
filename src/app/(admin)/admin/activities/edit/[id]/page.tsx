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

  // ... (useEffect hook for fetching data remains the same)
  useEffect(() => {
    if (!id) return;
    const fetchActivity = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        notFound();
      } else {
        setActivity(data as Activity);
      }
      setLoading(false);
    };
    fetchActivity();
  }, [id]);

  // ... (uploadActivityImage function remains the same)
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

    let finalImageUrl: string | null = activity?.image_url || null;
    if (imageFile) {
      const newUrl = await uploadActivityImage();
      if (newUrl) {
        finalImageUrl = newUrl;
      } else {
        setIsSubmitting(false);
        return;
      }
    }

    const formData = new FormData(formRef.current);
    const pastedUrl = formData.get("image_url") as string;
    if (!imageFile && pastedUrl !== activity?.image_url) {
      finalImageUrl = pastedUrl;
    }

    // ✅ UPDATED updatedActivity object
    const updatedActivity = {
      image_url: finalImageUrl,
      registration_link: formData.get("registration_link"),
      title_no: formData.get("title_no"),
      title_ar: formData.get("title_ar"),
      description_no: formData.get("description_no"),
      description_ar: formData.get("description_ar"),
      // Use the new date fields
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date") || null,
    };

    const { error: updateError } = await supabase
      .from("activities")
      .update(updatedActivity)
      .eq("id", id);

    if (updateError) {
      setError("Failed to update activity. " + updateError.message);
      setIsSubmitting(false);
    } else {
      router.push("/admin/activities");
      router.refresh();
    }
  };

  // ... (formatDateTimeLocal function remains the same)
  const formatDateTimeLocal = (isoDate: string | null) => {
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
            <div className="row">
              {/* ... (bilingual title fields are correct) ... */}
              <div className="col-md-6 mb-3">
                {" "}
                <label htmlFor="title_no" className="form-label">
                  Title (Norwegian)
                </label>{" "}
                <input
                  type="text"
                  id="title_no"
                  name="title_no"
                  className="form-control"
                  defaultValue={activity.title_no || ""}
                  required
                />{" "}
              </div>
              <div className="col-md-6 mb-3">
                {" "}
                <label htmlFor="title_ar" className="form-label">
                  Title (Arabic)
                </label>{" "}
                <input
                  type="text"
                  id="title_ar"
                  name="title_ar"
                  className="form-control"
                  defaultValue={activity.title_ar || ""}
                  dir="rtl"
                />{" "}
              </div>
            </div>

            {/* ✅ UPDATED DATE FIELDS ✅ */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="start_date" className="form-label">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="start_date"
                  name="start_date"
                  className="form-control"
                  defaultValue={formatDateTimeLocal(activity.start_date)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="end_date" className="form-label">
                  End Date & Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  name="end_date"
                  className="form-control"
                  defaultValue={formatDateTimeLocal(activity.end_date)}
                />
                <div className="form-text">
                  Leave blank for single-day events.
                </div>
              </div>
            </div>

            <div className="row">
              {/* ... (bilingual description fields are correct) ... */}
              <div className="col-md-6 mb-3">
                {" "}
                <label htmlFor="description_no" className="form-label">
                  Description (Norwegian)
                </label>{" "}
                <textarea
                  id="description_no"
                  name="description_no"
                  className="form-control"
                  rows={4}
                  defaultValue={activity.description_no || ""}
                ></textarea>{" "}
              </div>
              <div className="col-md-6 mb-3">
                {" "}
                <label htmlFor="description_ar" className="form-label">
                  Description (Arabic)
                </label>{" "}
                <textarea
                  id="description_ar"
                  name="description_ar"
                  className="form-control"
                  rows={4}
                  defaultValue={activity.description_ar || ""}
                  dir="rtl"
                ></textarea>{" "}
              </div>
            </div>

            {/* ... (image and registration fields are correct) ... */}
            {activity.image_url && (
              <div className="mb-3">
                {" "}
                <label className="form-label">Current Image</label>{" "}
                <div>
                  {" "}
                  <img
                    src={activity.image_url}
                    alt="Current"
                    style={{ maxWidth: "200px" }}
                  />{" "}
                </div>{" "}
              </div>
            )}
            <div className="mb-3">
              {" "}
              <label htmlFor="image" className="form-label">
                Upload New Image
              </label>{" "}
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => {
                  if (e.target.files) setImageFile(e.target.files[0]);
                }}
              />{" "}
            </div>
            <div className="text-center my-3 text-muted">OR</div>
            <div className="mb-3">
              {" "}
              <label htmlFor="image_url" className="form-label">
                Update Image URL
              </label>{" "}
              <input
                type="url"
                id="image_url"
                name="image_url"
                className="form-control"
                defaultValue={activity.image_url || ""}
              />{" "}
            </div>
            <div className="mb-3">
              {" "}
              <label htmlFor="registration_link" className="form-label">
                Registration Link
              </label>{" "}
              <input
                type="url"
                id="registration_link"
                name="registration_link"
                className="form-control"
                defaultValue={activity.registration_link || ""}
              />{" "}
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
