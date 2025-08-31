// src/components/home/LatestActivitiesSection.tsx
"use client"; // <-- Step 1: Convert to a Client Component

import { useState, useEffect } from "react"; // <-- Step 2: Import React hooks
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";
import { useLanguage } from "@/context/LanguageContext"; // <-- Step 3: Import our hook

export default function LatestActivitiesSection() {
  const { messages } = useLanguage(); // <-- Step 4: Use the hook to get translations
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Step 5: Move data fetching into a useEffect hook
  useEffect(() => {
    const getLatestActivities = async () => {
      setLoading(true);
      const today = new Date().toISOString();
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .gte("date", today)
        .order("date", { ascending: true })
        .limit(3);

      if (error) {
        console.error("Feil ved henting av aktiviteter:", error);
        setActivities([]);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    getLatestActivities();
  }, []); // Empty array ensures this runs only once on mount

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Step 6: Replace hardcoded text with dynamic values */}
        <h2 className="text-center mb-5">
          {messages.LatestActivitiesSection.title}
        </h2>
        <div className="row">
          {loading ? (
            <div className="col text-center">
              <p>{messages.LatestActivitiesSection.loading}</p>
            </div>
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="col text-center">
              <p>{messages.LatestActivitiesSection.noActivities}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
