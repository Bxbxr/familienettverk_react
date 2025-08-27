// src/components/activities/ActivityCard.tsx
import type { Activity } from "@/lib/types";
import Link from "next/link";

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const activityDate = new Date(activity.date);
  const now = new Date();
  const isPast = activityDate < now;

  const formattedDate = activityDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            alt={activity.title}
            style={{
              height: "220px",
              objectFit: "cover",
              opacity: isPast ? 0.6 : 1,
            }}
          />
          <div className="card-body d-flex flex-column">
            <div>
              <h5 className="card-title">{activity.title}</h5>
              <span
                className={`badge mb-2 ${isPast ? "bg-danger" : "bg-success"}`}
              >
                {isPast ? "Ended" : "Upcoming"}
              </span>
            </div>
            <p className="card-text small">{formattedDate}</p>
            <p className="card-text flex-grow-1 text-truncate">
              {activity.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
