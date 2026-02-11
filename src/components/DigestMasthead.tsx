import { formatDigestDate } from "@/lib/utils";

interface DigestMastheadProps {
  date: string;
  totalEmails: number;
  readingTimeMinutes: number;
}

export function DigestMasthead({
  date,
  totalEmails,
  readingTimeMinutes,
}: DigestMastheadProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Executive Digest
          </h1>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {formatDigestDate(date)}
          </p>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{totalEmails}</div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted">
              Emails
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{readingTimeMinutes}</div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted">
              Min Read
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
