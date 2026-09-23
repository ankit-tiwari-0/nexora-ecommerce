
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) =>
    set({
      products,
    }),

  createProduct: async (productData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.post(
        "/product",
        productData
      );

      set((state) => ({
        products: [
          ...state.products,
          response.data.product || response.data,
        ],
        loading: false,
      }));

      toast.success("Product created successfully");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create product";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },

  fetchAllProducts: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get("/product");

      set({
        products: response.data.products || response.data,
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch products";

      set({
        error: message,
        loading: false,
      });

      toast.error(message);
    }
  },

  fetchProductsByCategory: async (category) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(
        `/product/category/${encodeURIComponent(category)}`
      );

      set({
        products: response.data.products || response.data,
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch products by category";

      set({
        error: message,
        loading: false,
      });

      toast.error(message);
    }
  },

  deleteProduct: async (productId) => {
    set({
      loading: true,
      error: null,
    });

    try {
      await axios.delete(`/product/${productId}`);

      set((state) => ({
        products: state.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));

      toast.success("Product deleted successfully");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete product";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.patch(
        `/product/${productId}`
      );

      const updatedProduct = response.data.product ||
        response.data;

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? {
                ...product,
                isFeatured:
                  updatedProduct.isFeatured ??
                  response.data.isFeatured,
              }
            : product
        ),
        loading: false,
      }));

      toast.success("Featured status updated");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update featured status";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },

  fetchFeaturedProducts: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(
        "/product/featured"
      );

      set({
        products: response.data.products || response.data,
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch featured products";

      set({
        error: message,
        loading: false,
      });

      toast.error(message);
    }
  },
}));