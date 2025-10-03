// src/app/(admin)/admin/activities/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Activity } from "@/lib/types";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

async function getAllActivities(): Promise<Activity[]> {
  // Use server component client for server-side fetching
  const supabase = createServerComponentClient({ cookies });

  // ✅ THE FIX IS HERE ✅
  const { data, error } = await supabase
    .from("activities")
    // 1. Explicitly select all columns
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
    // 2. Order by the correct 'start_date' column
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching activities for admin:", error);
    return [];
  }
  return data || [];
}

export default async function AdminActivitiesPage() {
  const activities = await getAllActivities();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Activities Management</h1>
        <Link href="/admin/activities/create" className="btn btn-primary">
          <FaPlusCircle className="me-2" />
          Create New Activity
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped table-borderless align-middle">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ minWidth: "300px" }}>
                    Title (Norwegian)
                  </th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => {
                  // ✅ NEW STATUS LOGIC COPIED FROM ACTIVITY CARD ✅
                  const now = new Date();
                  const startDate = new Date(activity.start_date);
                  const endDate = activity.end_date
                    ? new Date(activity.end_date)
                    : startDate;

                  let status: "upcoming" | "ongoing" | "ended";
                  let statusClass = "";

                  if (now < startDate) {
                    status = "upcoming";
                    statusClass = "text-bg-success";
                  } else if (now >= startDate && now <= endDate) {
                    status = "ongoing";
                    statusClass = "text-bg-primary";
                  } else {
                    status = "ended";
                    statusClass = "text-bg-secondary";
                  }

                  const formattedDate = startDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  });

                  return (
                    <tr key={activity.id}>
                      <td className="fw-bold">{activity.title_no}</td>
                      <td className="text-muted">{formattedDate}</td>
                      <td>
                        <span className={`badge rounded-pill ${statusClass}`}>
                          {/* Capitalize first letter for display */}
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          href={`/admin/activities/edit/${activity.id}`}
                          className="btn btn-sm btn-outline-secondary me-2"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          href={`/admin/activities/delete/${activity.id}`}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <FaTrash />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {activities.length === 0 && (
          <div className="card-footer text-center">
            No activities found. Use the button above to create one.
          </div>
        )}
      </div>
    </div>
  );
}
