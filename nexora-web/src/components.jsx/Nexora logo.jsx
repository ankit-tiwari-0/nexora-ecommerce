import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedLogo = () => {
  return (
    <Link to="/" className="relative inline-flex items-center">
      <motion.span
        className="absolute inset-0 text-2xl font-black text-emerald-400 blur-md"
        animate={{
          opacity: [0.45, 0.9, 0.45],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      >
        Nexora
      </motion.span>

      <motion.span
        className="relative bg-[linear-gradient(90deg,#10b981,#34d399,#a7f3d0,#10b981)] bg-[length:300%_100%] bg-clip-text text-2xl font-black text-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "300% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        Nexora
      </motion.span>
    </Link>
  );
};

export default AnimatedLogo;