// src/app/volunteers/page.tsx
"use client"; // This must be a Client Component to handle form state and submission

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VolunteersPage() {
  const [formState, setFormState] = useState("idle"); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");

    const formData = new FormData(event.currentTarget);
    const volunteerData = {
      full_name: formData.get("fullName"),
      email: formData.get("email"),
      age: formData.get("age") ? parseInt(formData.get("age") as string) : null,
      phone: formData.get("phone"),
      address: formData.get("address"),
      gender: formData.get("gender"),
      skills: formData.get("skills"),
      commitment_duration: formData.get("commitmentDuration"),
      availability: formData.get("availability"),
      volunteering_style: formData.get("volunteeringStyle"),
    };

    const { error } = await supabase.from("volunteers").insert([volunteerData]);

    if (error) {
      console.error("Error submitting volunteer form:", error);
      setErrorMessage(
        "There was an error submitting your application. Please try again."
      );
      setFormState("error");
    } else {
      setFormState("success");
    }
  }

  if (formState === "success") {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Thank You!</h4>
          <p>
            Your volunteer application has been received. We will get in touch
            with you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Become a Volunteer</h1>
        <p className="lead">
          Join our team and make a difference in the community.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg-light"
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                />
              </div>
              <div className="col-md-8">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select className="form-select" id="gender" name="gender">
                  <option value="">Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="commitmentDuration" className="form-label">
                  Commitment Duration
                </label>
                <select
                  className="form-select"
                  id="commitmentDuration"
                  name="commitmentDuration"
                >
                  <option value="">Choose...</option>
                  <option value="Short-term (1-3 months)">
                    Short-term (1-3 months)
                  </option>
                  <option value="Long-term (6+ months)">
                    Long-term (6+ months)
                  </option>
                  <option value="Event-based">Event-based</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="skills" className="form-label">
                  Skills (e.g., teaching, sports, arts)
                </label>
                <textarea
                  className="form-control"
                  id="skills"
                  name="skills"
                  rows={3}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="availability" className="form-label">
                  Availability
                </label>
                <select
                  className="form-select"
                  id="availability"
                  name="availability"
                >
                  <option value="">Choose...</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="volunteeringStyle" className="form-label">
                  Volunteering Style
                </label>
                <select
                  className="form-select"
                  id="volunteeringStyle"
                  name="volunteeringStyle"
                >
                  <option value="">Choose...</option>
                  <option value="In-person">In-person</option>
                  <option value="Online">Online</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            <hr className="my-4" />

            <button
              type="submit"
              className="w-100 btn btn-primary btn-lg"
              disabled={formState === "submitting"}
            >
              {formState === "submitting"
                ? "Submitting..."
                : "Submit Application"}
            </button>

            {formState === "error" && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
