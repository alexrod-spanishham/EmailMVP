import { DigestCategory, DigestItem } from "./types";
import { CATEGORIES } from "./categories";

export function groupByCategory(
  items: DigestItem[]
): Map<DigestCategory, DigestItem[]> {
  const sortOrder = new Map(CATEGORIES.map((c) => [c.key, c.sortOrder]));

  const grouped = new Map<DigestCategory, DigestItem[]>();

  const sorted = [...items].sort((a, b) => {
    const orderA = sortOrder.get(a.category) ?? 99;
    const orderB = sortOrder.get(b.category) ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  for (const item of sorted) {
    const existing = grouped.get(item.category);
    if (existing) {
      existing.push(item);
    } else {
      grouped.set(item.category, [item]);
    }
  }

  return grouped;
}

export function formatDigestDate(isoDate: string): string {
  const date = new Date(isoDate + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(isoDatetime: string): string {
  const now = new Date();
  const then = new Date(isoDatetime);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
