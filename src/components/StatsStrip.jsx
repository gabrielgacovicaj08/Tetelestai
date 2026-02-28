import { useEffect, useRef, useState } from "react";

function useCountUp(target, durationMs, shouldStart) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return undefined;

    let frameId = null;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, durationMs, shouldStart]);

  return value;
}

function CountItem({ label, value, suffix = "+" }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 1300, started);

  return (
    <article
      ref={ref}
      className="rounded-2xl border border-white/55 bg-white/75 p-5 text-center shadow-[0_10px_32px_rgba(16,25,34,0.1)] backdrop-blur-md"
    >
      <p className="text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
        {label}
      </p>
    </article>
  );
}

export default function StatsStrip() {
  const stats = [
    { label: "Completed Projects", value: 240 },
    { label: "Skilled Personnel", value: 36 },
    { label: "Years in the Industry", value: 14 },
    { label: "Positive References", value: 180 },
  ];

  return (
    <section className="section-shell py-8 md:py-12">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((item) => (
          <CountItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}
