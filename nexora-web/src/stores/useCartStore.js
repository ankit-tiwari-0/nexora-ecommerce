import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  // Get available coupon
  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupon");

      set({
        coupon: response.data,
      });

      get().calculateTotals();
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  // Apply coupon
  applyCoupon: async (code) => {
    try {
     const response = await axios.post("/coupon/validate", {
  code,
});

      set({
        coupon: response.data,
        isCouponApplied: true,
      });

      get().calculateTotals();

      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to apply coupon"
      );
    }
  },

  // Remove coupon
  removeCoupon: () => {
    set({
      coupon: null,
      isCouponApplied: false,
    });

    get().calculateTotals();

    toast.success("Coupon removed");
  },

  // Get cart items from backend
  getCartItems: async () => {
    try {
      const response = await axios.get("/cart");

      set({
        cart: response.data,
      });

      get().calculateTotals();
    } catch (error) {
      set({
        cart: [],
        subtotal: 0,
        total: 0,
      });

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch cart"
      );
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      await axios.delete("/cart");

      set({
        cart: [],
        coupon: null,
        total: 0,
        subtotal: 0,
        isCouponApplied: false,
      });

      toast.success("Cart cleared");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to clear cart"
      );
    }
  },

  // Add product to cart
  addToCart: async (product) => {
    try {
      await axios.post("/cart", {
        productId: product._id,
      });

      toast.success("Product added to cart");

      set((state) => {
        const existingItem = state.cart.find(
          (item) => item._id === product._id
        );

        const updatedCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            )
          : [
              ...state.cart,
              {
                ...product,
                quantity: 1,
              },
            ];

        return {
          cart: updatedCart,
        };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  },

  // Remove product from cart
  removeFromCart: async (productId) => {
    try {
      await axios.delete("/cart", {
        data: {
          productId,
        },
      });

      set((state) => ({
        cart: state.cart.filter(
          (item) => item._id !== productId
        ),
      }));

      get().calculateTotals();

      toast.success("Product removed from cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product"
      );
    }
  },

  // Update product quantity
  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await get().removeFromCart(productId);
        return;
      }

      await axios.put(`/cart/${productId}`, {
        quantity,
      });

      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity,
              }
            : item
        ),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    }
  },

  // Calculate subtotal and total
  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

    let total = subtotal;

    if (coupon) {
      const discount =
        subtotal *
        (Number(coupon.discountPercentage || 0) / 100);

      total = subtotal - discount;
    }

    set({
      subtotal,
      total,
    });
  },
}));