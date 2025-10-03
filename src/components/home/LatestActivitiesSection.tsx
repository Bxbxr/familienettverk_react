// src/components/home/LatestActivitiesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";
import { useLanguage } from "@/context/LanguageContext";

export default function LatestActivitiesSection() {
  const { messages } = useLanguage();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestActivities = async () => {
      setLoading(true);
      const today = new Date().toISOString();

      // ✅ THE FIX IS HERE ✅
      const { data, error } = await supabase
        .from("activities")
        // 1. Explicitly select only the columns defined in your Activity type
        .select(
          `
          id,
          created_at,
          title_no,
          title_ar,
          description_no,
          description_ar,
          start_date,
          end_date,
          image_url,
          registration_link
        `
        )
        // 2. Filter and order by the new 'start_date' column, not the old 'date' column
        .gte("start_date", today)
        .order("start_date", { ascending: true })
        .limit(3);

      if (error) {
        // Now this error log will be more specific if it still fails
        console.error("Feil ved henting av aktiviteter:", error);
        setActivities([]);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    getLatestActivities();
  }, []);

  // Your JSX rendering code below is perfect and does not need to be changed.
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">
          {messages.LatestActivitiesSection?.title}
        </h2>
        <div className="row">
          {loading ? (
            <div className="col text-center">
              <p>{messages.LatestActivitiesSection?.loading}</p>
            </div>
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="col text-center">
              <p>{messages.LatestActivitiesSection?.noActivities}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
