import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import beforeAfter23 from "../assets/before-after23.webp";
import beforeAfter24 from "../assets/before-after24.webp";
import beforeAfter2 from "../assets/before-after2.webp";
import homeWelcome1 from "../assets/Home-Welcome-1.webp";
import homeWelcome2 from "../assets/hero-placeholder_edited_edited (1).webp";
import kilbrideAfter from "../assets/24-019_7818 Kilbride Ln_edited.webp";
import northillExtra1 from "../assets/08-005_620 Northill Dr.webp";
import northillExtra2 from "../assets/14-016_620 Northill Dr.webp";
import kilbrideExtra from "../assets/18-010_7818 Kilbride Ln.webp";
import interiorExtra1 from "../assets/G7400232-HDR-Enhanced-NR.webp";
import interiorExtra2 from "../assets/G7400609-Enhanced-NR.webp";

const projects = [
  {
    title: "Northill Drive Whole-Home Renovation",
    location: "Richardson, TX",
    duration: "12 weeks",
    budget: "$120k - $180k",
    scope: "Kitchen, living areas, lighting, flooring, and structural refinements.",
    beforeImage: beforeAfter23,
    afterImage: homeWelcome1,
    highlights: [
      "Full demolition and rebuild of main living zones",
      "Lighting redesign and custom finish upgrades",
      "Flooring replacement with modern continuous flow",
    ],
    gallery: [homeWelcome1, northillExtra1, northillExtra2],
  },
  {
    title: "Kilbride Lane Kitchen + Bath Remodel",
    location: "Dallas, TX",
    duration: "8 weeks",
    budget: "$70k - $110k",
    scope: "Custom cabinetry, tile package, vanity updates, and fixture replacement.",
    beforeImage: beforeAfter2,
    afterImage: kilbrideAfter,
    highlights: [
      "Cabinet reconfiguration to maximize storage",
      "Updated tile and shower finishes with clean lines",
      "Plumbing and electrical fixture modernization",
    ],
    gallery: [kilbrideAfter, kilbrideExtra, beforeAfter2],
  },
  {
    title: "Open-Concept Interior Refresh",
    location: "Plano, TX",
    duration: "6 weeks",
    budget: "$45k - $80k",
    scope: "Wall reconfiguration, paint, trim, and full finish modernization.",
    beforeImage: beforeAfter24,
    afterImage: homeWelcome2,
    highlights: [
      "Wall adjustments to open sight-lines",
      "Fresh paint and trim package across shared spaces",
      "Finish coordination for a cohesive modern interior",
    ],
    gallery: [homeWelcome2, interiorExtra1, interiorExtra2],
  },
];

function BeforeAfterSlider({ beforeImage, afterImage, title }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative h-[260px] w-full overflow-hidden rounded-2xl md:h-[320px]">
      <img src={afterImage} alt={`${title} after renovation`} className="h-full w-full object-cover" />

      <img
        src={beforeImage}
        alt={`${title} before renovation`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <div className="absolute inset-y-0 z-10" style={{ left: `calc(${position}% - 1px)` }}>
        <div className="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]" />
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#0f1720]/85 text-xs font-semibold text-white">
          |||
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        Before
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#0f1720]/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        After
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-x-4 bottom-4 z-20 accent-[#e3bf7b]"
        aria-label={`${title} before and after slider`}
      />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-3xl border border-white/20 bg-[#101821] text-white shadow-[0_26px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#101821]/95 px-5 py-4 backdrop-blur-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b171]">Case Study</p>
            <h3 className="mt-1 text-xl font-semibold md:text-2xl">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/25 p-2 text-white/90 transition hover:border-white/50 hover:bg-white/10"
            aria-label="Close project details"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-5 md:p-7">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              {project.location}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              Duration: {project.duration}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              Budget: {project.budget}
            </span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">{project.scope}</p>

          <h4 className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b171]">
            Highlights
          </h4>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/90 md:text-base">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d8b171]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b171]">Gallery</h4>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {project.gallery.map((imageSrc, idx) => (
              <img
                key={`${project.title}-${idx}`}
                src={imageSrc}
                alt={`${project.title} gallery ${idx + 1}`}
                className="h-44 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectPortfolio() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="section-shell py-10 md:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">
          Project Portfolio
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
          Before and After Transformations
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-[0_18px_56px_rgba(16,25,34,0.12)] backdrop-blur-md"
          >
            <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:p-0">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={project.title}
              />

              <div className="p-3 md:p-5 lg:p-8">
                <h3 className="text-2xl font-semibold text-[var(--brand-deep)]">{project.title}</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-[#9b7a43]">
                  {project.location}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    Duration: {project.duration}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    Budget: {project.budget}
                  </span>
                </div>

                <p className="mt-5 text-base leading-relaxed text-slate-600">{project.scope}</p>

                <button
                  onClick={() => setActiveProject(project)}
                  className="mt-6 rounded-full bg-[#e3bf7b] px-5 py-2.5 text-sm font-semibold text-[#1b1b1b] transition hover:-translate-y-0.5 hover:bg-[#d3ac61]"
                >
                  View Full Case Study
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
