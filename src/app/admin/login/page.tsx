import { Suspense } from "react";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="section-bg flex min-h-screen items-center px-5 py-16 text-stone-100">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <a href="/" className="text-sm font-black text-amber-300 hover:text-amber-200">
            <i className="fa-solid fa-arrow-left mr-2" />Back to website
          </a>
          <p className="section-kicker mt-10">Secure Lead Desk</p>
          <h1 className="section-title">Admin access for quote requests.</h1>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            This protects the lead desk before client handover. In production, set a private admin password in the deployment environment.
          </p>
        </div>

        <Suspense fallback={<div className="glass rounded-3xl p-8 text-stone-300">Loading secure login...</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
