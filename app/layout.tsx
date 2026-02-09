import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scottsdale Trip",
  description: "Scottsdale Family Vacation – Master Plan & Trip Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand-50 text-desert-900 min-h-screen">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-sand-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">&#9728;&#65039;</span>
              <span className="font-bold text-lg text-desert-900 group-hover:text-terracotta-600 transition-colors">
                Scottsdale Trip
              </span>
            </a>
            <span className="text-xs text-desert-400 hidden sm:block">
              Family Vacation HQ
            </span>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-sand-200 mt-16 py-8 text-center text-sm text-desert-400">
          Scottsdale Family Vacation &middot; 14 people &middot; 1 great trip
        </footer>
      </body>
    </html>
  );
}
