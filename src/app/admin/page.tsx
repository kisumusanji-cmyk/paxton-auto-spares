"use client";

import { useEffect, useState } from "react";
import { ContentStudio } from "./ContentStudio";

type Lead = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  category: string;
  details: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [mode, setMode] = useState("loading");

  async function loadLeads() {
    const response = await fetch("/api/quotes", { cache: "no-store" });
    const data = await response.json();
    setLeads(data.leads ?? []);
    setMode(data.mode ?? "demo");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-stone-100 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="/" className="text-sm font-bold text-amber-300 hover:text-amber-200">
              <i className="fa-solid fa-arrow-left mr-2" />Back to website
            </a>
            <h1 className="mt-5 text-4xl font-black sm:text-5xl">Paxton Lead Desk</h1>
            <p className="mt-3 max-w-2xl text-stone-400">
              Quote requests from the website appear here. Connect Supabase to make this persistent for production.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={loadLeads} className="btn-gold w-fit">
              Refresh Leads <i className="fa-solid fa-rotate" />
            </button>
            <button onClick={logout} className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-black text-white transition hover:bg-white/15">
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-stone-400">Total requests</p>
            <p className="mt-2 text-4xl font-black text-white">{leads.length}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-stone-400">New leads</p>
            <p className="mt-2 text-4xl font-black text-amber-300">{leads.filter((lead) => lead.status === "new").length}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-stone-400">Data mode</p>
            <p className="mt-2 text-4xl font-black capitalize text-white">{mode}</p>
          </div>
        </div>

        <ContentStudio />

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="hidden grid-cols-[1fr_1fr_1fr_1fr_1.6fr] gap-4 border-b border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-black text-stone-300 lg:grid">
            <span>Customer</span>
            <span>Phone</span>
            <span>Vehicle</span>
            <span>Category</span>
            <span>Request</span>
          </div>

          {leads.map((lead) => (
            <article key={lead.id} className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 lg:grid-cols-[1fr_1fr_1fr_1fr_1.6fr]">
              <div>
                <p className="font-black text-white">{lead.name}</p>
                <p className="mt-1 text-xs text-stone-500">{new Date(lead.created_at).toLocaleString()}</p>
              </div>
              <a href={`tel:${lead.phone}`} className="text-amber-300 hover:text-amber-200">{lead.phone}</a>
              <p className="text-stone-300">{lead.vehicle}</p>
              <p className="w-fit rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm font-bold text-amber-200">{lead.category}</p>
              <p className="text-stone-300">{lead.details}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
