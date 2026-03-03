import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import heroMain from "../assets/total renovation/G7400434-HDR-Enhanced-NR.webp";
import heroAltOne from "../assets/kitchen/before-after24.webp";
import heroAltTwo from "../assets/house extension/before-after19.webp";
import { trackLeadEvent } from "../utils/leadTracking";

export default function Hero() {
  const slides = [
    {
      title: "Make your dream home real",
      description:
        "High-end renovation and custom build work for kitchens, bathrooms, and full-home transformations.",
      image: heroMain,
    },
    {
      title: "Design modern interiors",
      description:
        "We combine planning, craftsmanship, and transparent communication from first demo to final walkthrough.",
      image: heroAltOne,
    },
    {
      title: "Built with precision",
      description:
        "Your space gets details that hold up over time, with installation quality that feels intentional in every room.",
      image: heroAltTwo,
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <section className="section-shell grid min-h-[620px] grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[1.05fr_1fr]">
      <div className="rounded-3xl border border-white/60 bg-[var(--brand-card)] p-7 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#92671d]">
          Dallas Renovation Specialists
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="mt-4"
          >
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-[var(--brand-deep)] md:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#instant-estimate"
            onClick={() => trackLeadEvent("estimate_cta_click", { placement: "hero_primary" })}
            className="rounded-full bg-[#e3bf7b] px-6 py-3 text-sm font-semibold text-[#1b1b1b] transition hover:-translate-y-0.5 hover:bg-[#d3ac61]"
          >
            Get Free Estimate
          </a>
          <a
            href="tel:+19408897215"
            onClick={() => trackLeadEvent("call_click", { placement: "hero_secondary" })}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-500"
          >
            Call 940-889-7215
          </a>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            onClick={prev}
            className="rounded-full border border-slate-300 p-2.5 text-slate-700 transition hover:border-slate-500 hover:bg-white"
            aria-label="Previous slide"
          >
            <FiArrowLeft size={18} />
          </button>
          <button
            onClick={next}
            className="rounded-full border border-slate-300 p-2.5 text-slate-700 transition hover:border-slate-500 hover:bg-white"
            aria-label="Next slide"
          >
            <FiArrowRight size={18} />
          </button>
          <div className="ml-2 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition ${
                  i === index ? "w-8 bg-[var(--brand-deep)]" : "w-2.5 bg-slate-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-4 -right-4 h-40 w-40 rounded-full bg-[#d9b983]/40 blur-2xl" />
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="h-[460px] w-full rounded-3xl object-cover shadow-[0_24px_80px_rgba(10,14,20,0.32)] md:h-[540px]"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
