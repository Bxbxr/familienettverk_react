// src/components/home/LatestActivitiesSection.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";

async function getLatestActivities(): Promise<Activity[]> {
  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .gte("date", today) // gte = større enn eller lik i dag
    .order("date", { ascending: true }) // Vis de tidligste aktivitetene først
    .limit(3); // Hent bare de neste 3

  if (error) {
    console.error("Feil ved henting av aktiviteter:", error);
    return [];
  }

  return data || [];
}

export default async function LatestActivitiesSection() {
  const activities = await getLatestActivities();

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Kommende Aktiviteter</h2>
        <div className="row">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="col text-center">
              <p>
                Ingen kommende aktiviteter er planlagt for øyeblikket. Vennligst
                sjekk igjen snart!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
