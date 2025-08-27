// src/app/activities/page.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";

// This function fetches ALL activities from the database
async function getAllActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: false }); // Sort by date, newest/upcoming first

  if (error) {
    console.error("Error fetching all activities:", error);
    return [];
  }

  return data || [];
}

export default async function ActivitiesPage() {
  const activities = await getAllActivities();

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Alle Aktiviteter</h1>
        <p className="lead">Browse our upcoming and past events.</p>
      </div>

      <div className="row">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="col text-center">
            <p>There are no activities to display at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
