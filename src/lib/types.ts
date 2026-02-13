export type DigestCategory =
  | "action_required"
  | "delegate"
  | "fyi"
  | "newsletters"
  | "low_priority";

export type Priority = "high" | "medium" | "low";

export interface DigestItem {
  id: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  summary: string;
  category: DigestCategory;
  priority: Priority;
  originalSnippet: string;
  receivedAt: string;
  actionSuggestion?: string;
  draftResponse?: string;
  tags?: string[];
  webLink?: string;
}

export interface DailyDigest {
  date: string;
  generatedAt: string;
  totalEmails: number;
  readingTimeMinutes: number;
  executiveSummary: string;
  items: DigestItem[];
}

export interface CategoryMeta {
  key: DigestCategory;
  label: string;
  description: string;
  emoji: string;
  sortOrder: number;
  accentColor: string;
  accentBg: string;
  accentText: string;
}
