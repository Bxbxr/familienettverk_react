// src/app/(admin)/admin/volunteers/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FaPrint, FaFileCsv } from "react-icons/fa";

// Since this is a server component, we need a separate way to get the data
async function getVolunteers() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching volunteers:", error);
    return [];
  }
  return data;
}

// We will create this client component next for the buttons
import VolunteerActionButtons from "./VolunteerActionButtons";

export default async function AdminVolunteersPage() {
  const volunteers = await getVolunteers();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Volunteers Management</h1>
        <VolunteerActionButtons volunteers={volunteers} />
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped table-borderless align-middle">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Skills</th>
                  <th>Availability</th>
                  <th>Style</th>
                  <th>Submitted On</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((v) => (
                  <tr key={v.id}>
                    <td className="fw-bold">{v.full_name}</td>
                    <td>{v.email}</td>
                    <td>{v.phone}</td>
                    <td>{v.age}</td>
                    <td>{v.skills}</td>
                    <td>{v.availability}</td>
                    <td>{v.volunteering_style}</td>
                    <td className="text-muted">
                      {new Date(v.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {volunteers.length === 0 && (
          <div className="card-footer text-center">
            No volunteer submissions found.
          </div>
        )}
      </div>
    </div>
  );
}
