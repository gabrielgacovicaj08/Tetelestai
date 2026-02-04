import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const slides = [
    {
      title: "Make Your Dream Home",
      image:
        "https://cdn.home-designing.com/wp-content/uploads/2018/09/modern-chandeliers.jpg",
    },
    {
      title: "Design Modern Interiors",
      image:
        "https://cdn.home-designing.com/wp-content/uploads/2018/09/Wood-store-ideas.jpg",
    },
    {
      title: "Crafted with Precision",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <div className="body-bg grid grid-cols-3 h-[550px] mt-14">
      <div className="flex flex-col justify-center items-start items-center p-4">
        <div className=" flex flex-row">Tetelestai</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:text-sm lg:text-4xl flex flex-row">
              {slide.title}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-row mt-20">
          <button
            onClick={prev}
            className="px-4 py-2 text-black rounded hover:bg-gray-700 transition"
          >
            ←
          </button>
          <button
            onClick={next}
            className="px-4 py-2 text-black rounded hover:bg-gray-700 transition"
          >
            →
          </button>
        </div>
      </div>

      <div className="col-span-2 relative overflow-hidden p-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            className="img-fixed"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 10 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
