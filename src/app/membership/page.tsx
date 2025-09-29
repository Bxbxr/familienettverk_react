// src/app/membership/page.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FaUserEdit, FaCreditCard, FaWpforms } from "react-icons/fa";

export default function MembershipPage() {
  const { messages } = useLanguage();
  const googleFormUrl = "https://forms.gle/MHjFLeYsHQCFUon69";

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">
          {messages.MembershipPage.title}
        </h1>
        <p className="lead text-muted">{messages.MembershipPage.subtitle}</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4 p-md-5">
              {/* Step 1 */}
              <div
                className="d-flex mb-4 p-3 rounded-3"
                style={{ backgroundColor: "#f8f9ff" }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <FaUserEdit size={26} />
                  </div>
                </div>
                <div className="ms-4">
                  <div className="badge bg-primary mb-2">STEP 1</div>
                  <h4 className="fw-bold mb-2">
                    {messages.MembershipPage.step1Title}
                  </h4>
                  <p className="text-muted mb-0">
                    {messages.MembershipPage.step1Text}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className="d-flex mb-4 p-3 rounded-3"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="bg-success text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <FaCreditCard size={26} />
                  </div>
                </div>
                <div className="ms-4">
                  <div className="badge bg-success mb-2">STEP 2</div>
                  <h4 className="fw-bold mb-2">
                    {messages.MembershipPage.step2Title}
                  </h4>
                  <p className="text-muted mb-0">
                    {messages.MembershipPage.step2Text}
                  </p>
                </div>
              </div>

              {/* NOTE: You have a mixup here between Step 3 and the Congratulations message.
                  Let's assume this is the final call to action to go to the form.
              */}
              <div
                className="d-flex mb-5 p-3 rounded-3"
                style={{ backgroundColor: "#fff9f0" }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="bg-warning text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <FaWpforms size={24} />
                  </div>
                </div>
                <div className="ms-4">
                  <div className="badge bg-warning mb-2">STEP 3</div>
                  <h4 className="fw-bold mb-2">
                    {messages.MembershipPage.step3Title}
                  </h4>
                  <p className="text-muted mb-0">
                    {messages.MembershipPage.step3Text}
                  </p>
                </div>
              </div>

              <div className="d-grid">
                <Link
                  href={googleFormUrl}
                  className="btn btn-lg rounded-3 fw-bold py-3 btn-animated-gradient"
                  target="_blank"
                  rel="noopener noreferrer"
                  // ✅ ADD THIS STYLE ATTRIBUTE BACK ✅
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 50%, var(--bs-primary) 100%)`,
                  }}
                >
                  <span className="btn-text">
                    {messages.MembershipPage.formButton}
                  </span>
                  <span className="btn-arrow"> →</span>
                </Link>
              </div>

              {/* REMOVED the <style jsx> block */}

              <div className="text-center mt-4">
                <small className="text-muted">
                  ✓ Secure process • ✓ Quick setup • ✓ 24/7 support
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
