import { AutoPartsExperience } from "./components/AutoPartsExperience";
import { Counters } from "./components/Counters";
import { Header } from "./components/Header";
import { OwnerContentShowcase } from "./components/OwnerContentShowcase";
import { QuoteForm } from "./components/QuoteForm";
import { SiteEffects } from "./components/SiteEffects";
import { defaultSiteContent, mapsUrl, telUrl, whatsappUrl } from "./lib/paxtonContent";

const paxtonWhatsapp = whatsappUrl(defaultSiteContent.whatsappPhone);

const why = [
  ["fa-certificate", "Genuine Parts", "Quality-focused sourcing for correct fitment and long service life."],
  ["fa-truck-fast", "Fast Delivery", "Quick Lusaka dispatch for urgent repairs and fleet downtime."],
  ["fa-handshake", "Trusted Service", "Clear recommendations from a team that understands practical vehicles."],
  ["fa-tags", "Affordable Pricing", "Premium customer experience with commercial value."],
  ["fa-user-gear", "Experienced Team", "Parts support for workshops, SMEs and individual drivers."],
];

const featuredParts = [
  ["Oil Service Packs", "Premium lubricants, filters and service essentials.", "https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=900&q=85"],
  ["Brake Kits", "Pads, discs and safety components ready for quote.", "https://images.unsplash.com/photo-1760317890314-e964ffd7e6a6?auto=format&fit=crop&w=900&q=85"],
  ["Engine Components", "Cylinder heads, valves, belts and hard working parts.", "https://images.unsplash.com/photo-1767339736247-582fcf11442b?auto=format&fit=crop&w=900&q=85"],
];

const vehicleFocus = ["Toyota Hilux", "Nissan Hardbody", "Toyota Corolla", "Isuzu KB", "Mazda BT50", "Mitsubishi Canter"];

