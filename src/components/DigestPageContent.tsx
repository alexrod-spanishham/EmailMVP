import { groupByCategory } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { DailyDigest, DigestCategory, DigestItem } from "@/lib/types";
import { DigestMasthead } from "@/components/DigestMasthead";
import { DigestSummary } from "@/components/DigestSummary";
import { DigestTabs } from "@/components/DigestTabs";
import { DigestFooter } from "@/components/DigestFooter";

interface DigestPageContentProps {
  digest: DailyDigest;
}

export function DigestPageContent({ digest }: DigestPageContentProps) {
  const grouped = groupByCategory(digest.items);
  const visibleCategories = CATEGORIES.filter((cat) => grouped.has(cat.key));

  // Convert Map to plain object for client component serialization
  const groupedItems: Record<DigestCategory, DigestItem[]> = {} as Record<
    DigestCategory,
    DigestItem[]
  >;
  for (const [key, items] of grouped) {
    groupedItems[key] = items;
  }

  const categoryCounts: Record<DigestCategory, number> = {} as Record<
    DigestCategory,
    number
  >;
  for (const cat of CATEGORIES) {
    categoryCounts[cat.key] = grouped.get(cat.key)?.length ?? 0;
  }

  return (
    <>
      <DigestMasthead
        date={digest.date}
        totalEmails={digest.totalEmails}
        readingTimeMinutes={digest.readingTimeMinutes}
      />

      <DigestSummary
        summary={digest.executiveSummary}
        categoryCounts={categoryCounts}
      />

      <DigestTabs
        categories={visibleCategories}
        groupedItems={groupedItems}
      />

      <DigestFooter generatedAt={digest.generatedAt} />
    </>
  );
}
