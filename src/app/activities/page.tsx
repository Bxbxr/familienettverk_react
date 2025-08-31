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
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Feil ved henting av aktiviteter:", error);
        setActivities([]);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    getAllActivities();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{messages.ActivitiesPage.title}</h1>
        <p className="lead">{messages.ActivitiesPage.subtitle}</p>
      </div>

      <div className="row">
        {loading ? (
          <div className="col text-center">
            <p>{messages.ActivitiesPage.loading}</p>
          </div>
        ) : activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="col text-center">
            <p>{messages.ActivitiesPage.noActivities}</p>
          </div>
        )}
      </div>
    </div>
  );
}
