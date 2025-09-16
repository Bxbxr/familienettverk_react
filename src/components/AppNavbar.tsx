// src/components/AppNavbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function AppNavbar() {
  const pathname = usePathname();
  const { locale, setLocale, messages } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = (path: string) =>
    `nav-link ${pathname === path ? "active" : ""}`;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-solid">
      <div className="container-fluid">
        {/* === THIS IS THE MODIFIED SECTION === */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/images/logo.png"
            alt="Familienettverk Logo"
            width={50} // Adjusted size for better balance with text
            height={50}
            priority
            style={{ objectFit: "contain" }}
          />
          <span className="ms-2 fw-bold" style={{ fontSize: "1.25rem" }}>
            Familienettverk
          </span>
        </Link>
        {/* ===================================== */}

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="navbarNav"
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/"
                className={navLinkClass("/")}
                onClick={handleNavLinkClick}
              >
                {messages.Navbar.home}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/activities"
                className={navLinkClass("/activities")}
                onClick={handleNavLinkClick}
              >
                {messages.Navbar.activities}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/gallery"
                className={navLinkClass("/gallery")}
                onClick={handleNavLinkClick}
              >
                {messages.Navbar.gallery}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={navLinkClass("/about")}
                onClick={handleNavLinkClick}
              >
                {messages.Navbar.about}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/volunteers"
                className={navLinkClass("/volunteers")}
                onClick={handleNavLinkClick}
              >
                {messages.Navbar.volunteer}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={navLinkClass("/contact")}
                onClick={handleNavLinkClick}
              >
                {messages.Navbar.contact}
              </Link>
            </li>
          </ul>

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
