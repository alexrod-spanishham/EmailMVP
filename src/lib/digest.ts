import { supabase } from "./supabase";
import { DailyDigest } from "./types";
import { getMockDigest } from "./mock-data";

interface DigestRow {
  date: string;
  summary: string;
  categories: unknown;
  email_count: number;
  estimated_read_minutes: number;
  created_at: string;
}

function rowToDigest(row: DigestRow): DailyDigest {
  return {
    date: row.date,
    generatedAt: row.created_at,
    totalEmails: row.email_count,
    readingTimeMinutes: row.estimated_read_minutes,
    executiveSummary: row.summary,
    items: Array.isArray(row.categories) ? row.categories : [],
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
