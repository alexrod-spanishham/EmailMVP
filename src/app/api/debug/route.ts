import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serverDate = new Date().toISOString().split("T")[0];
  const serverTimestamp = new Date().toISOString();

  const diagnostics: Record<string, unknown> = {
    serverDate,
    serverTimestamp,
    envVars: {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl
        ? `${supabaseUrl.substring(0, 30)}...`
        : "NOT SET",
      SUPABASE_SERVICE_ROLE_KEY: hasServiceKey ? "SET" : "NOT SET",
      INGEST_API_KEY: process.env.INGEST_API_KEY ? "SET" : "NOT SET",
    },
    supabaseClientInitialized: supabase !== null,
  };

  if (supabase) {
    try {
      const { data, error, count } = await supabase
        .from("digests")
        .select("date, email_count, estimated_read_minutes, created_at", {
          count: "exact",
        })
        .order("date", { ascending: false })
        .limit(3);

      diagnostics.supabaseQuery = {
        success: !error,
        error: error ? error.message : null,
        errorCode: error ? error.code : null,
        totalRows: count,
        recentDigests: data,
      };
    } catch (err) {
      diagnostics.supabaseQuery = {
        success: false,
        error: String(err),
      };
    }
  } else {
    diagnostics.supabaseQuery = {
      skipped: true,
      reason: "Supabase client is null (env vars missing)",
    };
  }

  return NextResponse.json(diagnostics, {
    headers: { "Cache-Control": "no-store" },
  });
}
