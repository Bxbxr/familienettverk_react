// src/app/activities/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ActivityDetailPage() {
  const { messages, locale } = useLanguage();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const rawId = useParams().id as string | undefined;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  useEffect(() => {
    if (!id) return;
    const getActivity = async () => {
      setLoading(true);
      // ✅ FIX: Explicitly select the correct columns
      const { data, error } = await supabase
        .from("activities")
        .select(
          `
          id, created_at, title_no, title_ar, description_no, description_ar, start_date, end_date, image_url, registration_link
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching activity detail:", error);
        notFound();
      } else {
        setActivity(data);
      }
      setLoading(false);
    };

    getActivity();
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }
  if (!activity) {
    return null;
  }

  // ✅ FIX: Use the advanced 3-state status logic
  const now = new Date();
  const startDate = new Date(activity.start_date);
  const endDate = activity.end_date ? new Date(activity.end_date) : startDate;

  let statusText = "";
  let statusClass = "";

  if (now < startDate) {
    statusText = messages.ActivityDetailPage.upcoming;
    statusClass = "bg-success";
  } else if (now >= startDate && now <= endDate) {
    statusText = messages.ActivityCard.ongoing; // Use the "ongoing" translation
    statusClass = "bg-primary";
  } else {
    statusText = messages.ActivityDetailPage.ended;
    statusClass = "bg-danger";
  }

  // Fallback logic for titles and descriptions
  const title =
    locale === "ar" && activity.title_ar
      ? activity.title_ar
      : activity.title_no;
  const description =
    locale === "ar" && activity.description_ar
      ? activity.description_ar
      : activity.description_no;

  // ✅ FIX: Format the correct start_date, not the old date
  const formattedDate = startDate.toLocaleDateString(
    messages.ActivityDetailPage.localeWithOptions,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/activities">
                  {messages.ActivityDetailPage.breadcrumb}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="display-4 mb-3">{title}</h1>
          <div className="d-flex align-items-center mb-4">
            <span className={`badge me-3 ${statusClass}`}>{statusText}</span>
            <span className="text-muted">{formattedDate}</span>
          </div>

          <img
            src={activity.image_url || "https://picsum.photos/1200/800"}
            alt={title || "Activity Image"}
            className="img-fluid rounded shadow-sm mb-4"
          />
          <div className="lead">
            <p style={{ whiteSpace: "pre-line" }}>{description}</p>
          </div>

          {/* Show register button only if the event has not ended */}
          {endDate >= now && (
            <div className="mt-5 text-center">
              <Link
                href={activity.registration_link || "#"}
                className="btn btn-primary btn-lg px-5"
                target="_blank"
              >
                {messages.ActivityDetailPage.register}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
