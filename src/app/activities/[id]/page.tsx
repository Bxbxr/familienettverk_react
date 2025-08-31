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
    // ... (useEffect hook remains the same)
    if (!id) return;
    const getActivity = async () => {
      setLoading(true);
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
    getActivity();
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }
  if (!activity) {
    return null;
  }

  // ✅ NEW FALLBACK LOGIC ✅
  // If the locale is 'ar' AND title_ar exists, use it. Otherwise, use title_no.
  const title =
    locale === "ar" && activity.title_ar
      ? activity.title_ar
      : activity.title_no;
  const description =
    locale === "ar" && activity.description_ar
      ? activity.description_ar
      : activity.description_no;

  const activityDate = new Date(activity.date);
  const isPast = activityDate < new Date();
  const formattedDate = activityDate.toLocaleDateString(
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
            <span
              className={`badge me-3 ${isPast ? "bg-danger" : "bg-success"}`}
            >
              {isPast
                ? messages.ActivityDetailPage.ended
                : messages.ActivityDetailPage.upcoming}
            </span>
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
          {!isPast && (
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
