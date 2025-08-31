// src/components/home/WhoWeAreSection.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext"; // <-- Step 1: Import the hook

export default function WhoWeAreSection() {
  const { messages } = useLanguage(); // <-- Step 2: Use the hook to get translations

  return (
    <section className="py-5">
      <div className="container text-center">
        {/* Step 3: Replace hardcoded text with dynamic values */}
        <h2 className="mb-4">{messages.WhoWeAreSection.title}</h2>
        <p className="lead mb-4" style={{ whiteSpace: "pre-line" }}>
          {messages.WhoWeAreSection.text}
        </p>
        <Link href="/about" className="btn btn-outline-secondary">
          {messages.WhoWeAreSection.button}
        </Link>
      </div>
    </section>
  );
}
