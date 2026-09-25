import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  ShoppingBag,
  Tag,
} from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } =
    useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const savings = Math.max(0, subtotal - total);

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    if (!cart?.length || isProcessing) return;

    try {
      setIsProcessing(true);

      const res = await axios.post(
        "/payments/create-checkout-session",
        {
          products: cart,
          couponCode: coupon ? coupon.code : null,
        }
      );

      const { url } = res.data;

      if (!url) {
        throw new Error("Stripe Checkout URL is missing");
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error(
        "Payment error:",
        error.response?.data || error.message
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/40 p-5 shadow-2xl shadow-black/20 sm:p-7"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <ShoppingBag size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Order Summary
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                Review your purchase
              </p>
            </div>
          </div>

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            {cart?.length || 0} Items
          </span>
        </div>

        {/* Price breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Original price
            </span>

            <span className="text-sm font-medium text-gray-200">
              ${formattedSubtotal}
            </span>
          </div>

          {savings > 0 && (
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <Tag
                  size={15}
                  className="text-emerald-400"
                />

                You save
              </span>

              <span className="text-sm font-semibold text-emerald-400">
                -${formattedSavings}
              </span>
            </motion.div>
          )}

          {coupon && isCouponApplied && (
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />

                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Coupon applied
                  </p>

                  <p className="text-xs text-emerald-400">
                    {coupon.code}
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold text-emerald-400">
                -{coupon.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-dashed border-gray-700" />

        {/* Total */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Total amount
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Inclusive of applicable discounts
            </p>
          </div>

          <p className="text-3xl font-extrabold tracking-tight text-emerald-400">
            ${formattedTotal}
          </p>
        </div>

        {/* Checkout button */}
        <motion.button
          type="button"
          disabled={isProcessing || !cart?.length}
          onClick={handlePayment}
          whileHover={{
            scale: isProcessing ? 1 : 1.02,
          }}
          whileTap={{
            scale: isProcessing ? 1 : 0.98,
          }}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-bold text-gray-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-950/30 border-t-gray-950" />

              Processing...
            </>
          ) : (
            <>
              Proceed to Checkout

              <ArrowRight size={18} />
            </>
          )}
        </motion.button>

        {/* Security message */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <LockKeyhole
            size={14}
            className="text-emerald-500"
          />

          Secure checkout powered by Stripe
        </div>

        {/* Continue shopping */}
        <div className="mt-5 flex justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-emerald-400"
          >
            Continue Shopping

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;