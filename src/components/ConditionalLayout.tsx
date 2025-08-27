// src/components/ConditionalLayout.tsx
"use client";
import { usePathname } from "next/navigation";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <AppNavbar />}
      <main style={{ paddingTop: isAdminRoute ? "0" : "70px" }}>
        {children}
      </main>
      {!isAdminRoute && <AppFooter />}
    </>
  );
}
