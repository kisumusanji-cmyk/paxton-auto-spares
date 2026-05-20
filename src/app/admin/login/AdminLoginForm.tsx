"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Wrong password. Try the demo password or set ADMIN_PASSWORD.");
      setLoading(false);
      return;
    }

    window.location.href = next;
  }

  return (
    <form onSubmit={login} className="glass premium-border rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-300 text-black">
          <i className="fa-solid fa-lock text-xl" />
        </span>
        <div>
          <h2 className="text-2xl font-black text-white">Paxton Admin</h2>
          <p className="text-sm text-stone-400">Demo password: paxton-demo-2026</p>
        </div>
      </div>
      <label className="grid gap-2 text-sm font-bold text-stone-200">
        Password
        <input value={password} onChange={(event) => setPassword(event.target.value)} className="input-field" type="password" placeholder="Enter admin password" required />
      </label>
      <button disabled={loading} className="btn-gold mt-6 w-full justify-center disabled:opacity-70">
        {loading ? "Signing in..." : "Open Lead Desk"}
        <i className="fa-solid fa-arrow-right" />
      </button>
      {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">{error}</p>}
    </form>
  );
}
