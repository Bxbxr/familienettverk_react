// src/components/activities/ActivityCard.tsx
"use client";

import type { Activity } from "@/lib/types";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const { messages, locale } = useLanguage(); // Get the locale as well
  const activityDate = new Date(activity.date);
  const now = new Date();
  const isPast = activityDate < now;
  const formattedDate = activityDate.toLocaleDateString(
    messages.ActivityCard.locale,
    { year: "numeric", month: "long", day: "numeric" }
  );

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

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <Link href={`/activities/${activity.id}`} className="card-link-wrapper">
        <div
          className={`card h-100 shadow-sm card-hover ${
            isPast ? "text-muted" : ""
          }`}
        >
          <img
            src={activity.image_url || "https://picsum.photos/800/600"}
            className="card-img-top"
            alt={title || ""}
            style={{
              height: "220px",
              objectFit: "cover",
              opacity: isPast ? 0.6 : 1,
            }}
          />
          <div className="card-body d-flex flex-column">
            <div>
              <h5 className="card-title">{title}</h5>{" "}
              {/* Use the dynamic title */}
              <span
                className={`badge mb-2 ${isPast ? "bg-danger" : "bg-success"}`}
              >
                {isPast
                  ? messages.ActivityCard.ended
                  : messages.ActivityCard.upcoming}
              </span>
            </div>
            <p className="card-text small">{formattedDate}</p>
            <p className="card-text flex-grow-1 text-truncate">
              {description} {/* Use the dynamic description */}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
