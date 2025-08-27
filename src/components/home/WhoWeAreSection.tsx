// src/components/home/WhoWeAreSection.tsx
import Link from "next/link";

export default function WhoWeAreSection() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="mb-4">Who We Are</h2>
        <p className="lead mb-4">
          Familienettverk is a youth organization dedicated to creating a
          positive and inclusive environment for everyone.
        </p>
        <Link href="/about" className="btn btn-outline-secondary">
          Learn More About Us
        </Link>
      </div>
    </section>
  );
}
