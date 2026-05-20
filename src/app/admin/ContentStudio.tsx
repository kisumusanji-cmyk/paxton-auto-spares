"use client";

import { FormEvent, useEffect, useState } from "react";
import { defaultSiteContent, OwnerPhoto, SiteContent } from "@/app/lib/paxtonContent";

function emptyPhoto(): OwnerPhoto {
  return {
    id: crypto.randomUUID(),
    title: "New Paxton photo",
    url: "",
    note: "Owner uploaded media",
  };
}

export function ContentStudio() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [mode, setMode] = useState("loading");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  async function loadContent() {
    const response = await fetch("/api/site-content", { cache: "no-store" });
    const data = await response.json();
    setContent(data.content ?? defaultSiteContent);
    setMode(data.mode ?? "demo");
  }

  useEffect(() => {
    loadContent();
  }, []);

  function updateField<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  function updatePhoto(index: number, key: keyof OwnerPhoto, value: string) {
    setContent((current) => ({
      ...current,
      photos: current.photos.map((photo, photoIndex) =>
        photoIndex === index ? { ...photo, [key]: value } : photo,
      ),
    }));
  }

  function removePhoto(index: number) {
    setContent((current) => ({
      ...current,
      photos: current.photos.filter((_, photoIndex) => photoIndex !== index),
    }));
  }

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");

    const response = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      setStatus("Could not save. Check connection or Supabase config.");
      return;
    }

    const data = await response.json();
    setContent(data.content);
    setMode(data.mode);
    setStatus("Saved. Refresh the website to see updates.");
  }

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035]">
      <button onClick={() => setOpen((next) => !next)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
        <span>
          <span className="block text-sm font-black uppercase tracking-[.22em] text-amber-200">Owner Content Studio</span>
          <span className="mt-2 block text-3xl font-black text-white">Update website info and media</span>
          <span className="mt-1 block text-sm text-stone-400">Mode: {mode}. Owners can replace demo images, contacts and locations here.</span>
        </span>
        <i className={`fa-solid ${open ? "fa-chevron-up" : "fa-chevron-down"} text-amber-300`} />
      </button>

      {open && (
        <form onSubmit={saveContent} className="border-t border-white/10 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Business name
              <input className="input-field" value={content.businessName} onChange={(event) => updateField("businessName", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Phone
              <input className="input-field" value={content.phone} onChange={(event) => updateField("phone", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              WhatsApp phone, international format
              <input className="input-field" value={content.whatsappPhone} onChange={(event) => updateField("whatsappPhone", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Email
              <input className="input-field" value={content.email} onChange={(event) => updateField("email", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Business hours
              <input className="input-field" value={content.hours} onChange={(event) => updateField("hours", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Location note
              <input className="input-field" value={content.locationNote} onChange={(event) => updateField("locationNote", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Primary location
              <input className="input-field" value={content.primaryLocation} onChange={(event) => updateField("primaryLocation", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200">
              Second location
              <input className="input-field" value={content.secondaryLocation} onChange={(event) => updateField("secondaryLocation", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-200 md:col-span-2">
              Public note
              <textarea className="input-field min-h-24" value={content.heroNote} onChange={(event) => updateField("heroNote", event.target.value)} />
            </label>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-white">Owner photos</h3>
              <p className="text-sm text-stone-400">Use stable hosted image URLs for production, like Cloudinary or Supabase Storage.</p>
            </div>
            <button type="button" onClick={() => updateField("photos", [emptyPhoto(), ...content.photos])} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-black text-white">
              Add Photo
            </button>
          </div>

          <div className="mt-5 grid gap-4">
            {content.photos.map((photo, index) => (
              <div key={photo.id} className="grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 lg:grid-cols-[180px_1fr_auto]">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                  {photo.url ? (
                    <img src={photo.url} alt={photo.title} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="grid h-40 place-items-center text-sm text-stone-500">No image</div>
                  )}
                </div>
                <div className="grid gap-3">
                  <input className="input-field" value={photo.title} onChange={(event) => updatePhoto(index, "title", event.target.value)} placeholder="Photo title" />
                  <input className="input-field" value={photo.url} onChange={(event) => updatePhoto(index, "url", event.target.value)} placeholder="Image URL" />
                  <input className="input-field" value={photo.note} onChange={(event) => updatePhoto(index, "note", event.target.value)} placeholder="Photo note" />
                </div>
                <button type="button" onClick={() => removePhoto(index)} className="h-fit rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 font-black text-red-100">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button className="btn-gold mt-6 w-full justify-center">Save Website Content</button>
          {status && <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-stone-200">{status}</p>}
        </form>
      )}
    </section>
  );
}
