// src/app/(admin)/admin/activities/page.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Activity } from "@/lib/types";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

async function getAllActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: false });

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

      {/* This is a standard Bootstrap Card component */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {/* These are all standard Bootstrap table classes */}
            <table className="table table-hover table-striped table-borderless align-middle">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ minWidth: "300px" }}>
                    Title
                  </th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => {
                  const activityDate = new Date(activity.date);
                  const isPast = activityDate < new Date();
                  const formattedDate = activityDate.toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  );

                  return (
                    <tr key={activity.id}>
                      {/* Use Bootstrap text and font-weight utilities */}
                      <td className="fw-bold">{activity.title}</td>
                      <td className="text-muted">{formattedDate}</td>
                      <td>
                        {/* Use Bootstrap rounded-pill badges */}
                        <span
                          className={`badge rounded-pill text-bg-${
                            isPast ? "secondary" : "success"
                          }`}
                        >
                          {isPast ? "Ended" : "Upcoming"}
                        </span>
                      </td>
                      <td className="text-end">
                        {/* Use standard Bootstrap icon buttons */}
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
