import Link from "next/link";
import { WeatherFull } from "@/app/components/weather";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather – Scottsdale Trip",
  description: "Live 7-day weather forecast for Scottsdale, AZ with trip activity advisories.",
};

export default function WeatherPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-desert-400 mb-8">
        <Link href="/" className="hover:text-terracotta-500 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-desert-600">Weather</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="text-4xl mb-3">&#127780;&#65039;</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-desert-900 mb-2">
          Weather Forecast
        </h1>
        <p className="text-desert-500">
          Live 7-day forecast for Scottsdale, AZ — with activity advisories for the trip.
        </p>
      </div>

      {/* Weather Component */}
      <WeatherFull />

      {/* Hydration Callout */}
      <div className="mt-8 bg-gradient-to-r from-sand-100 to-terracotta-50 rounded-xl border border-sand-200 p-6">
        <h3 className="font-semibold text-desert-900 mb-2">
          &#128167; Desert Hydration Reminder
        </h3>
        <p className="text-sm text-desert-600 leading-relaxed">
          Scottsdale&apos;s dry heat means you lose moisture faster than you realize.
          <strong> Drink water before you feel thirsty.</strong> Aim for at least
          half your body weight in ounces per day, more on hiking or extended outdoor days.
          Keep a reusable water bottle on you at all times — and don&apos;t forget the kids.
        </p>
      </div>

      {/* Quick Sun Safety */}
      <div className="mt-4 bg-white rounded-xl border border-sand-200 p-6">
        <h3 className="font-semibold text-desert-900 mb-3">
          &#9728;&#65039; Sun Safety Quick Reference
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-desert-600">
          <div className="flex gap-2">
            <span className="text-terracotta-400 mt-0.5">&#9679;</span>
            <p>Apply SPF 50+ sunscreen 15 minutes before going outside</p>
          </div>
          <div className="flex gap-2">
            <span className="text-terracotta-400 mt-0.5">&#9679;</span>
            <p>Reapply every 2 hours and immediately after swimming</p>
          </div>
          <div className="flex gap-2">
            <span className="text-terracotta-400 mt-0.5">&#9679;</span>
            <p>Peak UV hours are 10 AM – 4 PM — seek shade when possible</p>
          </div>
          <div className="flex gap-2">
            <span className="text-terracotta-400 mt-0.5">&#9679;</span>
            <p>Hats, sunglasses, and light long sleeves for extended exposure</p>
          </div>
          <div className="flex gap-2">
            <span className="text-terracotta-400 mt-0.5">&#9679;</span>
            <p>Use rash guards on kids for long pool and zoo days</p>
          </div>
          <div className="flex gap-2">
            <span className="text-terracotta-400 mt-0.5">&#9679;</span>
            <p>Pack aloe vera — even careful planning can&apos;t prevent every burn</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between mt-10 pt-6 border-t border-sand-200">
        <Link
          href="/"
          className="text-sm text-desert-500 hover:text-terracotta-600 transition-colors"
        >
          &larr; Back to Home
        </Link>
        <Link
          href="/packing-list"
          className="group flex items-center gap-2 text-sm text-desert-500 hover:text-terracotta-600 transition-colors"
        >
          <span>
            <span className="block text-xs text-desert-400">Related</span>
            <span className="font-medium group-hover:text-terracotta-600">Packing List</span>
          </span>
          <span>&rarr;</span>
        </Link>
      </nav>
    </div>
  );
}
