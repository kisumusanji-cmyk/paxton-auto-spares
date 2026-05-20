"use client";

import { FormEvent, useState } from "react";
import { defaultSiteContent, whatsappUrl } from "@/app/lib/paxtonContent";

type QuoteState = "idle" | "sending" | "sent" | "error";

export function QuoteForm() {
  const [state, setState] = useState<QuoteState>("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const enrichedDetails = [
      `Part needed: ${values.details}`,
      `Urgency: ${values.urgency}`,
      `Preferred branch: ${values.branch}`,
      `Contact method: ${values.contactMethod}`,
      `Photo/link: ${values.photoUrl || "Not provided"}`,
    ].join("\n");
    const payload = { ...values, details: enrichedDetails };

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Quote request failed");

      setState("sent");
      setMessage("Request received. Paxton Auto Spares will contact you shortly.");
      form.reset();
      setStep(1);
    } catch {
      setState("error");
      setMessage("Something went wrong. Please call or WhatsApp us directly.");
    }
  }

  const whatsappMessage = "Hello Paxton Auto Spares, I want to request a spare part quote.";

  return (
    <form onSubmit={submitQuote} className="glass premium-border rounded-2xl p-6 sm:p-8">
      <div className="mb-6 grid grid-cols-3 gap-2">
        {["Vehicle", "Part", "Contact"].map((label, index) => (
          <button key={label} type="button" onClick={() => setStep(index + 1)} className={`rounded-xl border px-3 py-3 text-xs font-black uppercase tracking-wide transition ${step === index + 1 ? "border-amber-300 bg-amber-300 text-black" : "border-white/10 bg-white/[0.06] text-stone-300"}`}>
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className={step === 1 ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className="grid gap-2 text-sm font-semibold text-stone-200 sm:col-span-2">
          Vehicle
          <input name="vehicle" className="input-field" placeholder="Toyota Hilux 2014, 2.5 diesel" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Preferred branch
          <select name="branch" className="input-field">
            <option>{defaultSiteContent.primaryLocation}</option>
            <option>{defaultSiteContent.secondaryLocation}</option>
            <option>Delivery within Lusaka</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Urgency
          <select name="urgency" className="input-field">
            <option>Today</option>
            <option>Within 24 hours</option>
            <option>This week</option>
            <option>Checking price only</option>
          </select>
        </label>
      </div>

      <div className={step === 2 ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Part category
          <select name="category" className="input-field">
            <option value="">Select category</option>
            <option>Engine Parts</option>
            <option>Brake Systems</option>
            <option>Suspension</option>
            <option>Oils & Lubricants</option>
            <option>Batteries</option>
            <option>Filters</option>
            <option>Cooling Systems</option>
            <option>Body Parts</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Old part photo/link
          <input name="photoUrl" className="input-field" placeholder="Optional image link" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-200 sm:col-span-2">
          What do you need?
          <textarea name="details" rows={5} className="input-field resize-none" placeholder="Example: front brake pads for Nissan Hardbody, urgent pickup today" />
        </label>
      </div>

      <div className={step === 3 ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Full name
          <input name="name" className="input-field" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Phone number
          <input name="phone" className="input-field" placeholder="+260..." />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-200 sm:col-span-2">
          Preferred contact method
          <select name="contactMethod" className="input-field">
            <option>WhatsApp</option>
            <option>Phone call</option>
            <option>SMS</option>
            <option>Email</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {step < 3 ? (
          <button type="button" onClick={() => setStep((current) => Math.min(current + 1, 3))} className="btn-gold justify-center sm:col-span-2">
            Continue <i className="fa-solid fa-arrow-right" />
          </button>
        ) : (
          <>
            <button disabled={state === "sending"} className="btn-gold justify-center disabled:cursor-not-allowed disabled:opacity-70">
              {state === "sending" ? "Sending Request..." : "Send Quote Request"}
              <i className="fa-solid fa-arrow-right" />
            </button>
            <a href={whatsappUrl(defaultSiteContent.whatsappPhone, whatsappMessage)} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#25D366] px-5 py-3 text-center font-black text-white transition hover:brightness-110">
              WhatsApp Instead <i className="fa-brands fa-whatsapp ml-2" />
            </a>
          </>
        )}
      </div>

      {message && (
        <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${state === "sent" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" : "border-red-400/30 bg-red-400/10 text-red-100"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
