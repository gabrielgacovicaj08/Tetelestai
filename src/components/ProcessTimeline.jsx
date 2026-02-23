import { motion } from "framer-motion";
import { LuClipboardCheck, LuFileCheck2, LuPencilRuler, LuHammer, LuHouse } from "react-icons/lu";

const steps = [
  {
    title: "Consultation",
    icon: LuClipboardCheck,
    description: "We discuss your goals, measure the space, and align on the right project direction.",
  },
  {
    title: "Estimate",
    icon: LuFileCheck2,
    description: "You get a transparent scope, timeline, and budget range before work begins.",
  },
  {
    title: "Design and Planning",
    icon: LuPencilRuler,
    description: "Layouts, materials, and construction sequence are finalized for a smooth build phase.",
  },
  {
    title: "Build",
    icon: LuHammer,
    description: "Our crew executes the renovation with quality control, progress updates, and clean job sites.",
  },
  {
    title: "Final Walkthrough",
    icon: LuHouse,
    description: "We review every detail with you, complete touch-ups, and close out with confidence.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">Our Process</p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
          How Your Project Moves From Idea to Finish
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-slate-300/90 md:left-1/2 md:block md:-translate-x-1/2" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step, index) => {
            const isRight = index % 2 === 1;

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className={`relative rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_12px_36px_rgba(16,25,34,0.1)] backdrop-blur-md ${
                  isRight ? "md:mt-12" : ""
                }`}
              >
                <div className="absolute -top-3 left-6 h-6 w-6 rounded-full border border-white/70 bg-[#e3bf7b] shadow md:left-auto md:right-6" />
                <div className="flex items-center gap-3">
                  <step.icon className="text-[#92671d]" size={23} />
                  <h3 className="text-xl font-semibold text-[var(--brand-deep)]">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
