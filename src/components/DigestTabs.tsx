"use client";

import { useState } from "react";
import { CategoryMeta, DigestCategory, DigestItem as DigestItemType } from "@/lib/types";
import { DigestSection } from "./DigestSection";

interface DigestTabsProps {
  categories: CategoryMeta[];
  groupedItems: Record<DigestCategory, DigestItemType[]>;
}

export function DigestTabs({ categories, groupedItems }: DigestTabsProps) {
  const [activeTab, setActiveTab] = useState<DigestCategory | "all">("all");

  const visibleCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) => cat.key === activeTab);

  return (
    <div className="mt-6">
      <div className="border-b border-border">
        <nav className="flex gap-1">
          <TabButton
            label="All"
            count={Object.values(groupedItems).reduce((s, arr) => s + arr.length, 0)}
            isActive={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          />
          {categories.map((cat) => (
            <TabButton
              key={cat.key}
              label={cat.label}
              emoji={cat.emoji}
              count={groupedItems[cat.key]?.length ?? 0}
              isActive={activeTab === cat.key}
              onClick={() => setActiveTab(cat.key)}
            />
          ))}
        </nav>
      </div>

      <div className="mt-4 space-y-3">
        {visibleCategories.map((cat) => (
          <DigestSection
            key={cat.key}
            category={cat}
            items={groupedItems[cat.key]}
          />
        ))}
      </div>
    </div>
  );
}

function TabButton({
  label,
  emoji,
  count,
  isActive,
  onClick,
}: {
  label: string;
  emoji?: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "border-accent-blue text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
      }`}
    >
      {emoji && <span className="text-xs">{emoji}</span>}
      <span>{label}</span>
      <span
        className={`ml-0.5 rounded-full px-2 py-0.5 text-xs ${
          isActive
            ? "bg-accent-blue/10 text-accent-blue"
            : "bg-muted/50 text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
