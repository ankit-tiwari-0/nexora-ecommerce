
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./loadingspinner";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/product/recommendations");

        setRecommendations(res.data.products || []);
      } catch (error) {
        console.error(
          "Recommendations error:",
          error.response?.data || error.message
        );

        toast.error(
          error.response?.data?.message ||
            "Unable to load recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10 flex min-h-40 items-center justify-center rounded-3xl border border-white/10 bg-gray-900/60">
        <LoadingSpinner />
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 .bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/20 p-5 shadow-2xl shadow-black/10 sm:p-7"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <ShoppingBag size={21} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  People Also Bought
                </h2>

                <Sparkles
                  size={18}
                  className="text-emerald-400"
                />
              </div>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Discover products you might love
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            Recommended for you
          </span>
        </div>

        {/* Product grid */}
        <motion.div
          className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {recommendations.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="min-w-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PeopleAlsoBought;