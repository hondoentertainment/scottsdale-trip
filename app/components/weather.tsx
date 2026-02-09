"use client";

import { useEffect, useState } from "react";
import { fetchWeather, WeatherData, DayForecast } from "@/lib/weather";

/* ── UV Index severity ── */
function uvLevel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: "Low", color: "text-green-600" };
  if (uv <= 5) return { label: "Moderate", color: "text-yellow-600" };
  if (uv <= 7) return { label: "High", color: "text-orange-500" };
  if (uv <= 10) return { label: "Very High", color: "text-red-500" };
  return { label: "Extreme", color: "text-purple-600" };
}

/* ── Single Day Card ── */
function DayCard({ day, index }: { day: DayForecast; index: number }) {
  const uv = uvLevel(day.uvIndexMax);

  return (
    <div
      className={`bg-white rounded-xl border border-sand-200 p-5 hover:shadow-md transition-shadow ${
        index === 0 ? "ring-2 ring-terracotta-300 shadow-md" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-desert-900 text-sm">{day.dayLabel}</p>
          <p className="text-xs text-desert-400">
            {new Date(day.date + "T12:00:00").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span className="text-3xl">{day.weatherIcon}</span>
      </div>

      {/* Temps */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-desert-900">{day.tempMax}°</span>
        <span className="text-sm text-desert-400">/ {day.tempMin}°F</span>
      </div>
      <p className="text-xs text-desert-500 mb-4">{day.weatherLabel}</p>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-y-2.5 text-xs">
        <div>
          <p className="text-desert-400">Precip</p>
          <p className="text-desert-700 font-medium">
            {day.precipitationProbMax}%
            {day.precipitationSum > 0 && (
              <span className="text-desert-400 font-normal">
                {" "}({day.precipitationSum}&quot;)
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="text-desert-400">Wind</p>
          <p className="text-desert-700 font-medium">{day.windSpeedMax} mph</p>
        </div>
        <div>
          <p className="text-desert-400">UV Index</p>
          <p className={`font-medium ${uv.color}`}>
            {day.uvIndexMax} — {uv.label}
          </p>
        </div>
        <div>
          <p className="text-desert-400">Sunrise</p>
          <p className="text-desert-700 font-medium">{day.sunrise}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Trip Summary Bar ── */
function TripSummary({ data }: { data: WeatherData }) {
  const uv = uvLevel(data.tripMaxUV);
  const anyRain = data.days.some((d) => d.precipitationProbMax > 30);

  return (
    <div className="bg-white rounded-xl border border-sand-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-semibold text-desert-900 text-lg">
            7-Day Overview — Scottsdale, AZ
          </h3>
          <p className="text-xs text-desert-400 mt-0.5">
            Live forecast &middot; Updated {data.fetchedAt}
          </p>
        </div>
        <div className="flex gap-4 text-sm flex-wrap">
          <div className="bg-sand-50 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-desert-400">Avg High</p>
            <p className="font-bold text-desert-900">{data.tripAvgHigh}°F</p>
          </div>
          <div className="bg-sand-50 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-desert-400">Avg Low</p>
            <p className="font-bold text-desert-900">{data.tripAvgLow}°F</p>
          </div>
          <div className="bg-sand-50 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-desert-400">Peak UV</p>
            <p className={`font-bold ${uv.color}`}>{data.tripMaxUV}</p>
          </div>
          <div className="bg-sand-50 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-desert-400">Rain Risk</p>
            <p className="font-bold text-desert-900">{anyRain ? "Possible" : "Unlikely"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Activity Advisories ── */
function Advisories({ data }: { data: WeatherData }) {
  const hottest = data.days.reduce((a, b) => (a.tempMax > b.tempMax ? a : b));
  const coolest = data.days.reduce((a, b) => (a.tempMin < b.tempMin ? a : b));
  const highUV = data.days.filter((d) => d.uvIndexMax >= 7);
  const rainyDays = data.days.filter((d) => d.precipitationProbMax > 30);

  return (
    <div className="bg-white rounded-xl border border-sand-200 p-6 mt-6">
      <h3 className="font-semibold text-desert-900 text-lg mb-4">
        Trip Advisories
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        {/* Tom's Thumb */}
        <div className="bg-sand-50 rounded-lg p-4">
          <p className="font-semibold text-desert-800 mb-1">
            &#9968;&#65039; Tom&apos;s Thumb Hike
          </p>
          <p className="text-desert-600">
            Earliest sunrise this week: <strong>{data.days[0].sunrise}</strong>.
            {hottest.tempMax >= 90
              ? ` Highs hit ${hottest.tempMax}°F — start by 6 AM and carry extra water.`
              : ` Temps are manageable, but still start early for the best conditions.`}
          </p>
        </div>

        {/* Pool */}
        <div className="bg-sand-50 rounded-lg p-4">
          <p className="font-semibold text-desert-800 mb-1">
            &#127946; Pool Time
          </p>
          <p className="text-desert-600">
            {highUV.length > 0
              ? `UV hits ${uvLevel(Math.max(...highUV.map((d) => d.uvIndexMax))).label.toLowerCase()} levels on ${highUV.length} day${highUV.length > 1 ? "s" : ""}. Reapply SPF 50+ every 2 hours.`
              : "UV levels are moderate this week. Still apply sunscreen — the desert sun is deceptive."}
          </p>
        </div>

        {/* Zoo */}
        <div className="bg-sand-50 rounded-lg p-4">
          <p className="font-semibold text-desert-800 mb-1">
            &#129421; Phoenix Zoo
          </p>
          <p className="text-desert-600">
            {rainyDays.length > 0
              ? `Rain possible on ${rainyDays.map((d) => d.dayLabel).join(", ")}. Check the forecast morning-of and bring a light layer.`
              : "No rain expected. Bring hats, sunscreen, and water. Shaded rest areas are available throughout the zoo."}
          </p>
        </div>

        {/* Evening */}
        <div className="bg-sand-50 rounded-lg p-4">
          <p className="font-semibold text-desert-800 mb-1">
            &#127769; Evenings
          </p>
          <p className="text-desert-600">
            Lows drop to <strong>{coolest.tempMin}°F</strong> this week.
            {coolest.tempMin < 60
              ? " Pack a light jacket for dinners and evening walks."
              : " Still warm after dark, but a light layer won't hurt."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Loading skeleton ── */
function WeatherSkeleton({ cardCount }: { cardCount: number }) {
  return (
    <div className="animate-pulse">
      <div className="bg-sand-100 rounded-xl h-24 mb-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div key={i} className="bg-sand-100 rounded-xl h-52" />
        ))}
      </div>
    </div>
  );
}

/* ── Full Weather Page Component ── */
export function WeatherFull() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWeather().then(setData).catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="bg-terracotta-50 text-terracotta-700 rounded-xl p-6 text-center">
        <p className="font-medium">Couldn&apos;t load weather data.</p>
        <p className="text-sm mt-1">Check back shortly — the forecast API may be temporarily unavailable.</p>
      </div>
    );
  }

  if (!data) return <WeatherSkeleton cardCount={7} />;

  return (
    <div>
      <TripSummary data={data} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.days.map((day, i) => (
          <DayCard key={day.date} day={day} index={i} />
        ))}
      </div>
      <Advisories data={data} />
    </div>
  );
}

/* ── Compact Weather Preview (for homepage) ── */
export function WeatherPreview() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWeather().then(setData).catch(() => setError(true));
  }, []);

  if (error || !data) {
    return (
      <div className="animate-pulse bg-sand-100 rounded-xl h-32" />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-sand-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-desert-900">
          &#127780;&#65039; Scottsdale Forecast
        </h3>
        <a
          href="/weather"
          className="text-xs font-medium text-terracotta-500 hover:text-terracotta-700 transition-colors"
        >
          Full forecast &rarr;
        </a>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {data.days.map((day, i) => (
          <div
            key={day.date}
            className={`flex-shrink-0 rounded-lg px-3 py-2.5 text-center min-w-[72px] ${
              i === 0
                ? "bg-terracotta-50 border border-terracotta-200"
                : "bg-sand-50"
            }`}
          >
            <p className="text-[11px] text-desert-400 font-medium">{day.dayLabel}</p>
            <p className="text-lg my-0.5">{day.weatherIcon}</p>
            <p className="text-sm font-bold text-desert-900">{day.tempMax}°</p>
            <p className="text-[11px] text-desert-400">{day.tempMin}°</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-desert-400 mt-3 text-right">
        Updated {data.fetchedAt}
      </p>
    </div>
  );
}
