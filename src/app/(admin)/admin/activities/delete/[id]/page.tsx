// src/app/(admin)/admin/activities/delete/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Activity } from "@/lib/types";

export default function DeleteActivityPage() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const rawId = useParams().id as string | undefined;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("id, title") // We only need the title for the confirmation message
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

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    setError(null);

    const { error: deleteError } = await supabase
      .from("activities")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError("Failed to delete activity. It may have already been deleted.");
      setIsDeleting(false);
    } else {
      router.push("/admin/activities");
      router.refresh();
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <div className="card border-danger shadow-sm">
        <div className="card-header bg-danger text-white">
          <h1 className="h4 mb-0">Confirm Deletion</h1>
        </div>
        <div className="card-body">
          {activity ? (
            <p className="lead">
              Are you sure you want to permanently delete the activity:{" "}
              <strong>"{activity.title}"</strong>?
            </p>
          ) : (
            <p className="lead">
              Are you sure you want to delete this activity?
            </p>
          )}
          <p className="text-muted">This action cannot be undone.</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link href="/admin/activities" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
