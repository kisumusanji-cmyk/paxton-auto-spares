"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Parts Available", value: 5000, suffix: "+" },
  { label: "Clients Served", value: 1200, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Support Access", value: 24, suffix: "/7" },
];

export function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1700;

        function tick(now: number) {
          const next = Math.min((now - start) / duration, 1);
          setProgress(1 - Math.pow(1 - next, 3));
          if (next < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass rounded-2xl p-7 text-center">
          <div className="gold-text text-5xl font-black">{Math.floor(stat.value * progress).toLocaleString()}{stat.suffix}</div>
          <p className="mt-3 font-bold text-stone-300">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
