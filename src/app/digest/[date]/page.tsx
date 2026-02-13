import { notFound } from "next/navigation";
import { getDigestByDate } from "@/lib/digest";
import { DigestPageContent } from "@/components/DigestPageContent";

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function DateDigestPage({ params }: PageProps) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    notFound();
  }

  const digest = await getDigestByDate(date);

  if (!digest) {
    notFound();
  }

  return <DigestPageContent digest={digest} />;
}
