import Link from "next/link";
import { getAllDocs } from "@/lib/content";

export default function Home() {
  const docs = getAllDocs();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-desert-900 mb-3">
          Scottsdale Family Vacation
        </h1>
        <p className="text-lg text-desert-500 max-w-xl mx-auto mb-2">
          14 people &middot; Hilton Scottsdale Village Mirage &middot; Arizona
        </p>
        <div className="flex items-center justify-center gap-3 mt-6 text-sm text-desert-400 flex-wrap">
          <span className="bg-sand-100 px-3 py-1 rounded-full">11 Adults</span>
          <span className="bg-sand-100 px-3 py-1 rounded-full">3 Kids</span>
          <span className="bg-terracotta-50 text-terracotta-600 px-3 py-1 rounded-full">5 Days</span>
        </div>
      </section>

      {/* Document Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-16">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/${doc.slug}`}
            className="group block bg-white rounded-xl border border-sand-200 p-6 hover:border-terracotta-300 hover:shadow-lg hover:shadow-terracotta-100/50 transition-all duration-200"
          >
            <div className="text-3xl mb-3">{doc.icon}</div>
            <h2 className="text-lg font-semibold text-desert-900 group-hover:text-terracotta-600 transition-colors mb-1">
              {doc.title}
            </h2>
            <p className="text-sm text-desert-500 leading-relaxed">
              {doc.description}
            </p>
            <div className="mt-4 text-xs font-medium text-terracotta-500 opacity-0 group-hover:opacity-100 transition-opacity">
              View &rarr;
            </div>
          </Link>
        ))}
      </section>

      {/* Quick Reference */}
      <section className="border-t border-sand-200 pt-10 pb-8">
        <h2 className="text-xl font-bold text-desert-800 mb-6 text-center">
          Quick Reference
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          <div className="bg-white rounded-lg border border-sand-200 p-5">
            <h3 className="font-semibold text-desert-700 mb-3">
              &#127968; Base
            </h3>
            <p className="text-desert-600">Hilton Scottsdale Village Mirage</p>
            <p className="text-desert-400 text-xs mt-1">
              Central Scottsdale &middot; Pool &middot; Near Old Town
            </p>
          </div>
          <div className="bg-white rounded-lg border border-sand-200 p-5">
            <h3 className="font-semibold text-desert-700 mb-3">
              &#9968;&#65039; Key Activities
            </h3>
            <ul className="text-desert-600 space-y-1">
              <li>Phoenix Zoo</li>
              <li>Tom&apos;s Thumb Hike</li>
              <li>Papago Park</li>
              <li>Hotel Pool</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg border border-sand-200 p-5">
            <h3 className="font-semibold text-desert-700 mb-3">
              &#128101; The Crew
            </h3>
            <p className="text-desert-600">
              Kyle, Mark F., Mark H., Robin, Jake, Madison, Emily, Dan, Willow,
              Luke, Wren
            </p>
            <p className="text-desert-400 text-xs mt-1">
              + Hadley, Hattie, Harper
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
