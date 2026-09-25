import PRODUCT from "../models/product.model.js";

// Add product to cart
export const addcart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const product = await PRODUCT.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

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

    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.error("Add cart error:", error.message);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get cart products
export const getcartproduct = async (req, res) => {
  try {
    const user = await req.user.populate({
      path: "cartItems.product",
      model: "Product",
    });

    const cartItems = user.cartItems.map((item) => ({
      ...item.product.toObject(),
      quantity: item.quantity,
    }));

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Get cart error:", error.message);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Remove one product or clear the entire cart
export const removeAllFromcart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();

    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.error("Remove cart error:", error.message);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update product quantity
export const updatequantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be a non-negative integer",
      });
    }

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();

    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.error("Update quantity error:", error.message);

    return res.status(500).json({
      message: error.message,
    });
  }
};