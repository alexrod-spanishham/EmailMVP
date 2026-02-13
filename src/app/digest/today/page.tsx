import { getDigestByDate, getLatestDigest } from "@/lib/digest";
import { getMockDigest } from "@/lib/mock-data";
import { DigestPageContent } from "@/components/DigestPageContent";

export default async function TodayPage() {
  const today = new Date().toISOString().split("T")[0];

  // Fallback chain: today's digest -> latest available -> mock data
  let digest = await getDigestByDate(today);

  if (!digest) {
    digest = await getLatestDigest();
  }

  if (!digest) {
    digest = getMockDigest();
  }

  return <DigestPageContent digest={digest} />;
}
