import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocBySlug, getAllSlugs, getAllDocs } from "@/lib/content";
import { MarkdownRenderer } from "@/app/components/markdown";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug);
  if (!doc) return { title: "Not Found" };
  return {
    title: `${doc.meta.title} – Scottsdale Trip`,
    description: doc.meta.description,
  };
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug);
  if (!doc) notFound();

  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.slug === params.slug);
  const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-desert-400 mb-8">
        <Link
          href="/"
          className="hover:text-terracotta-500 transition-colors"
        >
          Home
        </Link>
        <span>/</span>
        <span className="text-desert-600">{doc.meta.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="text-4xl mb-3">{doc.meta.icon}</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-desert-900 mb-2">
          {doc.meta.title}
        </h1>
        <p className="text-desert-500">{doc.meta.description}</p>
      </div>

      {/* Content */}
      <article className="prose bg-white rounded-xl border border-sand-200 p-6 sm:p-10 shadow-sm">
        <MarkdownRenderer content={doc.content} />
      </article>

      {/* Prev / Next Navigation */}
      <nav className="flex items-center justify-between mt-10 pt-6 border-t border-sand-200">
        {prev ? (
          <Link
            href={`/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-desert-500 hover:text-terracotta-600 transition-colors"
          >
            <span>&larr;</span>
            <span>
              <span className="block text-xs text-desert-400">Previous</span>
              <span className="font-medium group-hover:text-terracotta-600">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-desert-500 hover:text-terracotta-600 transition-colors text-right"
          >
            <span>
              <span className="block text-xs text-desert-400">Next</span>
              <span className="font-medium group-hover:text-terracotta-600">
                {next.title}
              </span>
            </span>
            <span>&rarr;</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
