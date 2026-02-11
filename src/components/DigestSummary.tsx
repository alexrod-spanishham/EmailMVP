import { DigestCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";

interface DigestSummaryProps {
  summary: string;
  categoryCounts: Record<DigestCategory, number>;
}

export function DigestSummary({ summary, categoryCounts }: DigestSummaryProps) {
  return (
    <section className="mt-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Executive Summary
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground">
          {summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.key] ?? 0;
            if (count === 0) return null;
            return (
              <div
                key={cat.key}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              >
                <span className="text-xs">{cat.emoji}</span>
                <span className="font-semibold text-foreground">{count}</span>
                <span className="text-muted">{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
