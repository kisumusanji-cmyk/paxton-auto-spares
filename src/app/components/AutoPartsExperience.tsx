"use client";

import { FormEvent, useMemo, useState } from "react";
import { defaultSiteContent, whatsappUrl } from "@/app/lib/paxtonContent";

const vehicles = [
  "Toyota Hilux",
  "Nissan Hardbody",
  "Toyota Corolla",
  "Isuzu KB",
  "Mazda BT50",
  "Mitsubishi Canter",
];

const stockItems = [
  {
    name: "Hilux Oil Service Pack",
    category: "Oils & Filters",
    vehicle: "Toyota Hilux",
    badge: "Fast moving",
    price: "Quote ready",
    image: "https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=900&q=85",
    description: "Engine oil, oil filter and service essentials for common Hilux models.",
  },
  {
    name: "Hardbody Brake Kit",
    category: "Brake Systems",
    vehicle: "Nissan Hardbody",
    badge: "Workshop pick",
    price: "Same day quote",
    image: "https://images.unsplash.com/photo-1760317890314-e964ffd7e6a6?auto=format&fit=crop&w=900&q=85",
    description: "Pads, rotor matching and brake service components for daily workhorses.",
  },
  {
    name: "Hilux Brake Kit",
    category: "Brake Systems",
    vehicle: "Toyota Hilux",
    badge: "High demand",
    price: "Quote ready",
    image: "https://images.unsplash.com/photo-1760317890314-e964ffd7e6a6?auto=format&fit=crop&w=900&q=85",
    description: "Front brake pad and rotor support for common Hilux work pickups.",
  },
  {
    name: "Corolla Filter Set",
    category: "Filters",
    vehicle: "Toyota Corolla",
    badge: "Popular",
    price: "Inquire now",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=85",
    description: "Oil, air and cabin filters for high-mileage city vehicles.",
  },
  {
    name: "Isuzu KB Suspension Pack",
    category: "Suspension",
    vehicle: "Isuzu KB",
    badge: "Road tested",
    price: "Quote ready",
    image: "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=900&q=85",
    description: "Shocks, bushes and stabilizer parts for Lusaka roads and loads.",
  },
  {
    name: "BT50 Cooling Support",
    category: "Cooling Systems",
    vehicle: "Mazda BT50",
    badge: "Heat control",
    price: "Check stock",
    image: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=85",
    description: "Hoses, coolant, fans and radiator support for pickup maintenance.",
  },
  {
    name: "Canter Battery & Electrical",
    category: "Batteries",
    vehicle: "Mitsubishi Canter",
    badge: "Commercial",
    price: "Fleet quote",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=900&q=85",
    description: "Heavy-duty battery support for commercial delivery vehicles.",
  },
  {
    name: "Engine Parts Desk",
    category: "Engine Parts",
    vehicle: "Toyota Hilux",
    badge: "Mechanic grade",
    price: "Request fitment",
    image: "https://images.unsplash.com/photo-1767339736247-582fcf11442b?auto=format&fit=crop&w=900&q=85",
    description: "Belts, mounts, gaskets and hard-to-match engine components.",
  },
  {
    name: "Body & Lamp Essentials",
    category: "Body Parts",
    vehicle: "Toyota Corolla",
    badge: "Daily driver",
    price: "Ask Paxton",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=900&q=85",
    description: "Mirrors, lamps, panels and small body replacement essentials.",
  },
];

const reviews = [
  ["CM", "Chanda Mwape", "Fleet Supervisor", "Paxton found Hilux suspension parts fast and kept our vehicles moving."],
  ["TK", "Temwani Kunda", "Workshop Owner", "The quote process is clean. Customers get proper fitment support, not guesswork."],
  ["BM", "Bwalya Mbewe", "Procurement Lead", "For filters, oils and batteries, this is the kind of supplier experience we need."],
  ["MN", "Martha Ngosa", "Business Owner", "The WhatsApp flow is quick, professional and easy for busy customers."],
];

const answerBank = [
  ["Do you have Hilux brake pads?", "Yes. Choose Toyota Hilux and Brake Systems in the compatibility checker, then send a quote request."],
  ["Can you deliver to my workshop?", "Paxton can arrange Lusaka delivery depending on location, item size and stock availability."],
  ["What should I send for fitment?", "Send vehicle make, model, year, engine size if known, and a photo of the old part."],
  ["Do you support fleets?", "Yes. Fleet buyers can request recurring oil, filter, battery and brake supply."],
  ["Can I save my vehicle?", "Yes. Use My Garage to save your vehicle during the session and search matching stock faster."],
];

