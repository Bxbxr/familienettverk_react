// src/app/about/page.tsx
"use client";

import Image from "next/image";
import "./about.css";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUsPage() {
  const { messages } = useLanguage();

  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-2 fw-bold mb-4 fade-in-up">
            {messages.AboutPage.headerTitle}
          </h1>
          <p className="lead text-muted fade-in-up-delay-1">
            {messages.AboutPage.headerSubtitle}
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="image-card">
                <Image
                  src="/images/gallery/5.jpg"
                  alt={messages.AboutPage.missionBadge}
                  width={600}
                  height={400}
                  className="img-fluid rounded-4"
                />
                <div className="image-overlay"></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-card">
                <div className="section-badge mb-3">
                  <span className="badge bg-primary bg-gradient px-3 py-2 rounded-pill">
                    {messages.AboutPage.missionBadge}
                  </span>
                </div>
                <h2 className="display-5 fw-bold mb-4">
                  {messages.AboutPage.missionTitle}
                </h2>
                <p className="lead text-muted mb-4">
                  {messages.AboutPage.missionText}
                </p>
                <div className="feature-list">
                  <div className="feature-item d-flex align-items-center mb-3">
                    <div className="feature-icon bg-primary bg-gradient rounded-circle me-3">
                      <span className="text-white">♥</span>
                    </div>
                    <span>{messages.AboutPage.feature1}</span>
                  </div>
                  <div className="feature-item d-flex align-items-center mb-3">
                    <div className="feature-icon bg-success bg-gradient rounded-circle me-3">
                      <span className="text-white">👥</span>
                    </div>
                    <span>{messages.AboutPage.feature2}</span>
                  </div>
                  <div className="feature-item d-flex align-items-center">
                    <div className="feature-icon bg-warning bg-gradient rounded-circle me-3">
                      <span className="text-white">⭐</span>
                    </div>
                    <span>{messages.AboutPage.feature3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="row align-items-center flex-lg-row-reverse">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="vision-graphic">
                <div className="vision-circle">
                  <div className="vision-content text-center p-4">
                    <div className="display-4 text-primary mb-3">💡</div>
                    <h4 className="fw-bold">
                      {messages.AboutPage.visionGraphicTitle}
                    </h4>
                    <p className="small text-muted mb-0">
                      {messages.AboutPage.visionGraphicText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-card">
                <div className="section-badge mb-3">
                  <span className="badge bg-success bg-gradient px-3 py-2 rounded-pill">
                    {messages.AboutPage.visionBadge}
                  </span>
                </div>
                <h2 className="display-5 fw-bold mb-4">
                  {messages.AboutPage.visionTitle}
                </h2>
                <p className="lead text-muted mb-4">
                  {messages.AboutPage.visionText}
                </p>
                <div className="stats-row row text-center">
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="display-6 fw-bold text-primary mb-1">
                        500+
                      </h3>
                      <p className="small text-muted mb-0">
                        {messages.AboutPage.stat1}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="display-6 fw-bold text-success mb-1">
                        50+
                      </h3>
                      <p className="small text-muted mb-0">
                        {messages.AboutPage.stat2}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="display-6 fw-bold text-warning mb-1">
                        2+
                      </h3>
                      <p className="small text-muted mb-0">
                        {messages.AboutPage.stat3}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge mb-3">
              <span className="badge bg-dark px-3 py-2 rounded-pill">
                {messages.AboutPage.teamBadge}
              </span>
            </div>
            <h2 className="display-4 fw-bold mb-3">
              {messages.AboutPage.teamTitle}
            </h2>
            <p className="lead text-muted">{messages.AboutPage.teamSubtitle}</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/sanna.jpg"
                    alt={messages.AboutPage.teamMember1Name}
                    width={300}
                    height={300}
                    className="team-image"
                  />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <span>💼</span>
                      </a>
                      <a href="#" className="social-link">
                        <span>📧</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content">
                  <h5 className="fw-bold mb-1">
                    {messages.AboutPage.teamMember1Name}
                  </h5>
                  <p className="text-primary small mb-2">
                    {messages.AboutPage.teamMember1Role}
                  </p>
                  <p className="small text-muted">
                    {messages.AboutPage.teamMember1Bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/kamal.jpg"
                    alt={messages.AboutPage.teamMember2Name}
                    width={300}
                    height={300}
                    className="team-image"
                  />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <span>💼</span>
                      </a>
                      <a href="#" className="social-link">
                        <span>📧</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content">
                  <h5 className="fw-bold mb-1">
                    {messages.AboutPage.teamMember2Name}
                  </h5>
                  <p className="text-success small mb-2">
                    {messages.AboutPage.teamMember2Role}
                  </p>
                  <p className="small text-muted">
                    {messages.AboutPage.teamMember2Bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/ibrahim.JPG"
                    alt={messages.AboutPage.teamMember3Name}
                    width={300}
                    height={300}
                    className="team-image"
                  />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <span>💼</span>
                      </a>
                      <a href="#" className="social-link">
                        <span>📧</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content">
                  <h5 className="fw-bold mb-1">
                    {messages.AboutPage.teamMember3Name}
                  </h5>
                  <p className="text-warning small mb-2">
                    {messages.AboutPage.teamMember3Role}
                  </p>
                  <p className="small text-muted">
                    {messages.AboutPage.teamMember3Bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/ss.jpg"
                    alt={messages.AboutPage.teamMember4Name}
                    width={300}
                    height={300}
                    className="team-image"
                  />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <span>💼</span>
                      </a>
                      <a href="#" className="social-link">
                        <span>📧</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content">
                  <h5 className="fw-bold mb-1">
                    {messages.AboutPage.teamMember4Name}
                  </h5>
                  <p className="text-info small mb-2">
                    {messages.AboutPage.teamMember4Role}
                  </p>
                  <p className="small text-muted">
                    {messages.AboutPage.teamMember4Bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold text-white mb-4">
                {messages.AboutPage.ctaTitle}
              </h2>
              <p className="lead text-white-50 mb-4">
                {messages.AboutPage.ctaSubtitle}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a href="/volunteer" className="btn btn-light btn-lg px-4">
                  {messages.AboutPage.ctaButtonVolunteer}
                </a>
                <a
                  href="/contact"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  {messages.AboutPage.ctaButtonContact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
