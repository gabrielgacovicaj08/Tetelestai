import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiLoader,
  FiMapPin,
  FiX,
} from "react-icons/fi";

const sortByPath = ([a], [b]) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const toSortedEntries = (modules) => Object.entries(modules).sort(sortByPath);

const northHillModules = import.meta.glob("../assets/North Hill dr/*.webp", {
  import: "default",
});
const kilbrideModules = import.meta.glob("../assets/kilbride ln/*.webp", {
  import: "default",
});
const loversLaneModules = import.meta.glob("../assets/LoversLane/*.webp", {
  import: "default",
});
const huntingtonModules = import.meta.glob("../assets/Huntington/*.webp", {
  import: "default",
});
const twinCovesModules = import.meta.glob("../assets/Twin coves/*.webp", {
  import: "default",
});
const opalLnModules = import.meta.glob("../assets/623 Opal Ln/*.webp", {
  import: "default",
});

const projectSources = [
  {
    title: "Richardson Heights",
    location: "Richardson, TX",
    scope: "Whole Home",
    entries: toSortedEntries(northHillModules),
    galleryLimit: 24,
  },
  {
    title: "Highlands North",
    location: "Dallas, TX",
    scope: "Kitchen and Master Bathroom",
    entries: toSortedEntries(kilbrideModules),
    galleryLimit: 24,
  },
  {
    title: "Caruth Hills",
    location: "Dallas, TX",
    scope: "Whole House",
    entries: toSortedEntries(loversLaneModules),
    galleryLimit: 36,
  },
  {
    title: "Huntington",
    location: "Dallas, TX",
    scope: "Kitchen and Living Area",
    entries: toSortedEntries(huntingtonModules),
    galleryLimit: 24,
  },
  {
    title: "Prestonwood Creek",
    location: "Dallas, TX",
    scope: "Kitchen and Media Room",
    entries: toSortedEntries(twinCovesModules),
    galleryLimit: 24,
  },
  {
    title: "Floyd Terrace",
    location: "Richardson, TX",
    scope: "Full House Renovation",
    entries: toSortedEntries(opalLnModules),
    galleryLimit: 30,
  },
].filter((project) => project.entries.length > 0);

async function loadImageList(entries, limit) {
  const loaders = entries.slice(0, limit).map(([, loader]) => loader);
  const loaded = await Promise.all(loaders.map((load) => load()));
  return loaded.filter(Boolean);
}

