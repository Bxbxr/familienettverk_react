// src/app/activities/page.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";

// Denne funksjonen henter ALLE aktiviteter fra databasen
async function getAllActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: false }); // Sorter etter dato, nyeste/fremtidige først

  if (error) {
    console.error("Feil ved henting av aktiviteter:", error);
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
        <p className="lead">
          Utforsk våre kommende og tidligere arrangementer.
        </p>
      </div>

      <div className="row">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="col text-center">
            <p>Det er ingen aktiviteter å vise for øyeblikket.</p>
          </div>
        )}
      </div>
    </div>
  );
}
