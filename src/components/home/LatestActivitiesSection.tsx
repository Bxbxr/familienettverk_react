// src/components/home/LatestActivitiesSection.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";

async function getLatestActivities(): Promise<Activity[]> {
  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .gte("date", today) // gte = Greater than or equal to today
    .order("date", { ascending: true }) // Show the soonest activities first
    .limit(3); // Only get the next 3

  if (error) {
    console.error("Error fetching activities:", error);
    return [];
  }

  return data || [];
}

export default async function LatestActivitiesSection() {
  const activities = await getLatestActivities();

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Upcoming Activities</h2>
        <div className="row">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="col text-center">
              <p>
                No upcoming activities scheduled at the moment. Please check
                back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
