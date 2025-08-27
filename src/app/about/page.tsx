// src/app/about/page.tsx
import Image from "next/image";
import "./about.css";

export default function AboutUsPage() {
  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-2 fw-bold mb-4 fade-in-up">Om Oss</h1>
          <p className="lead text-muted fade-in-up-delay-1">
            Vår misjon, visjon og teamet bak Familienettverk
          </p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="image-card">
                <Image
                  src="/images/gallery/5.jpg"
                  alt="Vår misjon"
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
                    Vår Misjon
                  </span>
                </div>
                <h2 className="display-5 fw-bold mb-4">
                  Skape et trygt og inkluderende miljø
                </h2>
                <p className="lead text-muted mb-4">
                  Å skape et trygt, inkluderende og styrkende miljø hvor unge
                  kan knytte kontakter, lære og vokse. Vi streber etter å tilby
                  meningsfulle aktiviteter som fremmer personlig utvikling,
                  samfunnsengasjement og varige vennskap.
                </p>
                <div className="feature-list">
                  <div className="feature-item d-flex align-items-center mb-3">
                    <div className="feature-icon bg-primary bg-gradient rounded-circle me-3">
                      <span className="text-white">♥</span>
                    </div>
                    <span>Inkluderende fellesskap</span>
                  </div>
                  <div className="feature-item d-flex align-items-center mb-3">
                    <div className="feature-icon bg-success bg-gradient rounded-circle me-3">
                      <span className="text-white">👥</span>
                    </div>
                    <span>Personlig utvikling</span>
                  </div>
                  <div className="feature-item d-flex align-items-center">
                    <div className="feature-icon bg-warning bg-gradient rounded-circle me-3">
                      <span className="text-white">⭐</span>
                    </div>
                    <span>Varige vennskap</span>
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
                    <h4 className="fw-bold">Vår Visjon</h4>
                    <p className="small text-muted mb-0">
                      Et samfunn hvor hver unge føler seg verdsatt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-card">
                <div className="section-badge mb-3">
                  <span className="badge bg-success bg-gradient px-3 py-2 rounded-pill">
                    Vår Visjon
                  </span>
                </div>
                <h2 className="display-5 fw-bold mb-4">
                  Et samfunn for alle unge
                </h2>
                <p className="lead text-muted mb-4">
                  Vi ser for oss et samfunn hvor hver unge person føler seg
                  verdsatt, støttet og utstyrt med selvtillit og ferdigheter til
                  å nå sitt fulle potensial og bidra positivt til samfunnet.
                </p>
                <div className="stats-row row text-center">
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="display-6 fw-bold text-primary mb-1">
                        500+
                      </h3>
                      <p className="small text-muted mb-0">Unge deltakere</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="display-6 fw-bold text-success mb-1">
                        50+
                      </h3>
                      <p className="small text-muted mb-0">Aktiviteter</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="display-6 fw-bold text-warning mb-1">
                        10+
                      </h3>
                      <p className="small text-muted mb-0">År erfaring</p>
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
                Vårt Team
              </span>
            </div>
            <h2 className="display-4 fw-bold mb-3">Møt teamet vårt</h2>
            <p className="lead text-muted">
              De fantastiske menneskene som gjør Familienettverk mulig
            </p>
          </div>

          <div className="row g-4">
            {/* Team Member 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/team1.jpg"
                    alt="John Doe"
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
                  <h5 className="fw-bold mb-1">John Doe</h5>
                  <p className="text-primary small mb-2">
                    Grunnlegger & Direktør
                  </p>
                  <p className="small text-muted">
                    Pasjonert for ungdomsarbeid med over 15 års erfaring.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/team2.jpg"
                    alt="Jane Smith"
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
                  <h5 className="fw-bold mb-1">Jane Smith</h5>
                  <p className="text-success small mb-2">Programkoordinator</p>
                  <p className="small text-muted">
                    Ekspert på å lage engasjerende aktiviteter for unge.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/team3.jpg"
                    alt="Mike Johnson"
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
                  <h5 className="fw-bold mb-1">Mike Johnson</h5>
                  <p className="text-warning small mb-2">Ungdomsleder</p>
                  <p className="small text-muted">
                    Fokuserer på mentoring og personlig utvikling.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="team-card h-100">
                <div className="team-image-wrapper">
                  <Image
                    src="/images/team4.jpg"
                    alt="Sarah Wilson"
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
                  <h5 className="fw-bold mb-1">Sarah Wilson</h5>
                  <p className="text-info small mb-2">Frivilligkoordinator</p>
                  <p className="small text-muted">
                    Bygger broer mellom samfunn og ungdom.
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
                Bli en del av familien
              </h2>
              <p className="lead text-white-50 mb-4">
                Vil du være med på å skape positive endringer i unge menneskers
                liv?
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a href="/volunteer" className="btn btn-light btn-lg px-4">
                  Bli frivillig
                </a>
                <a
                  href="/contact"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Kontakt oss
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
