import fs from "fs";
import path from "path";

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  filename: string;
}

const DOCS: DocMeta[] = [
  {
    slug: "master-plan",
    title: "Master Plan",
    description: "Participants, activities, daily flow, and the single source of truth.",
    icon: "\u{1F4CB}",
    order: 1,
    filename: "Scottsdale-Master-Plan.md",
  },
  {
    slug: "itinerary",
    title: "Itinerary",
    description: "Day-by-day schedule with time blocks, sub-groups, and notes.",
    icon: "\u{1F4C5}",
    order: 2,
    filename: "Itinerary.md",
  },
  {
    slug: "logistics",
    title: "Logistics",
    description: "Bookings, driving times, budget estimates, and emergency info.",
    icon: "\u{1F697}",
    order: 3,
    filename: "Logistics.md",
  },
  {
    slug: "packing-list",
    title: "Packing List",
    description: "What to bring — organized by activity, group, and Arizona climate.",
    icon: "\u{1F9F3}",
    order: 4,
    filename: "Packing-List.md",
  },
  {
    slug: "dining-guide",
    title: "Dining Guide",
    description: "Restaurant options, coffee spots, and tips for feeding 14 people.",
    icon: "\u{1F37D}\u{FE0F}",
    order: 5,
    filename: "Dining-Guide.md",
  },
];

const contentDir = path.join(process.cwd(), "content");

export function getAllDocs(): DocMeta[] {
  return DOCS.sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string): { meta: DocMeta; content: string } | null {
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc) return null;

  const filePath = path.join(contentDir, doc.filename);
  const content = fs.readFileSync(filePath, "utf-8");

  return { meta: doc, content };
}

export function getAllSlugs(): string[] {
  return DOCS.map((d) => d.slug);
}
