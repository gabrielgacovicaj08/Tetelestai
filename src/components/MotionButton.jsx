import { motion } from "framer-motion";

export default function MotionButton({ label, onClick }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.button
      onClick={onClick}
      className="px-5 py-3 rounded bg-gray-500 text-white"
      /* Entrance animation */
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      /* Interaction animations */
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {label}
    </motion.button>
  );
}
