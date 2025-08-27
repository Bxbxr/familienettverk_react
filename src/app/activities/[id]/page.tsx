// src/app/activities/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getActivity(id: string): Promise<Activity | null> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id) // Get the one row where the 'id' column matches the id from the URL
    .single(); // We expect only one result

  if (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
  return data;
}

export default async function ActivityDetailPage({ params }: any) {
  const activity = await getActivity(params.id);

  // If no activity is found for the given ID, show a 404 page
  if (!activity) {
    notFound();
  }

  const activityDate = new Date(activity.date);
  const isPast = activityDate < new Date();
  const formattedDate = activityDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/activities">Activities</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {activity.title}
              </li>
            </ol>
          </nav>

          <h1 className="display-4 mb-3">{activity.title}</h1>

          <div className="d-flex align-items-center mb-4">
            <span
              className={`badge me-3 ${isPast ? "bg-danger" : "bg-success"}`}
            >
              {isPast ? "Ended" : "Upcoming"}
            </span>
            <span className="text-muted">{formattedDate}</span>
          </div>

          <img
            src={activity.image_url || "https://picsum.photos/1200/800"}
            alt={activity.title}
            className="img-fluid rounded shadow-sm mb-4"
          />

          <div className="lead">
            <p>{activity.description}</p>
          </div>

          {!isPast && (
            <div className="mt-5 text-center">
              <Link
                href={activity.registration_link || "#"}
                className="btn btn-primary btn-lg px-5"
                target="_blank"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
