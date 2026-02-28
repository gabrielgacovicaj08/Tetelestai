import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiX,
} from "react-icons/fi";

import totalRenovationCover from "../assets/total renovation/G7400154-HDR.webp";
import houseExtensionCover from "../assets/house extension/04-005_7818 Kilbride Ln.webp";
import bathroomCover from "../assets/bathroom/18-021_620 Northill Dr.webp";
import kitchenCover from "../assets/kitchen/07-004_620 Northill Dr.webp";

const GALLERY_PREVIEW_LIMIT = 12;

const sortByPath = ([a], [b]) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const toSortedEntries = (modules) => Object.entries(modules).sort(sortByPath);

const buildGallery = async (modules, limit = GALLERY_PREVIEW_LIMIT) => {
  const selectedEntries = toSortedEntries(modules).slice(0, limit);
  const gallery = await Promise.all(
    selectedEntries.map(([, load]) => load().then((mod) => mod.default)),
  );
  return gallery;
};

const totalRenovationModules = import.meta.glob("../assets/total renovation/*.webp");
const houseExtensionModules = import.meta.glob("../assets/house extension/*.webp");
const bathroomModules = import.meta.glob("../assets/bathroom/*.webp");
const kitchenModules = import.meta.glob("../assets/kitchen/*.webp");

function ServiceGalleryModal({ service, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const imageCount = service?.gallery?.length ?? 0;

  useEffect(() => {
    setLightboxIndex(null);
  }, [service?.title]);

  useEffect(() => {
    if (!service) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          return;
        }
        onClose();
      }
      if (lightboxIndex === null || imageCount === 0) return;
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % imageCount);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + imageCount) % imageCount);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, onClose, lightboxIndex, imageCount]);

  if (!service) return null;

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
              Service Gallery
            </p>
            <h3 className="mt-1 text-xl font-semibold md:text-2xl">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/25 p-2 text-white/90 transition hover:border-white/50 hover:bg-white/10"
            aria-label="Close service gallery"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {service.loading ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 text-white/80">
              <FiLoader size={24} className="animate-spin" />
              <p className="text-sm uppercase tracking-[0.14em]">
                Loading project photos...
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#d8b171]">
                Click Any Photo to Open
              </p>
              <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
                {service.gallery.map((imageSrc, idx) => (
                  <button
                    key={`${service.title}-${idx}`}
                    onClick={() => setLightboxIndex(idx)}
                    className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:scale-[1.01] hover:border-white/35"
                    aria-label={`Open ${service.title} image ${idx + 1}`}
                  >
                    <img
                      src={imageSrc}
                      alt={`${service.title} image ${idx + 1}`}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <AnimatePresence>
          {!service.loading && lightboxIndex !== null ? (
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
                  setLightboxIndex((prev) => (prev - 1 + imageCount) % imageCount);
                }}
                aria-label="Previous image"
              >
                <FiChevronLeft size={24} />
              </button>
              <img
                src={service.gallery[lightboxIndex]}
                alt={`${service.title} fullscreen ${lightboxIndex + 1}`}
                loading="lazy"
                className="max-h-[90%] max-w-[92%] rounded-2xl object-contain"
                onClick={(event) => event.stopPropagation()}
              />
              <button
                className="absolute right-4 rounded-full border border-white/30 bg-black/35 p-2 text-white transition hover:border-white/60 hover:bg-black/60"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % imageCount);
                }}
                aria-label="Next image"
              >
                <FiChevronRight size={24} />
              </button>
              <div className="pointer-events-none absolute bottom-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                {lightboxIndex + 1} / {imageCount}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Services() {
  const [activeService, setActiveService] = useState(null);
  const [galleryCache, setGalleryCache] = useState({});

  const services = useMemo(
    () => [
      {
        id: "total-renovation",
        title: "Total Renovation",
        subtitle: "Renovate your home from the ground up with purpose",
        description:
          "Delivering total home upgrades with care, precision, and skilled craftsmanship.",
        cover: totalRenovationCover,
        modules: totalRenovationModules,
      },
      {
        id: "house-extension",
        title: "House Extension",
        subtitle: "Expand your living space with seamless design",
        description:
          "Transform your home with thoughtful extensions that blend with your existing structure.",
        cover: houseExtensionCover,
        modules: houseExtensionModules,
      },
      {
        id: "bathroom-remodel",
        title: "Bathroom Remodel",
        subtitle: "Create comfort with practical luxury",
        description:
          "From waterproofing to fixtures, we build bathrooms that feel refined and perform for years.",
        cover: bathroomCover,
        modules: bathroomModules,
      },
      {
        id: "kitchen-remodel",
        title: "Kitchen Remodel",
        subtitle: "Make the heart of your home work better",
        description:
          "Design-led renovation, storage planning, and finish quality that improve both look and workflow.",
        cover: kitchenCover,
        modules: kitchenModules,
      },
    ],
    [],
  );

  const cardReveal = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const openService = async (service) => {
    const cachedGallery = galleryCache[service.id];

    if (cachedGallery) {
      setActiveService({ ...service, gallery: cachedGallery, loading: false });
      return;
    }

    setActiveService({ ...service, gallery: [], loading: true });
    const gallery = await buildGallery(service.modules);

    setGalleryCache((prev) => ({ ...prev, [service.id]: gallery }));
    setActiveService((prev) => {
      if (!prev || prev.id !== service.id) return prev;
      return { ...service, gallery, loading: false };
    });
  };

  return (
    <section className="section-shell py-8 md:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">
            Signature Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)] md:text-4xl">
            Renovation Work That Feels Intentional
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <motion.article
            key={service.id}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-[0_18px_56px_rgba(16,25,34,0.12)] backdrop-blur-md"
            variants={cardReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            onClick={() => openService(service)}
          >
            <div className="overflow-hidden">
              <img
                src={service.cover}
                alt={service.title}
                loading="lazy"
                className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-7">
              <h3 className="text-2xl font-semibold text-[var(--brand-deep)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-[#9b7a43]">
                {service.subtitle}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {service.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {Math.min(
                    GALLERY_PREVIEW_LIMIT,
                    Object.keys(service.modules).length,
                  )}{" "}
                  Photos
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#e3bf7b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1b1b1b]">
                  View Gallery
                  <FiArrowRight size={14} />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeService ? (
          <ServiceGalleryModal
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default Services;
