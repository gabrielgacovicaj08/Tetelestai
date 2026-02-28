import { motion } from "framer-motion";
import {
  LuHammer,
  LuPaintbrush,
  LuPanelTop,
  LuDroplets,
  LuLightbulb,
  LuHousePlus,
  LuRuler,
  LuWrench,
  LuGrid2X2,
} from "react-icons/lu";

const capabilities = [
  {
    title: "Renovation",
    icon: LuHammer,
    description:
      "Complete home and room transformations with practical planning, quality materials, and clean execution.",
  },
  {
    title: "Painting",
    icon: LuPaintbrush,
    description:
      "Interior and exterior painting with careful prep, durable coatings, and a smooth, consistent finish.",
  },
  {
    title: "Plastering",
    icon: LuPanelTop,
    description:
      "Wall and ceiling plaster repairs and refinishing for a solid, level surface ready for paint and trim.",
  },
  {
    title: "Plumbing",
    icon: LuDroplets,
    description:
      "Fixture replacements and plumbing updates that improve reliability, water flow, and day-to-day function.",
  },
  {
    title: "Electrical",
    icon: LuLightbulb,
    description:
      "Lighting and electrical upgrades focused on safety, performance, and modern usability throughout your home.",
  },
  {
    title: "Remodeling",
    icon: LuHousePlus,
    description:
      "Kitchen, bathroom, and living-space remodels designed around your goals, budget, and timeline.",
  },
  {
    title: "Carpentry",
    icon: LuRuler,
    description:
      "Custom woodwork, framing updates, and detailed finish carpentry built to fit your space perfectly.",
  },
  {
    title: "Installation",
    icon: LuWrench,
    description:
      "Professional installation of cabinets, fixtures, hardware, and finishes with precise alignment and fit.",
  },
  {
    title: "Tiling",
    icon: LuGrid2X2,
    description:
      "Floor and wall tile installation with accurate layout, clean grout lines, and long-lasting results.",
  },
];

export default function WhatTetelestaiCanDo() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">
          What Tetelestai Can Do For You
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
          Built Around Your Home Improvement Needs
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
            className="group relative min-h-[184px] overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_12px_36px_rgba(16,25,34,0.1)] backdrop-blur-md"
            tabIndex={0}
          >
            <div className="pointer-events-none absolute inset-0 bg-[var(--brand-deep)]/95 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
            <div className="relative z-10">
              <item.icon className="text-[var(--brand-deep)] transition duration-300 group-hover:text-white group-focus-within:text-white" size={28} />
              <h3 className="mt-4 text-xl font-semibold text-[var(--brand-deep)] transition duration-300 group-hover:text-white group-focus-within:text-white">
                {item.title}
              </h3>
              <p className="mt-3 translate-y-2 text-sm leading-relaxed text-white/90 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
