// src/components/home/WhoWeAreSection.tsx
import Link from "next/link";

export default function WhoWeAreSection() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="mb-4">Vårt budskap</h2>
        <p className="lead mb-4">
          Organisasjonen Familienettverk Vi er en sosial organisasjon i Bergen
          som arbeider for å støtte integreringen av kvinner, familier og ungdom
          i det norske samfunnet. Vi ønsker å bygge et trygt og inspirerende
          nettverk, hvor familier kan dele erfaringer, lære om sine rettigheter,
          styrke familiebånd og ta vare på tradisjoner. Gjennom møter,
          aktiviteter og kurs har vi som mål å fremme kunnskap, språk og
          jobbmuligheter, samt gi støtte i utfordrende tider.
        </p>
        <Link href="/about" className="btn btn-outline-secondary">
          Les Mer Om Oss
        </Link>
      </div>
    </section>
  );
}
