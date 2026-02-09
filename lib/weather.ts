// Scottsdale, AZ coordinates
const LATITUDE = 33.4942;
const LONGITUDE = -111.9261;

export interface DayForecast {
  date: string;
  dayLabel: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  weatherLabel: string;
  weatherIcon: string;
  precipitationSum: number;
  precipitationProbMax: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
  windSpeedMax: number;
}

export interface WeatherData {
  days: DayForecast[];
  fetchedAt: string;
  tripAvgHigh: number;
  tripAvgLow: number;
  tripMaxUV: number;
}

// WMO Weather Code mapping
function decodeWeatherCode(code: number): { label: string; icon: string } {
  const map: Record<number, { label: string; icon: string }> = {
    0: { label: "Clear sky", icon: "\u2600\uFE0F" },
    1: { label: "Mainly clear", icon: "\u{1F324}\uFE0F" },
    2: { label: "Partly cloudy", icon: "\u26C5" },
    3: { label: "Overcast", icon: "\u2601\uFE0F" },
    45: { label: "Foggy", icon: "\u{1F32B}\uFE0F" },
    48: { label: "Icy fog", icon: "\u{1F32B}\uFE0F" },
    51: { label: "Light drizzle", icon: "\u{1F326}\uFE0F" },
    53: { label: "Drizzle", icon: "\u{1F326}\uFE0F" },
    55: { label: "Heavy drizzle", icon: "\u{1F326}\uFE0F" },
    61: { label: "Light rain", icon: "\u{1F327}\uFE0F" },
    63: { label: "Rain", icon: "\u{1F327}\uFE0F" },
    65: { label: "Heavy rain", icon: "\u{1F327}\uFE0F" },
    71: { label: "Light snow", icon: "\u2744\uFE0F" },
    73: { label: "Snow", icon: "\u2744\uFE0F" },
    75: { label: "Heavy snow", icon: "\u2744\uFE0F" },
    77: { label: "Snow grains", icon: "\u{1F328}\uFE0F" },
    80: { label: "Light showers", icon: "\u{1F326}\uFE0F" },
    81: { label: "Showers", icon: "\u{1F327}\uFE0F" },
    82: { label: "Heavy showers", icon: "\u{1F327}\uFE0F" },
    85: { label: "Snow showers", icon: "\u{1F328}\uFE0F" },
    86: { label: "Heavy snow showers", icon: "\u{1F328}\uFE0F" },
    95: { label: "Thunderstorm", icon: "\u26C8\uFE0F" },
    96: { label: "Thunderstorm + hail", icon: "\u26C8\uFE0F" },
    99: { label: "Severe thunderstorm", icon: "\u26C8\uFE0F" },
  };
  return map[code] ?? { label: "Unknown", icon: "\u{1F300}" };
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const diffDays = Math.round(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const API_URL =
  `https://api.open-meteo.com/v1/forecast?` +
  `latitude=${LATITUDE}&longitude=${LONGITUDE}` +
  `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weathercode,sunrise,sunset,uv_index_max,wind_speed_10m_max` +
  `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch` +
  `&timezone=America/Phoenix&forecast_days=7`;

export async function fetchWeather(): Promise<WeatherData> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch weather data");

  const data = await res.json();
  const daily = data.daily;

  const days: DayForecast[] = daily.time.map((date: string, i: number) => {
    const decoded = decodeWeatherCode(daily.weathercode[i]);
    return {
      date,
      dayLabel: formatDay(date),
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      weatherCode: daily.weathercode[i],
      weatherLabel: decoded.label,
      weatherIcon: decoded.icon,
      precipitationSum: daily.precipitation_sum[i],
      precipitationProbMax: daily.precipitation_probability_max[i],
      uvIndexMax: daily.uv_index_max[i],
      sunrise: formatTime(daily.sunrise[i]),
      sunset: formatTime(daily.sunset[i]),
      windSpeedMax: Math.round(daily.wind_speed_10m_max[i]),
    };
  });

  const highs = days.map((d) => d.tempMax);
  const lows = days.map((d) => d.tempMin);
  const uvs = days.map((d) => d.uvIndexMax);

  return {
    days,
    fetchedAt: new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" }),
    tripAvgHigh: Math.round(highs.reduce((a, b) => a + b, 0) / highs.length),
    tripAvgLow: Math.round(lows.reduce((a, b) => a + b, 0) / lows.length),
    tripMaxUV: Math.round(Math.max(...uvs) * 10) / 10,
  };
}
