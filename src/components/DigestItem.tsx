"use client";

import { useState } from "react";
import { CategoryMeta, DigestItem as DigestItemType } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

interface DigestItemProps {
  item: DigestItemType;
  category: CategoryMeta;
}

export function DigestItem({ item, category }: DigestItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group rounded-lg border border-border bg-card transition-all hover:border-muted hover:shadow-sm">
      {/* Collapsed header -- always visible, clickable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 p-4 text-left"
        aria-expanded={expanded}
      >
        {/* Chevron */}
        <svg
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-base font-semibold leading-snug text-foreground ${
              !expanded ? "truncate" : ""
            }`}
          >
            {item.subject}
          </h3>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{item.senderName}</span>
            <span>&middot;</span>
            <span>{formatRelativeTime(item.receivedAt)}</span>
          </div>
        </div>

        {/* Priority / action badge */}
        {item.actionSuggestion && (
          <div
            className={`flex-shrink-0 rounded-md px-2 py-1 text-xs font-medium ${category.accentBg} ${category.accentText}`}
          >
            Action
          </div>
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          {/* Summary */}
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {item.summary}
          </p>

          {/* Action suggestion */}
          {item.actionSuggestion && (
            <div className={`mt-3 rounded-md ${category.accentBg} px-3 py-2`}>
              <p className={`text-sm ${category.accentText}`}>
                <span className="font-semibold">Action required: </span>
                {item.actionSuggestion}
              </p>
            </div>
          )}

          {/* Draft response */}
          {item.draftResponse && (
            <div
              className={`mt-3 rounded-md border-l-2 ${category.accentColor} bg-muted/30 px-4 py-3`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Suggested Reply
                </span>
                <CopyButton text={item.draftResponse} />
              </div>
              <p className="whitespace-pre-line font-body text-sm leading-relaxed text-foreground/80">
                {item.draftResponse}
              </p>
            </div>
          )}

          {/* Tags */}
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

          {/* Open in Outlook button */}
          {item.webLink && (
            <div className="mt-4">
              <a
                href={item.webLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-md ${category.accentBg} px-3 py-2 text-sm font-medium ${category.accentText} transition-colors hover:opacity-80`}
              >
                Open in Outlook
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
