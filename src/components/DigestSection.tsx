import { CategoryMeta, DigestItem as DigestItemType } from "@/lib/types";
import { DigestItem } from "./DigestItem";

interface DigestSectionProps {
  category: CategoryMeta;
  items: DigestItemType[];
}

export function DigestSection({ category, items }: DigestSectionProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{category.emoji}</span>
          <h2 className="text-sm font-semibold text-foreground">
            {category.label}
          </h2>
          <span className="text-xs text-muted-foreground">
            ({items.length})
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <DigestItem key={item.id} item={item} category={category} />
        ))}
      </div>
    </section>
  );
}
