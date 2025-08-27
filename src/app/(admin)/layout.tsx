// src/app/(admin)/layout.tsx
import Sidebar from "@/components/admin/Sidebar";
// ADD these imports for server-side authentication
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- THIS IS THE ROUTE PROTECTION LOGIC ---
  // It runs on the server before the page is sent to the browser.
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no active session, redirect the user to the login page
  if (!session) {
    redirect("/admin/login");
  }
  // --- END OF PROTECTION LOGIC ---

  return (
    <div className="d-flex">
      <Sidebar />
      <main
        className="flex-grow-1 p-4"
        style={{ backgroundColor: "#f8f9fa", marginLeft: "280px" }}
      >
        {children}
      </main>
    </div>
  );
}
