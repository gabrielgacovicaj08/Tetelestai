import { motion } from "framer-motion";
import beforeAfter23 from "../assets/before-after23.webp";
import beforeAfter24 from "../assets/before-after24.webp";
import beforeAfter2 from "../assets/before-after2.webp";
import houseExtension from "../assets/hero-placeholder_edited_edited.webp";

function Services() {
  const services = [
    {
      title: "Total Renovation",
      subtitle: "Renovate your home from the ground up with purpose",
      description:
        "Delivering total home upgrades with care, precision, and skilled craftsmanship.",
      src: beforeAfter23,
    },
    {
      title: "House Extension",
      subtitle: "Expand your living space with seamless design",
      description:
        "Transform your home with thoughtful extensions that blend with your existing structure.",
      src: houseExtension,
    },
    {
      title: "Bathroom Remodel",
      subtitle: "Create comfort with practical luxury",
      description:
        "From waterproofing to fixtures, we build bathrooms that feel refined and perform for years.",
      src: beforeAfter2,
    },
    {
      title: "Kitchen Remodel",
      subtitle: "Make the heart of your home work better",
      description:
        "Design-led renovation, storage planning, and finish quality that improve both look and workflow.",
      src: beforeAfter24,
    },
  ];

  const cardReveal = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
        {services.map((service, index) => (
          <motion.article
            key={index}
            className="group overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-[0_18px_56px_rgba(16,25,34,0.12)] backdrop-blur-md"
            variants={cardReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="overflow-hidden">
              <img
                src={service.src}
                alt={service.title}
                className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-7">
              <h3 className="text-2xl font-semibold text-[var(--brand-deep)]">{service.title}</h3>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-[#9b7a43]">
                {service.subtitle}
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{service.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Services;
