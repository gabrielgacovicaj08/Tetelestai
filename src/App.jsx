import "./App.css";
import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { motion } from "framer-motion";
import InstantEstimate from "./components/InstantEstimate";
import MobileLeadBar from "./components/MobileLeadBar";
import DesktopLeadRail from "./components/DesktopLeadRail";
import { installGlobalLeadClickTracking } from "./utils/leadTracking";

const StatsStrip = lazy(() => import("./components/StatsStrip"));
const Services = lazy(() => import("./components/Services"));
const WhatTetelestaiCanDo = lazy(() => import("./components/WhatTetelestaiCanDo"));
const ProcessTimeline = lazy(() => import("./components/ProcessTimeline"));
const OurMission = lazy(() => import("./components/OurMission"));
const Reviews = lazy(() => import("./components/Reviews"));
const ProjectPortfolio = lazy(() => import("./components/ProjectPortfolio"));
const FAQ = lazy(() => import("./components/FAQ"));
const Footer = lazy(() => import("./components/Footer"));

const sectionFallback = (
  <div className="section-shell py-10" aria-hidden="true">
    <div className="h-24 animate-pulse rounded-2xl bg-black/5" />
  </div>
);

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
      label: "FAQ",
      href: "#faq",
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

  useEffect(() => {
    const preloadSections = () => {
      import("./components/StatsStrip");
      import("./components/Services");
      import("./components/WhatTetelestaiCanDo");
      import("./components/ProcessTimeline");
      import("./components/OurMission");
      import("./components/Reviews");
      import("./components/ProjectPortfolio");
      import("./components/FAQ");
      import("./components/Footer");
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadSections, {
        timeout: 1500,
      });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preloadSections, 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const teardown = installGlobalLeadClickTracking();
    return teardown;
  }, []);

  return (
    <div className="mx-auto min-h-screen overflow-x-hidden">
      <Navbar title="Tetelestai Renovations" links={links} />
      <main className="pt-20 pb-24 md:pb-0">
        <Hero />

        <section id="projects">
          <Suspense fallback={sectionFallback}>
            <Services />
          </Suspense>
        </section>

        <Suspense fallback={sectionFallback}>
          <StatsStrip />
        </Suspense>

        <section id="capabilities">
          <Suspense fallback={sectionFallback}>
            <WhatTetelestaiCanDo />
          </Suspense>
        </section>

        <section id="process">
          <Suspense fallback={sectionFallback}>
            <ProcessTimeline />
          </Suspense>
        </section>

        <Suspense fallback={sectionFallback}>
          <OurMission />
        </Suspense>

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
            <Suspense fallback={sectionFallback}>
              <Reviews />
            </Suspense>
          </motion.div>
        </section>

        <section id="portfolio">
          <Suspense fallback={sectionFallback}>
            <ProjectPortfolio />
          </Suspense>
        </section>

        <Suspense fallback={sectionFallback}>
          <FAQ />
        </Suspense>

        <InstantEstimate />
      </main>

      <section id="contact" className="scroll-mt-28" aria-label="Contact Tetelestai Renovations">
        <Suspense fallback={sectionFallback}>
          <Footer />
        </Suspense>
      </section>
      <DesktopLeadRail />
      <MobileLeadBar />
    </div>
  );
}

export default App;
