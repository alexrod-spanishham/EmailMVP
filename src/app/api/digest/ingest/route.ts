import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    // 1. Validate API key
    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.INGEST_API_KEY;

    if (!expectedKey || apiKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Check Supabase is configured
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 503 }
      );
    }

    // 3. Parse and validate payload
    const body = await request.json();
    const { date, summary, categories, email_count, estimated_read_minutes } =
      body;

    if (!date || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Missing or invalid 'date' (YYYY-MM-DD string)" },
        { status: 400 }
      );
    }

    if (!summary || typeof summary !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'summary' (string)" },
        { status: 400 }
      );
    }

    if (!Array.isArray(categories)) {
      return NextResponse.json(
        { error: "Missing or invalid 'categories' (array)" },
        { status: 400 }
      );
    }

    if (
      typeof email_count !== "number" ||
      typeof estimated_read_minutes !== "number"
    ) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid 'email_count' / 'estimated_read_minutes' (numbers)",
        },
        { status: 400 }
      );
    }

    // 4. Upsert into Supabase
    const { error } = await supabase
      .from("digests")
      .upsert(
        { date, summary, categories, email_count, estimated_read_minutes },
        { onConflict: "date" }
      );

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, date, itemCount: categories.length },
      { status: 200 }
    );
  } catch (err) {
    console.error("Ingest error:", err);
    return NextResponse.json(
      { error: "Failed to process payload" },
      { status: 500 }
    );
  }
}
