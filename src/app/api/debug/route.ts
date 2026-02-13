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
      // Query the full row including categories
      const { data, error } = await supabase
        .from("digests")
        .select("*")
        .eq("date", serverDate)
        .single();

      if (error || !data) {
        diagnostics.supabaseQuery = {
          success: false,
          error: error ? error.message : "No data returned",
          errorCode: error ? error.code : null,
        };
      } else {
        const categories = data.categories;
        diagnostics.supabaseQuery = {
          success: true,
          date: data.date,
          summary: data.summary?.substring(0, 80) + "...",
          email_count: data.email_count,
          categoriesType: typeof categories,
          categoriesIsArray: Array.isArray(categories),
          categoriesLength: Array.isArray(categories) ? categories.length : null,
          // Show first 2 items so we can see the data shape
          categoriesSample: Array.isArray(categories)
            ? categories.slice(0, 2).map((item: Record<string, unknown>) => ({
                keys: Object.keys(item),
                category: item.category,
                subject: item.subject,
                id: item.id,
              }))
            : categories,
        };
      }
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
