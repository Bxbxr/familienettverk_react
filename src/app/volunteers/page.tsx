// src/app/volunteers/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/context/LanguageContext";

export default function VolunteersPage() {
  const { messages } = useLanguage();
  const [formState, setFormState] = useState("idle");
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
      console.error("Feil ved innsending av skjema:", error);
      setErrorMessage(messages.VolunteersPage.errorText);
      setFormState("error");
    } else {
      setFormState("success");
    }
  }

  if (formState === "success") {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">
            {messages.VolunteersPage.successTitle}
          </h4>
          <p>{messages.VolunteersPage.successText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">{messages.VolunteersPage.title}</h1>
        <p className="lead">{messages.VolunteersPage.subtitle}</p>
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
                  {messages.VolunteersPage.form.fullName}
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
                  {messages.VolunteersPage.form.email}
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
                  {messages.VolunteersPage.form.age}
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
                  {messages.VolunteersPage.form.phone}
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
                  {messages.VolunteersPage.form.address}
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
                  {messages.VolunteersPage.form.gender}
                </label>
                <select className="form-select" id="gender" name="gender">
                  <option value="">
                    {messages.VolunteersPage.form.genderChoose}
                  </option>
                  <option value="Male">
                    {messages.VolunteersPage.form.genderMale}
                  </option>
                  <option value="Female">
                    {messages.VolunteersPage.form.genderFemale}
                  </option>
                  <option value="Other">
                    {messages.VolunteersPage.form.genderOther}
                  </option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="commitmentDuration" className="form-label">
                  {messages.VolunteersPage.form.commitment}
                </label>
                <select
                  className="form-select"
                  id="commitmentDuration"
                  name="commitmentDuration"
                >
                  <option value="">
                    {messages.VolunteersPage.form.commitmentChoose}
                  </option>
                  <option value="Short-term (1-3 months)">
                    {messages.VolunteersPage.form.commitmentShort}
                  </option>
                  <option value="Long-term (6+ months)">
                    {messages.VolunteersPage.form.commitmentLong}
                  </option>
                  <option value="Event-based">
                    {messages.VolunteersPage.form.commitmentEvent}
                  </option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="skills" className="form-label">
                  {messages.VolunteersPage.form.skills}
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
                  {messages.VolunteersPage.form.availability}
                </label>
                <select
                  className="form-select"
                  id="availability"
                  name="availability"
                >
                  <option value="">
                    {messages.VolunteersPage.form.availabilityChoose}
                  </option>
                  <option value="Weekdays">
                    {messages.VolunteersPage.form.availabilityWeekdays}
                  </option>
                  <option value="Weekends">
                    {messages.VolunteersPage.form.availabilityWeekends}
                  </option>
                  <option value="Flexible">
                    {messages.VolunteersPage.form.availabilityFlexible}
                  </option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="volunteeringStyle" className="form-label">
                  {messages.VolunteersPage.form.style}
                </label>
                <select
                  className="form-select"
                  id="volunteeringStyle"
                  name="volunteeringStyle"
                >
                  <option value="">
                    {messages.VolunteersPage.form.styleChoose}
                  </option>
                  <option value="In-person">
                    {messages.VolunteersPage.form.styleInPerson}
                  </option>
                  <option value="Online">
                    {messages.VolunteersPage.form.styleOnline}
                  </option>
                  <option value="Both">
                    {messages.VolunteersPage.form.styleBoth}
                  </option>
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
                ? messages.VolunteersPage.form.submitting
                : messages.VolunteersPage.form.submit}
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
