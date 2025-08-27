// src/app/(admin)/admin/dashboard/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FaUsers, FaCalendarAlt, FaEye } from "react-icons/fa"; // <-- Add FaEye icon

async function getStats() {
  const supabase = createServerComponentClient({ cookies });

  const { count: volunteerCount, error: volunteerError } = await supabase
    .from("volunteers")
    .select("*", { count: "exact", head: true });

  const { count: activityCount, error: activityError } = await supabase
    .from("activities")
    .select("*", { count: "exact", head: true });

  if (volunteerError || activityError) {
    console.error("Error fetching stats:", volunteerError || activityError);
    return { volunteerCount: null, activityCount: null };
  }

  return { volunteerCount, activityCount };
}

export default async function DashboardPage() {
  const { volunteerCount, activityCount } = await getStats();

  return (
    <div>
      <h1 className="h2 mb-4">Dashboard</h1>

      <div className="row">
        {/* Volunteers Stat Card */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <FaUsers size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="card-title text-muted mb-1">
                    Total Volunteers
                  </h5>
                  {volunteerCount !== null ? (
                    <p className="h2 fw-bold mb-0">{volunteerCount}</p>
                  ) : (
                    <p className="text-danger mb-0">Error</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Stat Card */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div
                    className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <FaCalendarAlt size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="card-title text-muted mb-1">
                    Total Activities
                  </h5>
                  {activityCount !== null ? (
                    <p className="h2 fw-bold mb-0">{activityCount}</p>
                  ) : (
                    <p className="text-danger mb-0">Error</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === NEW: Total Visitors Placeholder Card === */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div
                    className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <FaEye size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="card-title text-muted mb-1">Total Visitors</h5>
                  <p className="h2 fw-bold mb-0">N/A</p>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0 text-muted small">
              Analytics enabled upon deployment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
