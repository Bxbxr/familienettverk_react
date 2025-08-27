// src/app/(admin)/admin/volunteers/VolunteerActionButtons.tsx
"use client";
import { FaPrint, FaFileCsv } from "react-icons/fa";

// We need to define the type for a volunteer, you might already have this
interface Volunteer {
  id: number;
  created_at: string;
  full_name: string;
  email: string;
  age: number | null;
  phone: string;
  address: string | null;
  gender: string | null;
  skills: string | null;
  commitment_duration: string | null;
  availability: string | null;
  volunteering_style: string | null;
}

export default function VolunteerActionButtons({
  volunteers,
}: {
  volunteers: Volunteer[];
}) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    if (volunteers.length === 0) return;

    const headers = Object.keys(volunteers[0]);
    const csvContent = [
      headers.join(","),
      ...volunteers.map((row) =>
        headers
          .map((header) =>
            JSON.stringify((row as never)[header], (key, value) =>
              value === null ? "" : value
            )
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `volunteers_report_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="d-flex gap-2">
      <button className="btn btn-outline-secondary" onClick={handlePrint}>
        <FaPrint className="me-2" />
        Print
      </button>
      <button className="btn btn-outline-secondary" onClick={handleDownloadCsv}>
        <FaFileCsv className="me-2" />
        Download CSV
      </button>
    </div>
  );
}
