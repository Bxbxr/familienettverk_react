// src/app/volunteers/page.tsx
"use client"; // Dette må være en klientkomponent for å håndtere skjema og innsending

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
      console.error("Feil ved innsending av skjema:", error);
      setErrorMessage(
        "Det oppstod en feil ved innsending av søknaden. Vennligst prøv igjen."
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
          <h4 className="alert-heading">Tusen takk!</h4>
          <p>
            Din søknad om frivillig arbeid er mottatt. Vi tar kontakt med deg
            snart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Bli Frivillig</h1>
        <p className="lead">
          Bli med i teamet vårt og gjør en forskjell i samfunnet.
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
                  Fullt navn
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
              <div className="col-md-4">
                <label htmlFor="age" className="form-label">
                  Alder
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
                  Telefon
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
                  Adresse
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
                  Kjønn
                </label>
                <select className="form-select" id="gender" name="gender">
                  <option value="">Velg...</option>
                  <option value="Male">Mann</option>
                  <option value="Female">Kvinne</option>
                  <option value="Other">Annet</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="commitmentDuration" className="form-label">
                  Varighet på engasjement
                </label>
                <select
                  className="form-select"
                  id="commitmentDuration"
                  name="commitmentDuration"
                >
                  <option value="">Velg...</option>
                  <option value="Short-term (1-3 months)">
                    Kort sikt (1-3 måneder)
                  </option>
                  <option value="Long-term (6+ months)">
                    Lang sikt (6+ måneder)
                  </option>
                  <option value="Event-based">Basert på arrangementer</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="skills" className="form-label">
                  Ferdigheter (f.eks. undervisning, sport, kunst)
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
                  Tilgjengelighet
                </label>
                <select
                  className="form-select"
                  id="availability"
                  name="availability"
                >
                  <option value="">Velg...</option>
                  <option value="Weekdays">Hverdager</option>
                  <option value="Weekends">Helger</option>
                  <option value="Flexible">Fleksibel</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="volunteeringStyle" className="form-label">
                  Frivillig stil
                </label>
                <select
                  className="form-select"
                  id="volunteeringStyle"
                  name="volunteeringStyle"
                >
                  <option value="">Velg...</option>
                  <option value="In-person">På stedet</option>
                  <option value="Online">Online</option>
                  <option value="Both">Begge</option>
                </select>
              </div>
            </div>

            <hr className="my-4" />

            <button
              type="submit"
              className="w-100 btn btn-primary btn-lg"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? "Sender..." : "Send søknad"}
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
