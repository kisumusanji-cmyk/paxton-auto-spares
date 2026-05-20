import { NextResponse } from "next/server";
import { defaultSiteContent, SiteContent } from "@/app/lib/paxtonContent";

export const dynamic = "force-dynamic";

let demoContent: SiteContent = defaultSiteContent;

function hasSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseRequest(path: string, init?: RequestInit) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/${path}`;

  return fetch(url, {
    ...init,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init?.headers,
    },
    cache: "no-store",
  });
}

function normalizeContent(input: Partial<SiteContent>): SiteContent {
  return {
    ...defaultSiteContent,
    ...input,
    photos: Array.isArray(input.photos) ? input.photos.slice(0, 12) : defaultSiteContent.photos,
  };
}

export async function GET() {
  if (hasSupabase()) {
    const response = await supabaseRequest("site_content?id=eq.paxton&select=content");

    if (response.ok) {
      const rows = await response.json();
      const content = rows[0]?.content;
      if (content) return NextResponse.json({ content: normalizeContent(content), mode: "supabase" });
    }
  }

  return NextResponse.json({ content: demoContent, mode: "demo" });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const content = normalizeContent(body.content ?? body);

  if (hasSupabase()) {
    const response = await supabaseRequest("site_content", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        id: "paxton",
        content,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Could not save site content" }, { status: 500 });
    }

    const [saved] = await response.json();
    return NextResponse.json({ content: normalizeContent(saved.content), mode: "supabase" });
  }

  demoContent = content;
  return NextResponse.json({ content: demoContent, mode: "demo" });
}
