import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { motion } from "framer-motion";
import StatsStrip from "./components/StatsStrip";
import InstantEstimate from "./components/InstantEstimate";
import ProjectPortfolio from "./components/ProjectPortfolio";
import Services from "./components/Services";
import WhatTetelestaiCanDo from "./components/WhatTetelestaiCanDo";
import ProcessTimeline from "./components/ProcessTimeline";
import OurMission from "./components/OurMission";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import MobileLeadBar from "./components/MobileLeadBar";

function App() {
  const links = [
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Projects",
      href: "#projects",
    },
    {
      label: "Reviews",
      href: "#reviews",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, x: 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <div className="mx-auto min-h-screen overflow-x-hidden">
      <Navbar title="Tetelestai Renovations" links={links} />
      <main className="pt-20 pb-24 md:pb-0">
        <Hero />
        <InstantEstimate />

        <section id="projects">
          <Services />
        </section>
        <StatsStrip />

        <section id="capabilities">
          <WhatTetelestaiCanDo />
        </section>

        <section id="process">
          <ProcessTimeline />
        </section>

        <OurMission />

        <section id="about" className="section-shell py-18 text-center">
          <motion.div
            className="mx-auto text-sm font-semibold uppercase tracking-[0.26em] text-[#92671d]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            Our Services in Dallas
          </motion.div>
          <motion.div
            className="mx-auto mt-6 max-w-4xl text-2xl leading-snug md:text-4xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            Tetelestai Construction excels in providing renovation services,
            rebuilding, and new construction projects with disciplined planning
            and clean, durable finishes.
          </motion.div>
        </section>

        <section id="reviews" className="section-shell pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Reviews />
          </motion.div>
        </section>

        <section id="portfolio">
          <ProjectPortfolio />
        </section>
      </main>
      <Footer />
      <MobileLeadBar />
    </div>
  );
}

export default App;
