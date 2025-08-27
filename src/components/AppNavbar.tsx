// src/components/AppNavbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
  const pathname = usePathname();

  const navLinkClass = (path: string) => {
    return `nav-link ${pathname === path ? "active" : ""}`;
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-solid">
      <div className="container-fluid">
        {/* Part 1: Logo (Stays on the left) */}
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

        {/* Mobile Hamburger Button (No change needed) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu - THIS IS THE CORRECTED STRUCTURE */}
        <div id="navbarNav" className="collapse navbar-collapse">
          {/* Part 2: Main Navigation Links (Centered) */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={navLinkClass("/")}>
                Hjem
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/activities" className={navLinkClass("/activities")}>
                Aktiviteter
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/gallery" className={navLinkClass("/gallery")}>
                Galleri
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={navLinkClass("/about")}>
                Om Oss
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/volunteers" className={navLinkClass("/volunteers")}>
                Frivillige
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={navLinkClass("/contact")}>
                Kontakt
              </Link>
            </li>
          </ul>

          {/* Part 3: Language Switcher (Pushed to the right) */}
          <div className="navbar-nav">
            <div className="d-flex align-items-center lang-switcher">
              <button className="btn btn-lang active">NO</button>
              <button className="btn btn-lang">AR</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
