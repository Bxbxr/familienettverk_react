// src/app/contact/page.tsx
"use client";

import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactUsPage() {
  const { messages } = useLanguage();
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mandypwa";

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{messages.ContactPage.title}</h1>
        <p className="lead">{messages.ContactPage.subtitle}</p>
      </div>

      <div className="row">
        {/* Column 1: Contact Information */}
        <div className="col-lg-5 mb-4 mb-lg-0">
          <div className="p-4 rounded bg-light h-100">
            <h3 className="mb-4">{messages.ContactPage.infoTitle}</h3>
            <p className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="me-3" size={20} />
              <span>{messages.ContactPage.address}</span>
            </p>
            <p className="d-flex align-items-center mb-4">
              <FaEnvelope className="me-3" size={20} />
              <a href="mailto:info@familienettverk.org">
                info@familienettverk.org
              </a>
            </p>

            <h4 className="mb-3">{messages.ContactPage.followUs}</h4>
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
            <h3 className="mb-4">{messages.ContactPage.formTitle}</h3>
            <form action={FORMSPREE_ENDPOINT} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  {messages.ContactPage.formName}
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
                  {messages.ContactPage.formEmail}
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
                  {messages.ContactPage.formMessage}
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
                {messages.ContactPage.formButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
