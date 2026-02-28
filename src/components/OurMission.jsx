import { motion } from "framer-motion";

export default function OurMission() {
  return (
    <section id="mission" className="section-shell py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-3xl border border-white/60 bg-white/75 p-8 text-center shadow-[0_18px_56px_rgba(16,25,34,0.12)] backdrop-blur-md md:p-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92671d]">
          Our Mission
        </p>
        <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-slate-700 md:text-2xl">
          We believe every home should reflect the people who live in it. Our
          mission is to design and build spaces that elevate daily life,
          combining creativity, precision, and integrity to deliver a seamless
          renovation experience from start to finish.
        </p>
      </motion.div>
    </section>
  );
}