export default function Home() {
  return (
    <main className="bg-black text-stone-100">
      <SiteEffects />
      <Header />

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=2200&q=85" alt="Realistic automotive service workshop" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="pointer-events-none absolute inset-0 industrial-grid opacity-25" />
        <div className="cinema-sweep" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="animate-in">
            <p className="mb-6 inline-flex rounded-full border border-amber-300/30 bg-black/45 px-4 py-2 text-sm font-bold text-amber-100 backdrop-blur">
              Lusaka premium commercial auto parts supplier
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[.92] text-white sm:text-6xl lg:text-7xl">
              Genuine parts for hard working <span className="gold-text">Zambian roads.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-200">
              Engine parts, brakes, suspension, batteries, filters and oils for Hilux, Hardbody, Corolla, Isuzu KB, BT50 and Lusaka's everyday business vehicles.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#quote" className="btn-gold justify-center px-7 py-4 text-base">Get Quote <i className="fa-solid fa-arrow-right" /></a>
              <a href="#products" className="rounded-xl border border-white/15 bg-white/10 px-7 py-4 text-center font-black text-white backdrop-blur transition hover:bg-white/15">View Products</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {vehicleFocus.map((vehicle) => (
                <span key={vehicle} className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-black uppercase tracking-wide text-stone-300">
                  {vehicle}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="hero-visual glass premium-border rounded-3xl p-5 shadow-deep">
              <img src="https://images.unsplash.com/photo-1762604462421-fff920b0c418?auto=format&fit=crop&w=1200&q=85" alt="Automotive oils and spare parts in a workshop" loading="eager" decoding="async" className="h-[470px] w-full rounded-2xl object-cover" />
              <div className="-mt-28 ml-6 mr-6 relative rounded-2xl border border-white/15 bg-black/70 p-5 backdrop-blur">
                <p className="text-sm text-stone-400">Today&apos;s fast request</p>
                <p className="mt-1 text-2xl font-black text-white">Brake kits + filters</p>
                <p className="mt-2 text-sm text-amber-200">Ready for WhatsApp quote flow</p>
              </div>
              <div className="parts-orbit parts-orbit-a"><i className="fa-solid fa-oil-can" /></div>
              <div className="parts-orbit parts-orbit-b"><i className="fa-solid fa-car-battery" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-20 z-10 pb-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-3">
          {featuredParts.map(([title, text, image]) => (
            <article key={title} className="reveal lift-card group relative min-h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <img src={image} alt={title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
              <div className="absolute bottom-0 p-6">
                <p className="text-xs font-black uppercase tracking-[.22em] text-amber-200">Fast moving stock</p>
                <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-stone-300">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AutoPartsExperience />
      <OwnerContentShowcase />

      <section id="about" className="section-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <p className="section-kicker">About Paxton</p>
            <h2 className="section-title">A sharper parts brand for Lusaka&apos;s real vehicles.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              PAXTON AUTO SPARES is positioned as a trustworthy parts partner for drivers, workshops and fleet operators who need speed, fitment confidence and professional service.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-2xl p-6">
                <i className="fa-solid fa-shield-halved text-3xl text-amber-300" />
                <h3 className="mt-5 text-xl font-black">Trust-led selling</h3>
                <p className="mt-2 text-sm text-stone-400">Makes the business look established before a customer walks in.</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <i className="fa-solid fa-screwdriver-wrench text-3xl text-amber-300" />
                <h3 className="mt-5 text-xl font-black">Workshop practical</h3>
                <p className="mt-2 text-sm text-stone-400">Built around parts, fitment, quote requests and real buying behavior.</p>
              </div>
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85" alt="Mechanic working on vehicle" loading="lazy" decoding="async" className="h-72 w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=900&q=85" alt="Workshop tools" loading="lazy" decoding="async" className="mt-12 h-60 w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85" alt="Practical road vehicle" loading="lazy" decoding="async" className="h-60 w-full rounded-2xl object-cover" />
            <div className="glass flex h-72 flex-col justify-end rounded-2xl p-6">
              <i className="fa-solid fa-location-dot text-3xl text-amber-300" />
              <h3 className="mt-5 text-2xl font-black">Lusaka based</h3>
              <p className="mt-2 text-stone-400">Local market feel, premium execution.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-bg py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="section-kicker">Why Choose Us</p>
            <h2 className="section-title">Premium service, practical results.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {why.map(([icon, title, text]) => (
              <div key={title} className="reveal glass lift-card rounded-2xl p-6">
                <i className={`fa-solid ${icon} text-3xl text-amber-300`} />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-20">
        <img src="https://images.unsplash.com/photo-1762604462421-fff920b0c418?auto=format&fit=crop&w=1800&q=85" alt="Automotive oils and lubricants" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Counters />
        </div>
      </section>

      <section className="section-bg py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal">
            <p className="section-kicker">Workshop Gallery</p>
            <h2 className="section-title max-w-4xl">A local automotive presence that looks ready for serious business.</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <img src="https://images.unsplash.com/photo-1762604462421-fff920b0c418?auto=format&fit=crop&w=1200&q=85" alt="Workshop tools and oil bottles" loading="lazy" decoding="async" className="col-span-2 row-span-2 h-[430px] w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85" alt="Mechanic tools" loading="lazy" decoding="async" className="h-[207px] w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=800&q=85" alt="Vehicle suspension service" loading="lazy" decoding="async" className="h-[207px] w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=85" alt="Mechanical tools" loading="lazy" decoding="async" className="h-[207px] w-full rounded-2xl object-cover" />
            <img src="https://images.unsplash.com/photo-1767339736247-582fcf11442b?auto=format&fit=crop&w=800&q=85" alt="Mechanic working on engine parts" loading="lazy" decoding="async" className="h-[207px] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section id="quote" className="bg-black py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="reveal">
            <p className="section-kicker">Quote Engine</p>
            <h2 className="section-title">This is where the website becomes money.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              Customers request parts directly from the site. The business gets structured leads instead of random messages with missing vehicle details.
            </p>
              <a href="/admin" className="mt-8 inline-flex rounded-xl border border-amber-300/25 bg-amber-300/10 px-5 py-3 font-black text-amber-200 transition hover:bg-amber-300 hover:text-black">
                View Admin Lead Desk <i className="fa-solid fa-chart-line ml-3" />
              </a>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section id="contact" className="section-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div className="reveal">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Ready for calls, WhatsApp and walk-ins.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a href={telUrl(defaultSiteContent.phone)} className="contact-card"><i className="fa-solid fa-phone" /><span>{defaultSiteContent.phone}</span></a>
              <a href={`mailto:${defaultSiteContent.email}`} className="contact-card"><i className="fa-solid fa-envelope" /><span>{defaultSiteContent.email}</span></a>
              <a href={mapsUrl(defaultSiteContent.primaryLocation)} target="_blank" rel="noopener noreferrer" className="contact-card"><i className="fa-solid fa-location-dot" /><span>{defaultSiteContent.primaryLocation}</span></a>
              <a href={mapsUrl(defaultSiteContent.secondaryLocation)} target="_blank" rel="noopener noreferrer" className="contact-card"><i className="fa-solid fa-map-pin" /><span>Second location: {defaultSiteContent.secondaryLocation}</span></a>
              <div className="contact-card"><i className="fa-solid fa-clock" /><span>{defaultSiteContent.hours}</span></div>
              <div className="contact-card"><i className="fa-solid fa-store" /><span>{defaultSiteContent.locationNote}</span></div>
            </div>
          </div>
          <div className="reveal map-grid relative min-h-[470px] overflow-hidden rounded-2xl border border-white/10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-300 text-black shadow-gold">
              <i className="fa-solid fa-location-dot text-4xl" />
            </div>
            <div className="glass absolute bottom-6 left-6 right-6 rounded-2xl p-5">
              <p className="font-black text-white">PAXTON AUTO SPARES</p>
              <p className="mt-1 text-sm text-stone-300">{defaultSiteContent.primaryLocation}, {defaultSiteContent.locationNote}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#050505] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-stone-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 PAXTON AUTO SPARES. Premium Lusaka auto parts website demo.</p>
          <div className="flex gap-4 text-xl text-stone-300">
            <a href={paxtonWhatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook" /></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
          </div>
        </div>
      </footer>

      <a href={paxtonWhatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-4 z-[55] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-2xl transition hover:scale-110 sm:right-5 sm:h-16 sm:w-16" aria-label="Chat on WhatsApp">
        <i className="fa-brands fa-whatsapp" />
      </a>
    </main>
  );
}
