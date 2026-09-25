import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

// ==========================================
// CREATE STRIPE CHECKOUT SESSION
// ==========================================

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    // Validate products
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty products array",
      });
    }

    let totalAmount = 0;

    // Create Stripe line items
    const lineItems = products.map((product) => {
      const quantity = product.quantity || 1;

      const amount = Math.round(product.price * 100);

      // Stripe uses cents
      totalAmount += amount * quantity;

      return {
        price_data: {
          currency: "usd",

          product_data: {
            name: product.name,
            images: product.image ? [product.image] : [],
          },

          unit_amount: amount,
        },

        quantity,
      };
    });

    // Find and validate coupon
    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      // Check coupon expiration
      if (coupon && coupon.expirationDate < new Date()) {
        coupon.isActive = false;
        await coupon.save();

        coupon = null;
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: lineItems,

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,

      // Apply coupon in Stripe Checkout
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(
                coupon.discountPercentage
              ),
            },
          ]
        : [],

      // Store important order information
      metadata: {
        userId: req.user._id.toString(),

        couponCode: coupon ? coupon.code : "",

        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity || 1,
            price: product.price,
          }))
        ),
      },
    });

    // Return Stripe Checkout URL
    return res.status(200).json({
      success: true,
      id: session.id,
      url: session.url,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.error("Error processing checkout:", error);

    return res.status(500).json({
      success: false,
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

// ==========================================
// CHECKOUT SUCCESS
// ==========================================

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Stripe session ID is required",
      });
    }

    // Retrieve Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(
      sessionId
    );

    // Check payment status
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment was not completed",
      });
    }

    // Prevent duplicate orders
    const existingOrder = await Order.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already exists",
        orderId: existingOrder._id,
      });
    }

    // Deactivate used coupon
    if (session.metadata?.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        },
        {
          isActive: false,
        }
      );
    }

    // Parse products from Stripe metadata
    const products = JSON.parse(
      session.metadata.products
    );

    // Create new order
    const newOrder = new Order({
      user: session.metadata.userId,

      products: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      })),

      // Stripe amount is in cents
      totalAmount: session.amount_total / 100,

      stripeSessionId: sessionId,
    });

    await newOrder.save();

    // Generate a new coupon after successful payment
    if (session.amount_total >= 5000) {
      await createNewCoupon(session.metadata.userId);
    }

    return res.status(200).json({
      success: true,
      message:
        "Payment successful, order created, and coupon processed",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error(
      "Error processing successful checkout:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE STRIPE COUPON
// ==========================================

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

// ==========================================
// CREATE NEW USER COUPON
// ==========================================

async function createNewCoupon(userId) {
  try {
    // Delete the user's previous coupon
    await Coupon.findOneAndDelete({
      userId,
    });

    // Generate a new coupon code
    const newCoupon = new Coupon({
      code:
        "GIFT" +
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase(),

      discountPercentage: 10,

      expirationDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),

      userId,
    });

    await newCoupon.save();

    return newCoupon;
  } catch (error) {
    console.error("Error creating new coupon:", error);
    throw error;
  }
}