function ProjectGalleryModal({ project, isLoading, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    setLightboxIndex(null);
  }, [project?.title]);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          return;
        }
        onClose();
      }

      if (lightboxIndex === null || project.gallery.length === 0) return;
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % project.gallery.length);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex(
          (prev) =>
            (prev - 1 + project.gallery.length) % project.gallery.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, lightboxIndex]);

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#0f1720] text-white shadow-[0_25px_90px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b171]">
              Project Gallery
            </p>
            <h3 className="mt-1 text-xl font-semibold md:text-2xl">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/25 p-2 text-white/90 transition hover:border-white/50 hover:bg-white/10"
            aria-label="Close project gallery"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
            <FiMapPin size={14} />
            {project.location}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
            {project.images} Photos
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
            {project.scope}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {isLoading ? (
            <div className="flex min-h-52 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 text-sm text-white/85">
              <FiLoader className="animate-spin" size={18} />
              Loading project gallery...
            </div>
          ) : (
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
              {project.gallery.map((imageSrc, idx) => (
                <button
                  key={`${project.title}-${idx}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:scale-[1.01] hover:border-white/35"
                  aria-label={`Open ${project.title} image ${idx + 1}`}
                >
                  <img
                    src={imageSrc}
                    alt={`${project.title} image ${idx + 1}`}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && !isLoading ? (
            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center bg-black/85 p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
            >
              <button
                className="absolute left-4 rounded-full border border-white/30 bg-black/35 p-2 text-white transition hover:border-white/60 hover:bg-black/60"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (prev) =>
                      (prev - 1 + project.gallery.length) %
                      project.gallery.length,
                  );
                }}
                aria-label="Previous image"
              >
                <FiChevronLeft size={24} />
              </button>
              <img
                src={project.gallery[lightboxIndex]}
                alt={`${project.title} fullscreen ${lightboxIndex + 1}`}
                loading="lazy"
                className="max-h-[90%] max-w-[92%] rounded-2xl object-contain"
                onClick={(event) => event.stopPropagation()}
              />
              <button
                className="absolute right-4 rounded-full border border-white/30 bg-black/35 p-2 text-white transition hover:border-white/60 hover:bg-black/60"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (prev) => (prev + 1) % project.gallery.length,
                  );
                }}
                aria-label="Next image"
              >
                <FiChevronRight size={24} />
              </button>
              <div className="pointer-events-none absolute bottom-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                {lightboxIndex + 1} / {project.gallery.length}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectPortfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [projectCards, setProjectCards] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const baseProjects = useMemo(
    () =>
      projectSources.map((project) => ({
        title: project.title,
        location: project.location,
        scope: project.scope,
        entries: project.entries,
        galleryLimit: project.galleryLimit,
        images: Math.min(project.entries.length, project.galleryLimit),
      })),
    [],
  );

  useEffect(() => {
    let isMounted = true;

    const loadCardPreviews = async () => {
      const cards = await Promise.all(
        baseProjects.map(async (project) => {
          const previews = await loadImageList(
            project.entries,
            Math.min(2, project.images),
          );
          return {
            title: project.title,
            location: project.location,
            scope: project.scope,
            images: project.images,
            cover: previews[0] ?? "",
            accent: previews[1] ?? previews[0] ?? "",
            gallery: [],
          };
        }),
      );

      if (isMounted) {
        setProjectCards(cards.filter((project) => project.cover));
      }
    };

    loadCardPreviews();

    return () => {
      isMounted = false;
    };
  }, [baseProjects]);

  const openProject = useCallback(
    async (projectTitle) => {
      const projectMeta = baseProjects.find(
        (project) => project.title === projectTitle,
      );
      if (!projectMeta) return;

      const existing = projectCards.find(
        (project) => project.title === projectTitle,
      );

      setActiveProject(
        existing ?? {
          title: projectMeta.title,
          location: projectMeta.location,
          scope: projectMeta.scope,
          images: projectMeta.images,
          cover: "",
          accent: "",
          gallery: [],
        },
      );

      if (existing?.gallery?.length) {
        setGalleryLoading(false);
        return;
      }

      setGalleryLoading(true);

      try {
        const gallery = await loadImageList(
          projectMeta.entries,
          projectMeta.galleryLimit,
        );

        setProjectCards((prev) =>
          prev.map((project) =>
            project.title === projectTitle
              ? {
                  ...project,
                  gallery,
                }
              : project,
          ),
        );

        setActiveProject((prev) => {
          if (!prev || prev.title !== projectTitle) return prev;
          return {
            ...prev,
            gallery,
          };
        });
      } finally {
        setGalleryLoading(false);
      }
    },
    [baseProjects, projectCards],
  );

  return (
    <section className="section-shell py-10 md:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">
          Project Portfolio
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
          Uploaded Project Galleries
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectCards.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="group overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-[0_18px_56px_rgba(16,25,34,0.12)] backdrop-blur-md"
          >
            <div className="relative h-[250px] overflow-hidden">
              <img
                src={project.cover}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              {project.accent ? (
                <img
                  src={project.accent}
                  alt={`${project.title} detail`}
                  loading="lazy"
                  className="absolute bottom-4 right-4 h-20 w-28 rounded-xl border-2 border-white/80 object-cover shadow-[0_10px_24px_rgba(0,0,0,0.35)] md:h-24 md:w-32"
                />
              ) : null}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[var(--brand-deep)]">
                {project.title}
              </h3>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-[#9b7a43]">
                <FiMapPin size={14} />
                {project.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {project.scope}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {project.images} Photos
                </span>
                <button
                  onClick={() => openProject(project.title)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#e3bf7b] px-5 py-2.5 text-sm font-semibold text-[#1b1b1b] transition hover:-translate-y-0.5 hover:bg-[#d3ac61]"
                >
                  Open Gallery
                  <FiExternalLink size={15} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectGalleryModal
            project={activeProject}
            isLoading={galleryLoading}
            onClose={() => {
              setActiveProject(null);
              setGalleryLoading(false);
            }}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
