// src/components/activities/ActivityCard.tsx
"use client";

import type { Activity } from "@/lib/types";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const { messages, locale } = useLanguage();

  // ✅ NEW STATUS LOGIC ✅
  const now = new Date();
  const startDate = new Date(activity.start_date);
  // If end_date is null, use startDate for single-day events
  const endDate = activity.end_date ? new Date(activity.end_date) : startDate;

  let status: "upcoming" | "ongoing" | "ended";
  let statusClass = "";
  let statusText = "";

  if (now < startDate) {
    status = "upcoming";
    statusClass = "bg-success";
    statusText = messages.ActivityCard.upcoming;
  } else if (now >= startDate && now <= endDate) {
    status = "ongoing";
    statusClass = "bg-primary"; // Use a different color for "Ongoing"
    statusText = messages.ActivityCard.ongoing;
  } else {
    status = "ended";
    statusClass = "bg-danger";
    statusText = messages.ActivityCard.ended;
  }

  // Use start_date for formatting
  const formattedDate = startDate.toLocaleDateString(
    messages.ActivityCard.locale,
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Fallback logic for titles and descriptions
  const title =
    locale === "ar" && activity.title_ar
      ? activity.title_ar
      : activity.title_no;
  const description =
    locale === "ar" && activity.description_ar
      ? activity.description_ar
      : activity.description_no;

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <Link href={`/activities/${activity.id}`} className="card-link-wrapper">
        <div
          className={`card h-100 shadow-sm card-hover ${
            status === "ended" ? "text-muted" : ""
          }`}
        >
          <img
            src={activity.image_url || "https://picsum.photos/800/600"}
            className="card-img-top"
            alt={title || ""}
            style={{
              height: "220px",
              objectFit: "cover",
              opacity: status === "ended" ? 0.6 : 1,
            }}
          />
          <div className="card-body d-flex flex-column">
            <div>
              <h5 className="card-title">{title}</h5>

              {/* ✅ UPDATED BADGE ✅ */}
              <span className={`badge mb-2 ${statusClass}`}>{statusText}</span>
            </div>
            <p className="card-text small">{formattedDate}</p>
            <p className="card-text flex-grow-1 text-truncate">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
