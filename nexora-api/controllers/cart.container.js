import mongoose from "mongoose";
import PRODUCT from "../models/product.model.js";

// ==========================================
// ADD PRODUCT TO CART
// ==========================================

export const addcart = async (req, res) => {
  try {
    const { productId } = req.body || {};
    const user = req.user;

    // Check authentication
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Validate product ID
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Find product
    const product = await PRODUCT.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Make sure cartItems exists
    if (!user.cartItems) {
      user.cartItems = [];
    }

    // Check whether product already exists in cart
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Add cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};

// ==========================================
// GET CART PRODUCTS
// ==========================================

export const getcartproduct = async (req, res) => {
  try {
    const user = req.user;

    // Check authentication
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Populate product details
    await user.populate({
      path: "cartItems.product",
      model: "Product",
    });

    // Make sure cartItems exists
    const cartItems = (user.cartItems || [])
      .filter((item) => item.product)
      .map((item) => ({
        ...item.product.toObject(),
        quantity: item.quantity,
      }));

    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching cart products",
      error: error.message,
    });
  }
};

// ==========================================
// REMOVE ONE PRODUCT OR CLEAR CART
// ==========================================

export const removeAllFromcart = async (req, res) => {
  try {
    const { productId } = req.body || {};
    const user = req.user;

    // Check authentication
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Make sure cartItems exists
    if (!user.cartItems) {
      user.cartItems = [];
    }

    // If productId is not provided, clear the entire cart
    if (!productId) {
      user.cartItems = [];
    } else {
      // Validate product ID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      // Remove the selected product
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: productId
        ? "Product removed from cart successfully"
        : "Cart cleared successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Remove cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE PRODUCT QUANTITY
// ==========================================

export const updatequantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body || {};
    const user = req.user;

    // Check authentication
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Validate quantity
    if (
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative integer",
      });
    }

    // Make sure cartItems exists
    if (!user.cartItems) {
      user.cartItems = [];
    }

    // Find product in cart
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Remove product when quantity is zero
    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Update quantity error:", error);

    return res.status(500).json({
      success: false,
      message: "Error updating cart quantity",
      error: error.message,
    });
  }
};