const showroom = [
  ["Service Counter", "Fast quote desk for walk-ins and WhatsApp buyers.", "https://images.unsplash.com/photo-1762604462421-fff920b0c418?auto=format&fit=crop&w=1200&q=85"],
  ["Engine Bay", "Real components for mechanics and commercial repair.", "https://images.unsplash.com/photo-1767339736247-582fcf11442b?auto=format&fit=crop&w=1200&q=85"],
  ["Brake Desk", "Safety-critical brake parts with fitment support.", "https://images.unsplash.com/photo-1760317890314-e964ffd7e6a6?auto=format&fit=crop&w=1200&q=85"],
];

export function AutoPartsExperience() {
  const [query, setQuery] = useState("");
  const [vehicle, setVehicle] = useState("All vehicles");
  const [category, setCategory] = useState("All categories");
  const [compatVehicle, setCompatVehicle] = useState("Toyota Hilux");
  const [compatPart, setCompatPart] = useState("Brake Systems");
  const [garage, setGarage] = useState<string[]>(["Toyota Hilux 2015"]);
  const [garageInput, setGarageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    ["Paxton", "Hello. Send your vehicle and part needed. I can help you prepare a proper quote request."],
  ]);
  const [chatText, setChatText] = useState("");
  const [activeShowroom, setActiveShowroom] = useState(0);
  const [question, setQuestion] = useState("");

  const categories = useMemo(
    () => ["All categories", ...Array.from(new Set(stockItems.map((item) => item.category)))],
    [],
  );

  const normalizedQuery = query
    .toLowerCase()
    .replace("battery", "batter")
    .replace("batteries", "batter")
    .replace("brakes", "brake")
    .replace("filters", "filter");

  const filteredStock = stockItems.filter((item) => {
    const searchable = [item.name, item.category, item.vehicle, item.description]
      .join(" ")
      .toLowerCase()
      .replace("battery", "batter")
      .replace("batteries", "batter")
      .replace("brakes", "brake")
      .replace("filters", "filter");
    const matchesQuery = searchable.includes(normalizedQuery);
    const matchesVehicle = vehicle === "All vehicles" || item.vehicle === vehicle;
    const matchesCategory = category === "All categories" || item.category === category;
    return matchesQuery && matchesVehicle && matchesCategory;
  });

  const compatibleItems = stockItems.filter(
    (item) => item.vehicle === compatVehicle && item.category === compatPart,
  );

  const answerResults = answerBank.filter(([q, a]) =>
    `${q} ${a}`.toLowerCase().includes(question.toLowerCase()),
  );

  function addGarageVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = garageInput.trim();
    if (!next) return;
    setGarage((items) => Array.from(new Set([next, ...items])));
    setGarageInput("");
  }

  function sendChat(text?: string) {
    const outgoing = (text ?? chatText).trim();
    if (!outgoing) return;
    setChatMessages((items) => [
      ...items,
      ["You", outgoing],
      [
        "Paxton",
        "Got it. For fastest support, include model year and a photo, then tap WhatsApp or Get Quote.",
      ],
    ]);
    setChatText("");
    const toggle = document.getElementById("live-chat-toggle") as HTMLInputElement | null;
    if (toggle) toggle.checked = true;
  }

  function openChatOnWhatsApp() {
    const latestCustomerMessage = [...chatMessages]
      .reverse()
      .find(([sender]) => sender === "You")?.[1] ?? "Hello Paxton Auto Spares, I need help finding a part.";
    const url = whatsappUrl(defaultSiteContent.whatsappPhone, latestCustomerMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section id="products" className="relative overflow-hidden bg-black py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 industrial-grid opacity-20" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
            <div>
              <p className="section-kicker">Smart Parts Desk</p>
              <h2 className="section-title">Search, match and quote like a serious auto parts company.</h2>
            </div>
            <div className="glass rounded-2xl p-4">
              <label className="relative block">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-amber-300" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="input-field pl-12 text-base"
                  placeholder="Search Hilux brakes, oil filters, batteries..."
                />
              </label>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <select value={vehicle} onChange={(event) => setVehicle(event.target.value)} className="input-field">
                  <option>All vehicles</option>
                  {vehicles.map((item) => <option key={item}>{item}</option>)}
                </select>
                <select value={category} onChange={(event) => setCategory(event.target.value)} className="input-field">
                  {categories.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-2">
            {["All vehicles", ...vehicles].map((item) => (
              <button
                key={item}
                onClick={() => setVehicle(item)}
                className={`premium-chip ${vehicle === item ? "premium-chip-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredStock.map((item) => (
              <article key={item.name} className="reveal image-card lift-card group relative min-h-[410px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/5" />
                <div className="absolute left-5 top-5 rounded-full border border-amber-300/30 bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-200 backdrop-blur">
                  {item.badge}
                </div>
                <div className="absolute bottom-0 p-6">
                  <p className="text-xs font-black uppercase tracking-[.22em] text-stone-400">{item.vehicle}</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-amber-200">{item.price}</span>
                    <a href="#quote" className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-black text-black transition hover:bg-amber-200">
                      Quote
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredStock.length === 0 && (
            <div className="glass mt-10 rounded-2xl p-8 text-center">
              <p className="text-xl font-black text-white">No exact match found.</p>
              <p className="mt-2 text-stone-400">Try another vehicle or send a custom quote request.</p>
            </div>
          )}
        </div>
      </section>

      <section id="checker" className="section-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="reveal">
            <p className="section-kicker">Vehicle Compatibility</p>
            <h2 className="section-title">Check fitment before the customer wastes time.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              This is one of the strongest selling features. It helps customers tell Paxton exactly what vehicle and part they need.
            </p>
          </div>
          <div className="reveal glass premium-border rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-stone-200">
                Vehicle type
                <select value={compatVehicle} onChange={(event) => setCompatVehicle(event.target.value)} className="input-field">
                  {vehicles.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-200">
                Part type
                <select value={compatPart} onChange={(event) => setCompatPart(event.target.value)} className="input-field">
                  {categories.filter((item) => item !== "All categories").map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5">
              <p className="text-sm font-black uppercase tracking-[.22em] text-amber-200">Compatibility result</p>
              <h3 className="mt-3 text-2xl font-black text-white">
                {compatibleItems.length ? "Compatible stock found" : "No listed stock yet"}
              </h3>
              <p className="mt-2 text-stone-300">
                {compatibleItems.length
                  ? `${compatibleItems[0].name} matches ${compatVehicle}. Send a quote with year and engine details.`
                  : `${compatPart} for ${compatVehicle} can be handled as a custom request.`}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="btn-gold justify-center">Get Quote <i className="fa-solid fa-file-invoice" /></a>
                <button onClick={() => sendChat(`Do you have ${compatPart} for ${compatVehicle}?`)} className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-black text-white transition hover:bg-white/15">
                  Ask Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="garage" className="bg-black py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="reveal glass rounded-3xl p-6 sm:p-8">
            <p className="section-kicker">My Garage</p>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">Save customer vehicles during the pitch.</h2>
            <form onSubmit={addGarageVehicle} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <input value={garageInput} onChange={(event) => setGarageInput(event.target.value)} className="input-field" placeholder="Example: Toyota Corolla 2012" />
              <button className="btn-gold justify-center whitespace-nowrap">Add Vehicle</button>
            </form>
            <div className="mt-6 grid gap-3">
              {garage.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <span className="font-black text-white"><i className="fa-solid fa-car-side mr-3 text-amber-300" />{item}</span>
                  <button onClick={() => setQuery(item.split(" ").slice(0, 2).join(" "))} className="text-sm font-black text-amber-200 hover:text-amber-100">Find parts</button>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal grid gap-4">
            <div className="metric-card">
              <span>Quote conversion feature</span>
              <strong>Vehicle saved &gt; part matched &gt; lead captured</strong>
            </div>
            <div className="metric-card">
              <span>Best for field sales</span>
              <strong>Show Paxton how customers can self-qualify</strong>
            </div>
            <div className="metric-card">
              <span>Next production step</span>
              <strong>Persist garage vehicles with customer accounts</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="showroom" className="section-bg py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Digital Showroom</p>
              <h2 className="section-title max-w-4xl">A premium parts counter customers can explore.</h2>
            </div>
            <div className="flex gap-2">
              {showroom.map(([title], index) => (
                <button key={title} onClick={() => setActiveShowroom(index)} className={`premium-chip ${activeShowroom === index ? "premium-chip-active" : ""}`}>
                  {title}
                </button>
              ))}
            </div>
          </div>
          <div className="reveal mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
            <div className="grid lg:grid-cols-[1.2fr_.8fr]">
              <img src={showroom[activeShowroom][2]} alt={showroom[activeShowroom][0]} loading="lazy" decoding="async" className="h-[360px] w-full object-cover sm:h-[520px]" />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="text-sm font-black uppercase tracking-[.28em] text-amber-200">Showroom view</p>
                <h3 className="mt-4 text-4xl font-black text-white">{showroom[activeShowroom][0]}</h3>
                <p className="mt-4 text-lg leading-8 text-stone-300">{showroom[activeShowroom][1]}</p>
                <a href="#quote" className="btn-gold mt-8 w-fit">Request From This Desk</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="section-kicker">Customer Reviews</p>
            <h2 className="section-title">Local proof without generic stock portraits.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reviews.map(([initials, name, role, text]) => (
              <article key={name} className="reveal glass lift-card rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-stone-700 font-black text-black">{initials}</div>
                  <div>
                    <h3 className="font-black text-white">{name}</h3>
                    <p className="text-sm text-stone-400">{role}</p>
                  </div>
                </div>
                <p className="mt-6 leading-7 text-stone-300">{text}</p>
                <p className="mt-5 text-amber-300">
                  <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" /> <i className="fa-solid fa-star" />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="answers" className="section-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="reveal">
            <p className="section-kicker">Common Answers</p>
            <h2 className="section-title">Instant answers for common buyer queries.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              This reduces repetitive calls and helps customers send better quote requests.
            </p>
          </div>
          <div className="reveal glass rounded-3xl p-6 sm:p-8">
            <input value={question} onChange={(event) => setQuestion(event.target.value)} className="input-field" placeholder="Ask: delivery, Hilux brake pads, fitment..." />
            <div className="mt-6 space-y-4">
              {(question ? answerResults : answerBank).map(([q, a]) => (
                <details key={q} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <summary className="cursor-pointer list-none font-black text-white">{q}</summary>
                  <p className="mt-3 leading-7 text-stone-300">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pointer-events-none fixed bottom-24 right-4 z-[60] w-[min(92vw,390px)] sm:right-5">
        <input id="live-chat-toggle" type="checkbox" className="mobile-toggle" aria-label="Toggle live chat" />
        <div className="chat-panel glass pointer-events-auto mb-4 overflow-hidden rounded-3xl border border-amber-300/20 shadow-deep">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/50 p-4">
              <div>
                <p className="font-black text-white">Paxton Live Chat</p>
                <p className="text-xs text-emerald-300">Online demo assistant</p>
              </div>
              <label htmlFor="live-chat-toggle" className="chat-toggle-button grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white">
                <i className="fa-solid fa-xmark" />
              </label>
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto p-4">
              {chatMessages.map(([sender, text], index) => (
                <div key={`${sender}-${index}`} className={`rounded-2xl p-3 text-sm ${sender === "You" ? "ml-8 bg-amber-300 text-black" : "mr-8 bg-white/10 text-stone-100"}`}>
                  <strong>{sender}: </strong>{text}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
              {["Need Hilux brakes", "Do you deliver?", "Check battery stock"].map((item) => (
                <button key={item} onClick={() => sendChat(item)} className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-stone-200 hover:bg-white/15">{item}</button>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); sendChat(); }} className="flex gap-2 p-3 pt-0">
              <input value={chatText} onChange={(event) => setChatText(event.target.value)} className="input-field" placeholder="Type your message..." />
              <button className="btn-gold"><i className="fa-solid fa-paper-plane" /></button>
            </form>
            <div className="border-t border-white/10 p-3 pt-0">
              <button onClick={openChatOnWhatsApp} className="w-full rounded-xl bg-[#25D366] px-4 py-3 font-black text-white transition hover:brightness-110">
                Continue on WhatsApp <i className="fa-brands fa-whatsapp ml-2" />
              </button>
            </div>
        </div>
        <label htmlFor="live-chat-toggle" className="chat-toggle-button pointer-events-auto ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-300 text-2xl text-black shadow-gold transition hover:scale-110 sm:h-16 sm:w-16" aria-label="Open live chat">
          <i className="fa-solid fa-message" />
        </label>
      </div>
    </>
  );
}
