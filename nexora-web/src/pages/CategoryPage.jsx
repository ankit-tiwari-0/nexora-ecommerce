import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components.jsx/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();

  const {
    fetchProductsByCategory,
    products,
    loading,
  } = useProductStore();

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    }
  }, [fetchProductsByCategory, category]);

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Products";

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400"
          >
            Explore our collection
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {categoryName}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Discover quality products selected just for you.
          </p>

          {!loading && products?.length > 0 && (
            <p className="mt-4 text-sm text-emerald-400">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"} available
            </p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-gray-700 bg-gray-800/60 p-3"
              >
                <div className="h-60 rounded-lg bg-gray-700" />

                <div className="mt-5 space-y-3 px-2 pb-3">
                  <div className="h-5 w-3/4 rounded bg-gray-700" />
                  <div className="h-8 w-1/2 rounded bg-gray-700" />
                  <div className="h-10 w-full rounded bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 px-6 text-center"
          >
            <div className="mb-5 rounded-full bg-gray-800 p-5">
              <PackageSearch
                size={48}
                className="text-gray-500"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-200">
              No products found
            </h2>

            <p className="mt-3 max-w-md text-sm text-gray-400">
              We couldn't find any products in this category.
              Please check back later.
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && products?.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 25,
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
                className="flex h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;