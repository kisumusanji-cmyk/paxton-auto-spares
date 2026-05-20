import { defaultSiteContent, telUrl, whatsappUrl } from "@/app/lib/paxtonContent";

const paxtonWhatsapp = whatsappUrl(defaultSiteContent.whatsappPhone);

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Products", "#products"],
  ["Checker", "#checker"],
  ["Garage", "#garage"],
  ["Showroom", "#showroom"],
  ["Services", "#services"],
];

export function Header() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/78 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <input id="mobile-nav-toggle" type="checkbox" className="mobile-toggle" aria-label="Toggle mobile menu" />
        <div className="flex h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300 text-black shadow-gold">
              <i className="fa-solid fa-gears text-xl" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-wide text-white">PAXTON</span>
              <span className="block text-[11px] font-bold uppercase tracking-[.28em] text-amber-200">Auto Spares</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-stone-200 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a href={telUrl(defaultSiteContent.phone)} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/15">
              <i className="fa-solid fa-phone mr-2 text-amber-200" />Call Now
            </a>
            <a href={paxtonWhatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <i className="fa-brands fa-whatsapp" />WhatsApp
            </a>
          </div>

          <label
            htmlFor="mobile-nav-toggle"
            className="mobile-menu-button grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10 text-white lg:hidden"
          >
            <i className="fa-solid fa-bars mobile-menu-open-icon" />
            <i className="fa-solid fa-xmark mobile-menu-close-icon" />
          </label>
        </div>

        <div className="mobile-panel lg:hidden">
          <div className="grid gap-2 border-t border-white/10 py-4">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="rounded-xl px-4 py-3 font-black text-stone-200 transition hover:bg-white/10 hover:text-amber-200">
                {label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <a href={telUrl(defaultSiteContent.phone)} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center font-black text-white">
                Call
              </a>
              <a href={paxtonWhatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-amber-300 px-4 py-3 text-center font-black text-black">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
