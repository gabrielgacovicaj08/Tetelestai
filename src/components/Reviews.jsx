import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

const reviews = [
  {
    name: "Burt V.",
    source: "Google",
    stars: 5,
    text: "Zach and the Tetelestai Renovations team are top notch. They are all excellent craftsmen who are professional, reliable and produce amazing results. We tried them out with our kitchen and living room remodel and then hired them for two more bathrooms and our master bath. We highly recommend Tetelestai Renovations.",
  },
  {
    name: "Daniela M. N.",
    source: "Google",
    stars: 5,
    text: "Kitchen looks amazing. They handled everything end-to-end.",
  },
  {
    name: "Anonymous",
    source: "Google",
    stars: 5,
    text: "EXCELLENT WORK! Everything about Tetelestai Renovations is the epitome of excellence. My husband and I used this company to update our kitchen and three bathrooms. I cannot express just how impressed my husband and I are with our experience with this company. From the quality of work to the fact they showed up when they said they would, it was worth every penny. Everything turned out wonderfully. My advice: If you ever see a negative review about this company, don’t believe it. Assume it is a disgruntled competitor who cannot compete with such a great company.",
  },
];

export default function Reviews() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_22px_70px_rgba(16,25,34,0.12)] backdrop-blur-md sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">
            Client Feedback
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
            What Homeowners Say
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-full border border-slate-300 p-2.5 text-slate-700 transition hover:border-slate-500 hover:bg-white"
            aria-label="Previous review"
          >
            <FiArrowLeft size={18} />
          </button>
          <button
            onClick={next}
            className="rounded-full border border-slate-300 p-2.5 text-slate-700 transition hover:border-slate-500 hover:bg-white"
            aria-label="Next review"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative mt-8 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-[#f7f8fa] p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--brand-deep)]">
                  {reviews[active].name}
                </h3>
                <p className="text-sm text-slate-500">
                  {reviews[active].source}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[#c58b25]">
                {Array.from({ length: reviews[active].stars }).map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {reviews[active].text}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition ${
              i === active ? "w-8 bg-[var(--brand-deep)]" : "w-2.5 bg-slate-300"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
