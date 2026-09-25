import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  PackageCheck,
} from "lucide-react";

// CartItem component will be added later
// import CartItem from "../components/CartItem";

// Future components
// import PeopleAlsoBought from "../components/PeopleAlsoBought";
// import OrderSummary from "../components/OrderSummary";
// import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const {
    cart,
    getCartItems,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0;

  const total = subtotal + shipping;

  const handleIncreaseQuantity = async (item) => {
    await updateQuantity(item._id, Number(item.quantity || 1) + 1);
  };

  const handleDecreaseQuantity = async (item) => {
    const quantity = Number(item.quantity || 1);

    if (quantity <= 1) {
      await removeFromCart(item._id);
      return;
    }

    await updateQuantity(item._id, quantity - 1);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
              <ShoppingBag size={18} />
              <span>Your Shopping Bag</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Review your selected products before checkout.
            </p>
          </div>

          {cart.length > 0 && (
            <div className="flex w-fit items-center gap-2 rounded-full border border-gray-700 bg-gray-800/70 px-4 py-2 text-sm text-gray-300">
              <ShoppingCart size={16} className="text-emerald-400" />

              <span>
                {cart.length}{" "}
                {cart.length === 1 ? "Product" : "Products"}
              </span>
            </div>
          )}
        </motion.div>

        {/* Main Cart Layout */}
        {cart.length === 0 ? (
          <EmptyCartUI />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Cart Products */}
            <motion.div
              className="space-y-4 lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* Cart Section Header */}
              <div className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Your Products
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Manage your selected items
                  </p>
                </div>

                <PackageCheck
                  size={24}
                  className="text-emerald-400"
                />
              </div>

              {/* Product Cards */}
              {cart.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/60 shadow-lg shadow-black/10 transition duration-300 hover:border-emerald-500/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    {/* Product Image */}
                    <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl bg-gray-950 sm:h-28 sm:w-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/300x300/111827/10b981?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        Product price
                      </p>

                      <p className="mt-1 text-lg font-bold text-emerald-400">
                        ${Number(item.price || 0).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Item total: $
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-lg border border-gray-600 bg-gray-900/70">
                        <button
                          type="button"
                          onClick={() => handleDecreaseQuantity(item)}
                          className="flex h-9 w-9 items-center justify-center text-gray-300 transition hover:bg-gray-700 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="flex h-9 min-w-8 items-center justify-center border-x border-gray-600 px-2 text-sm font-semibold text-white">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncreaseQuantity(item)}
                          className="flex h-9 w-9 items-center justify-center text-gray-300 transition hover:bg-gray-700 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item._id)}
                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Continue Shopping */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-300 transition duration-300 hover:border-emerald-500 hover:text-emerald-400"
              >
                <ArrowRight size={17} className="rotate-180" />
                Continue Shopping
              </Link>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="h-fit rounded-2xl border border-gray-700 bg-gray-800/60 p-5 shadow-xl lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Review your order details
              </p>

              <div className="my-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>

                  <span className="font-medium text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>

                  <span
                    className={
                      shipping === 0
                        ? "font-medium text-emerald-400"
                        : "font-medium text-white"
                    }
                  >
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-emerald-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Message */}
              {subtotal < 100 && (
                <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs leading-5 text-emerald-300">
                  Add ${(100 - subtotal).toFixed(2)} more to get free
                  shipping.
                </div>
              )}

              {subtotal >= 100 && (
                <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  You have unlocked free shipping.
                </div>
              )}

              {/* Checkout Button */}
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-500/50 px-5 py-3 text-sm font-semibold text-white"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Checkout functionality coming soon
              </p>

              {/* Secure Checkout */}
              <div className="mt-6 border-t border-gray-700 pt-5">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <PackageCheck size={15} className="text-emerald-400" />
                  Secure and reliable shopping
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

// Empty Cart Component
const EmptyCartUI = () => {
  return (
    <motion.div
      className="flex .min-h-[460px] flex-col items-center justify-center rounded-2xl border border-gray-700 bg-gray-800/40 px-6 py-16 text-center shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Empty Cart Icon */}
      <motion.div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ShoppingCart className="h-12 w-12 text-emerald-400" />
      </motion.div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white sm:text-3xl">
        Your Cart Is Empty
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
        You haven't added anything to your cart yet. Explore our products
        and find something you love.
      </p>

      {/* Shopping Button */}
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/40"
      >
        Start Shopping
        <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
};