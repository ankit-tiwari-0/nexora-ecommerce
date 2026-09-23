
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

// Always return an array, regardless of the API response format
const normalizeProducts = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (data?.product && typeof data.product === "object") {
    return [data.product];
  }

  return [];
};

const getErrorMessage = (error, fallbackMessage) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    fallbackMessage
  );
};

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => {
    set({
      products: normalizeProducts(products),
    });
  },

  // CREATE PRODUCT
  createProduct: async (productData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.post("/product", productData);

      const newProduct = response.data?.product || response.data;

      set((state) => ({
        products: [
          ...normalizeProducts(state.products),
          newProduct,
        ],
        loading: false,
      }));

      toast.success("Product created successfully");

      return true;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to create product"
      );

      set({
        loading: false,
        error: message,
      });

      toast.error(message);

      return false;
    }
  },

  // FETCH ALL PRODUCTS
 fetchAllProducts: async () => {
  set({
    loading: true,
    error: null,
  });

  try {
    const response = await axios.get("/product");

    console.log("STATUS:", response.status);
    console.log("FULL API RESPONSE:", response.data);
    console.log("RESPONSE TYPE:", typeof response.data);
    console.log("RESPONSE PRODUCTS:", response.data?.products);

    const productsData = normalizeProducts(response.data);

    console.log("NORMALIZED PRODUCTS:", productsData);
    console.log("NORMALIZED LENGTH:", productsData.length);

    set({
      products: productsData,
      loading: false,
    });

    return productsData;
  } catch (error) {
    console.error(
      "FETCH PRODUCTS ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );

    const message =
      error.response?.data?.message ||
      "Failed to fetch products";

    set({
      products: [],
      loading: false,
      error: message,
    });

    toast.error(message);

    return [];
  }
},

  // FETCH PRODUCTS BY CATEGORY
  fetchProductsByCategory: async (category) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(
        `/product/category/${encodeURIComponent(category)}`
      );

      const productsData = normalizeProducts(response.data);

      set({
        products: productsData,
        loading: false,
      });

      return productsData;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to fetch products by category"
      );

      set({
        products: [],
        error: message,
        loading: false,
      });

      toast.error(message);

      return [];
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (productId) => {
    set({
      loading: true,
      error: null,
    });

    try {
      await axios.delete(`/product/${productId}`);

      set((state) => ({
        products: normalizeProducts(state.products).filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));

      toast.success("Product deleted successfully");

      return true;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to delete product"
      );

      set({
        loading: false,
        error: message,
      });

      toast.error(message);

      return false;
    }
  },

  // TOGGLE FEATURED PRODUCT
  toggleFeaturedProduct: async (productId) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.patch(
        `/product/${productId}`
      );

      const updatedProduct =
        response.data?.product || response.data;

      const updatedFeaturedStatus =
        updatedProduct?.isFeatured ??
        response.data?.isFeatured;

      set((state) => ({
        products: normalizeProducts(state.products).map(
          (product) =>
            product._id === productId
              ? {
                  ...product,
                  isFeatured: updatedFeaturedStatus,
                }
              : product
        ),
        loading: false,
      }));

      toast.success("Featured status updated");

      return true;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to update featured status"
      );

      set({
        loading: false,
        error: message,
      });

      toast.error(message);

      return false;
    }
  },

  // FETCH FEATURED PRODUCTS
  fetchFeaturedProducts: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(
        "/product/featured"
      );

      const productsData = normalizeProducts(response.data);

      set({
        products: productsData,
        loading: false,
      });

      return productsData;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to fetch featured products"
      );

      set({
        products: [],
        error: message,
        loading: false,
      });

      toast.error(message);

      return [];
    }
  },
}));