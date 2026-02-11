interface DigestFooterProps {
  generatedAt: string;
}

export function DigestFooter({ generatedAt }: DigestFooterProps) {
  const formatted = new Date(generatedAt).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <footer className="mt-12 border-t border-border pt-6 pb-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>End of digest</p>
        <p>Generated {formatted}</p>
      </div>
    </footer>
  );
}
