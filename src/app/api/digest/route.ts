import { NextResponse } from "next/server";
import { getMockDigest } from "@/lib/mock-data";
import { DailyDigest } from "@/lib/types";

let storedDigest: DailyDigest | null = null;

export async function GET() {
  const digest = storedDigest ?? getMockDigest();
  return NextResponse.json(digest);
}

export async function POST(request: Request) {
  try {
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET;
    if (expectedSecret) {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${expectedSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await request.json();

    if (!body.date || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Invalid payload: requires 'date' and 'items' array" },
        { status: 400 }
      );
    }

    storedDigest = body as DailyDigest;

    return NextResponse.json(
      { success: true, itemCount: body.items.length },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process webhook payload" },
      { status: 500 }
    );
  }
}
