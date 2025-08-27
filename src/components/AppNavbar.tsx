// src/components/AppNavbar.tsx
"use client"; // <-- Needs to be a client component to be interactive

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext"; // <-- Import our hook

export default function AppNavbar() {
  const pathname = usePathname();
  const { locale, setLocale, messages } = useLanguage(); // <-- Use the hook

  const navLinkClass = (path: string) => {
    return `nav-link ${pathname === path ? "active" : ""}`;
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-solid">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          <Image
            src="/images/logo.png"
            alt="Familienettverk Logo"
            width={200}
            height={50}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* Use translated text */}
            <li className="nav-item">
              <Link href="/" className={navLinkClass("/")}>
                {messages.Navbar.home}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/activities" className={navLinkClass("/activities")}>
                {messages.Navbar.activities}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/gallery" className={navLinkClass("/gallery")}>
                {messages.Navbar.gallery}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={navLinkClass("/about")}>
                {messages.Navbar.about}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/volunteers" className={navLinkClass("/volunteers")}>
                {messages.Navbar.volunteer}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={navLinkClass("/contact")}>
                {messages.Navbar.contact}
              </Link>
            </li>
          </ul>

          {/* Functional Language Switcher */}
          <div className="d-flex align-items-center lang-switcher">
            <button
              className={`btn btn-lang ${locale === "no" ? "active" : ""}`}
              onClick={() => setLocale("no")}
            >
              NO
            </button>
            <button
              className={`btn btn-lang ${locale === "ar" ? "active" : ""}`}
              onClick={() => setLocale("ar")}
            >
              AR
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
