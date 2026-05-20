"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    const revealAll = () => {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    };

    try {
      if (!("IntersectionObserver" in window)) {
        revealAll();
        return;
      }

      document.documentElement.classList.add("reveal-ready");
      const safetyTimer = window.setTimeout(revealAll, 2200);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px 10% 0px" },
      );

      revealItems.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${Math.min(index * 20, 160)}ms`);
        observer.observe(item);
      });

      const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const onScroll = () => {
        if (isTouchDevice) return;
        const y = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", `${y * 0.08}px`);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.clearTimeout(safetyTimer);
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    } catch {
      document.documentElement.classList.remove("reveal-ready");
      revealAll();
    }
  }, []);

  return null;
}
