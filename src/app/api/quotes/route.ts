import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type QuoteLead = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  category: string;
  details: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

const demoLeads: QuoteLead[] = [
  {
    id: "demo-001",
    name: "Chanda Mwape",
    phone: "+260 977 456 100",
    vehicle: "Toyota Hilux 2015",
    category: "Suspension",
    details: "Front shocks and lower ball joints. Needed for fleet pickup.",
    status: "new",
    created_at: new Date().toISOString(),
  },
];

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

export async function GET() {
  if (hasSupabase()) {
    const response = await supabaseRequest("quote_requests?select=*&order=created_at.desc");
    if (response.ok) {
      const leads = await response.json();
      return NextResponse.json({ leads, mode: "supabase" });
    }
  }

  return NextResponse.json({ leads: demoLeads, mode: "demo" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["name", "phone", "vehicle", "category", "details"];
  const missing = required.filter((key) => !String(body[key] ?? "").trim());

  if (missing.length) {
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const lead: QuoteLead = {
    id: crypto.randomUUID(),
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    vehicle: String(body.vehicle).trim(),
    category: String(body.category).trim(),
    details: String(body.details).trim(),
    status: "new",
    created_at: new Date().toISOString(),
  };

  if (hasSupabase()) {
    const response = await supabaseRequest("quote_requests", {
      method: "POST",
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Could not save quote request" }, { status: 500 });
    }

    const [savedLead] = await response.json();
    return NextResponse.json({ lead: savedLead, mode: "supabase" }, { status: 201 });
  }

  demoLeads.unshift(lead);
  return NextResponse.json({ lead, mode: "demo" }, { status: 201 });
}
