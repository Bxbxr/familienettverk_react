// src/app/activities/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/activities/ActivityCard";
import { useLanguage } from "@/context/LanguageContext";

export default function ActivitiesPage() {
  const { messages } = useLanguage();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllActivities = async () => {
      setLoading(true);

      // ✅ THE FIX IS HERE ✅
      const { data, error } = await supabase
        .from("activities")
        // 1. Explicitly list all columns
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
        // 2. Order by the new 'start_date' column
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Feil ved henting av alle aktiviteter:", error);
        setActivities([]);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    getAllActivities();
  }, []);

  // Your JSX is already perfect. Adding optional chaining for safety.
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{messages.ActivitiesPage?.title}</h1>
        <p className="lead">{messages.ActivitiesPage?.subtitle}</p>
      </div>
      <div className="row">
        {loading ? (
          <div className="col text-center">
            <p>{messages.ActivitiesPage?.loading}</p>
          </div>
        ) : activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="col text-center">
            <p>{messages.ActivitiesPage?.noActivities}</p>
          </div>
        )}
      </div>
    </div>
  );
}
