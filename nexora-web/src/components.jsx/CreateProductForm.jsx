import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";

import { useProductStore } from "../stores/useProductStore";

const categories = [
  "Medicinee",
  "Arts & Crafts",
  "Baby Products",
  "Beauty",
  "Car Accessories",
  "Kitchen Essentials",
  "Educational Supplies",
  "Electronics",
  "Fashion",
  "Fragrances",
  "Groceries",
  "Hair Care",
  "Home & Living",
  "Jewelry",
  "Makeup",
  "Personal Care Men", // hhh  
  "Pet Supplies",
  "Snacks",
  "Sport",
  "Travel",
  "Sin products"
];

const initialProduct = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState(initialProduct);

  const { createProduct, loading } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...newProduct,
      price: Number(newProduct.price),
    };

    try {
      await createProduct(productData);

      setNewProduct(initialProduct);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      className="mx-auto mb-8 w-full max-w-2xl rounded-2xl border border-gray-700 bg-gray-800/90 p-5 shadow-xl sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-emerald-300">
          Create New Product
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Add a new product to your Nexora store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Price
          </label>

          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Enter product price"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            required
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Product Image
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />

            <label
              htmlFor="image"
              className="inline-flex cursor-pointer items-center rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-600 focus-within:ring-2 focus-within:ring-emerald-500"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Image
            </label>

            {newProduct.image && (
              <span className="text-sm text-emerald-400">
                Image uploaded ✓
              </span>
            )}
          </div>

          {/* Image Preview */}
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Product preview"
              className="mt-4 h-40 w-40 rounded-lg border border-gray-600 object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Creating Product...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;