import { supabase } from "./supabase";
import { DailyDigest, DigestCategory, DigestItem, Priority } from "./types";
import { getMockDigest } from "./mock-data";

interface DigestRow {
  date: string;
  summary: string;
  categories: unknown;
  email_count: number;
  estimated_read_minutes: number;
  created_at: string;
}

// Map n8n category names to DigestCategory keys
const CATEGORY_NAME_MAP: Record<string, DigestCategory> = {
  "action required": "action_required",
  "delegate": "delegate",
  "fyi": "fyi",
  "newsletters": "newsletters",
  "low priority": "low_priority",
};

function parseSender(from: string): { name: string; email: string } {
  const match = from?.match(/^(.+?)\s*<(.+?)>$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  return { name: from || "Unknown", email: "" };
}

const VALID_PRIORITIES = new Set(["high", "medium", "low"]);

// n8n sends grouped categories: [{ name, icon, emails: [...] }]
// Flatten into DigestItem[] that the frontend expects
function flattenCategories(categories: unknown): DigestItem[] {
  if (!Array.isArray(categories)) return [];

  // Detect format: grouped (has `emails` arrays) vs flat (each item has `category`)
  const first = categories[0] as Record<string, unknown> | undefined;
  if (!first) return [];

  // Flat format (DigestItem[] directly) -- use as-is
  if ("category" in first && "subject" in first) {
    return categories as DigestItem[];
  }

  // Grouped format from n8n: [{ name, icon, emails: [...] }]
  const items: DigestItem[] = [];
  for (const group of categories) {
    const g = group as Record<string, unknown>;
    const categoryName = String(g.name || "").toLowerCase();
    const category = CATEGORY_NAME_MAP[categoryName] || "low_priority";
    const emails = Array.isArray(g.emails) ? g.emails : [];

    for (const raw of emails) {
      const e = raw as Record<string, unknown>;
      const sender = parseSender(String(e.from || ""));
      items.push({
        id: String(e.id || `email-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`),
        subject: String(e.subject || "No Subject"),
        senderName: sender.name,
        senderEmail: sender.email,
        summary: String(e.summary || ""),
        category,
        priority: VALID_PRIORITIES.has(String(e.priority)) ? (String(e.priority) as Priority) : "low",
        originalSnippet: String(e.summary || ""),
        receivedAt: String(e.received_at || new Date().toISOString()),
        actionSuggestion: e.action_needed ? String(e.action_needed) : undefined,
        tags: Array.isArray(e.tags) ? e.tags.map(String) : undefined,
      });
    }
  }
  return items;
}

function rowToDigest(row: DigestRow): DailyDigest {
  return {
    date: row.date,
    generatedAt: row.created_at,
    totalEmails: row.email_count,
    readingTimeMinutes: row.estimated_read_minutes,
    executiveSummary: row.summary,
    items: flattenCategories(row.categories),
  };
}

export async function getDigestByDate(
  date: string
): Promise<DailyDigest | null> {
  if (!supabase) {
    const mock = getMockDigest();
    return mock.date === date ? mock : null;
  }

  const { data, error } = await supabase
    .from("digests")
    .select("*")
    .eq("date", date)
    .single();

  if (error || !data) {
    return null;
  }

  return rowToDigest(data as DigestRow);
}

export async function getLatestDigest(): Promise<DailyDigest | null> {
  if (!supabase) {
    return getMockDigest();
  }

  const { data, error } = await supabase
    .from("digests")
    .select("*")
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return rowToDigest(data as DigestRow);
}
