// src/app/contact/page.tsx
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactUsPage() {
  // ----> PASTE YOUR FORMSPREE ENDPOINT URL HERE <----
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mandypwa";

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Kontakt Oss</h1>
        <p className="lead">
          Vi vil gjerne høre fra deg. Ta kontakt hvis du har spørsmål.
        </p>
      </div>

      <div className="row">
        {/* Column 1: Contact Information */}
        <div className="col-lg-5 mb-4 mb-lg-0">
          <div className="p-4 rounded bg-light h-100">
            <h3 className="mb-4">Kontaktinformasjon</h3>
            <p className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="me-3" size={20} />
              <span>123 Community Lane, Oslo, Norge</span>
            </p>
            <p className="d-flex align-items-center mb-4">
              <FaEnvelope className="me-3" size={20} />
              <a href="mailto:info@familienettverk.org">
                info@familienettverk.org
              </a>
            </p>

            <h4 className="mb-3">Følg Oss</h4>
            <div className="d-flex">
              <a href="#" className="me-3 fs-3" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="fs-3" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Contact Form */}
        <div className="col-lg-7">
          <div className="p-4 rounded border">
            <h3 className="mb-4">Send Oss en Melding</h3>
            <form action={FORMSPREE_ENDPOINT} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Fullt Navn
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-postadresse
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Melding
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows={5}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Melding
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
