import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <motion.div
        animate={{
          y: [0, -3, 0, 3, 0],
          scale: [1, 1.03, 1, 1.03, 1],
          textShadow: [
            "0 0 5px rgba(16, 185, 129, 0.4)",
            "0 0 20px rgba(16, 185, 129, 1)",
            "0 0 8px rgba(16, 185, 129, 0.6)",
            "0 0 25px rgba(16, 185, 129, 1)",
            "0 0 5px rgba(16, 185, 129, 0.4)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="text-2xl font-bold text-emerald-400"
      >
        Nexora
      </motion.div>
    </Link>
  );
};

export default AnimatedLogo;