"use client";

import { useEffect, useState } from "react";
import { defaultSiteContent, mapsUrl, SiteContent, telUrl, whatsappUrl } from "@/app/lib/paxtonContent";

export function OwnerContentShowcase() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [hiddenImages, setHiddenImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setContent(data.content ?? defaultSiteContent))
      .catch(() => setContent(defaultSiteContent));
  }, []);

  const visiblePhotos = content.photos.filter((photo) => photo.url && !hiddenImages.includes(photo.id));

  return (
    <section id="owner-media" className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
          <div>
            <p className="section-kicker">Owner Managed</p>
            <h2 className="section-title">A site Paxton can update after handover.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">{content.heroNote}</p>
          </div>
          <div className="glass rounded-3xl p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={telUrl(content.phone)} className="contact-card"><i className="fa-solid fa-phone" /><span>{content.phone}</span></a>
              <a href={whatsappUrl(content.whatsappPhone)} target="_blank" rel="noopener noreferrer" className="contact-card"><i className="fa-brands fa-whatsapp" /><span>WhatsApp quote line</span></a>
              <a href={mapsUrl(content.primaryLocation)} target="_blank" rel="noopener noreferrer" className="contact-card"><i className="fa-solid fa-location-dot" /><span>{content.primaryLocation}</span></a>
              <a href={mapsUrl(content.secondaryLocation)} target="_blank" rel="noopener noreferrer" className="contact-card"><i className="fa-solid fa-map-pin" /><span>{content.secondaryLocation}</span></a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visiblePhotos.slice(0, 4).map((photo) => (
            <article key={photo.id} className="reveal image-card lift-card relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <img src={photo.url} alt={photo.title} loading="lazy" decoding="async" onError={() => setHiddenImages((items) => [...items, photo.id])} className="absolute inset-0 h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
              <div className="absolute bottom-0 p-6">
                <p className="text-xs font-black uppercase tracking-[.22em] text-amber-200">Real Paxton media</p>
                <h3 className="mt-2 text-2xl font-black text-white">{photo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">{photo.note}</p>
              </div>
            </article>
          ))}

          {visiblePhotos.length === 0 && (
            <div className="reveal glass rounded-2xl p-8 md:col-span-2 xl:col-span-4">
              <p className="text-2xl font-black text-white">Owner photo slots ready.</p>
              <p className="mt-2 text-stone-400">When Paxton buys, they can add real shop/product photos from the admin content studio.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
