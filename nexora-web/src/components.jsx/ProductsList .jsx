
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Star,
  Package,
  Loader2,
  Search,
  AlertTriangle,
  X,
} from "lucide-react";

import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const {
    products,
    loading,
    fetchAllProducts,
    deleteProduct,
    toggleFeaturedProduct,
  } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Make sure products is always an array
  const productList = Array.isArray(products)
    ? products
    : Array.isArray(products?.products)
      ? products.products
      : [];

  const filteredProducts = productList.filter((product) => {
    const searchValue = searchTerm.toLowerCase();

    return `${product.name || ""} ${product.category || ""}`
      .toLowerCase()
      .includes(searchValue);
  });

  const selectedProduct = productList.find(
    (product) => product._id === deleteProductId
  );

  const handleDelete = async () => {
    if (!deleteProductId) return;

    await deleteProduct(deleteProductId);
    setDeleteProductId(null);
  };

  return (
    <>
      <motion.div
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gray-900/80 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="border-b border-white/10 .bg-white/[0.03] p-5 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                  <Package className="h-5 w-5" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Inventory
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Product Management
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Manage your Nexora store products.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gray-800/70 px-4 py-3">
              <p className="text-xs text-gray-400">Total Products</p>

              <p className="text-2xl font-bold text-emerald-400">
                {productList.length}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-6">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-gray-800/80 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && productList.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />

            <p className="text-sm text-gray-400">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 rounded-full bg-gray-800 p-4">
              <Package className="h-8 w-8 text-gray-500" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              No products found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Try another search or create your first product.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full">
                <thead className="border-b border-white/10 .bg-white/[0.03]">
                  <tr>
                    {[
                      "Product",
                      "Price",
                      "Category",
                      "Featured",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group transition-colors .hover:bg-white/[0.04]"
                      >
                        {/* Product */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                product.image ||
                                "https://placehold.co/80x80/1f2937/9ca3af?text=No+Image"
                              }
                              alt={product.name || "Product"}
                              className="h-12 w-12 rounded-xl border border-white/10 object-cover"
                            />

                            <div>
                              <p className="max-w-52 truncate text-sm font-semibold text-white">
                                {product.name || "Unnamed Product"}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                ID: {product._id?.slice(-6) || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <span className="text-sm font-semibold text-emerald-400">
                            ₹{Number(product.price || 0).toFixed(2)}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <span className="rounded-full border border-white/10 bg-gray-800 px-3 py-1 text-xs text-gray-300">
                            {product.category || "Uncategorized"}
                          </span>
                        </td>

                        {/* Featured */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              toggleFeaturedProduct(product._id)
                            }
                            disabled={loading}
                            aria-label={
                              product.isFeatured
                                ? "Remove from featured"
                                : "Add to featured"
                            }
                            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                              product.isFeatured
                                ? "bg-yellow-400/15 text-yellow-400 ring-1 ring-yellow-400/30"
                                : "bg-gray-800 text-gray-400 hover:bg-yellow-400/10 hover:text-yellow-400"
                            }`}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                product.isFeatured ? "fill-current" : ""
                              }`}
                            />

                            {product.isFeatured ? "Featured" : "Feature"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteProductId(product._id)
                            }
                            aria-label={`Delete ${product.name}`}
                            className="rounded-xl p-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 p-4 md:hidden">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-gray-800/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={
                        product.image ||
                        "https://placehold.co/80x80/1f2937/9ca3af?text=No+Image"
                      }
                      alt={product.name || "Product"}
                      className="h-16 w-16 rounded-xl border border-white/10 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-white">
                        {product.name || "Unnamed Product"}
                      </h3>

                      <p className="mt-1 text-sm text-emerald-400">
                        ₹{Number(product.price || 0).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {product.category || "Uncategorized"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDeleteProductId(product._id)}
                      aria-label={`Delete ${product.name}`}
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        toggleFeaturedProduct(product._id)
                      }
                      disabled={loading}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        product.isFeatured
                          ? "bg-yellow-400/15 text-yellow-400"
                          : "bg-gray-700 text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                      }`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          product.isFeatured ? "fill-current" : ""
                        }`}
                      />

                      {product.isFeatured
                        ? "Remove from Featured"
                        : "Add to Featured"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteProductId && (
          <motion.div
            className="fixed inset-0 z-\[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteProductId(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-900 p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteProductId(null)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3
                id="delete-title"
                className="mt-5 text-xl font-bold text-white"
              >
                Delete Product?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  {selectedProduct?.name || "this product"}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteProductId(null)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Delete Product
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsList;