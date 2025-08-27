// src/components/admin/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  const navLinkClass = (path: string) => {
    // Add startsWith check for dynamic routes like /admin/activities/edit/1
    const isActive = pathname === path || pathname.startsWith(`${path}/`);
    return `nav-link text-white ${isActive ? "active bg-primary" : ""}`;
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "280px", height: "100vh", position: "fixed" }}
    >
      <Link
        href="/admin/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Admin Panel</span>
      </Link>
      <hr />
      {/* === THIS IS THE CORRECTED LIST OF LINKS === */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/admin/dashboard"
            className={navLinkClass("/admin/dashboard")}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/activities"
            className={navLinkClass("/admin/activities")}
          >
            Activities
          </Link>
        </li>
        <li>
          <Link
            href="/admin/volunteers"
            className={navLinkClass("/admin/volunteers")}
          >
            Volunteers
          </Link>
        </li>
      </ul>
      {/* ========================================= */}
      <hr />
      <div>
        <p className="small">Logged in as:</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p style={{ wordBreak: "break-all" }}>{user?.email}</p>
        )}
        <button className="btn btn-outline-light w-100" onClick={signOut}>
          Logout
        </button>
      </div>
    </div>
  );
}
