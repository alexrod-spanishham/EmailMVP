import { CategoryMeta, DigestItem as DigestItemType } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

interface DigestItemProps {
  item: DigestItemType;
  category: CategoryMeta;
}

export function DigestItem({ item, category }: DigestItemProps) {
  return (
    <article className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-muted hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {item.subject}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{item.senderName}</span>
            <span>&middot;</span>
            <span>{formatRelativeTime(item.receivedAt)}</span>
          </div>
        </div>
        {item.actionSuggestion && (
          <div className={`flex-shrink-0 rounded-md px-2 py-1 text-xs font-medium ${category.accentBg} ${category.accentText}`}>
            Action
          </div>
        )}
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        {item.summary}
      </p>

      {item.actionSuggestion && (
        <div className={`mt-3 rounded-md ${category.accentBg} px-3 py-2`}>
          <p className={`text-sm ${category.accentText}`}>
            <span className="font-semibold">Action required: </span>
            {item.actionSuggestion}
          </p>
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
