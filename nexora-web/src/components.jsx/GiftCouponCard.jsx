
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Gift,
  LoaderCircle,
  Tag,
  TicketPercent,
  X,
} from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const {
    coupon,
    isCouponApplied,
    applyCoupon,
    getMyCoupon,
    removeCoupon,
  } = useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) {
      setUserInputCode(coupon.code);
    }
  }, [coupon]);

  const handleApplyCoupon = async () => {
    const code = userInputCode.trim();

    if (!code || isApplying) return;

    try {
      setIsApplying(true);
      await applyCoupon(code);
    } catch (error) {
      console.error("Apply coupon error:", error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = async () => {
    if (isRemoving) return;

    try {
      setIsRemoving(true);
      await removeCoupon();
      setUserInputCode("");
    } catch (error) {
      console.error("Remove coupon error:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleApplyCoupon();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 .bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/30 p-5 shadow-2xl shadow-black/10 sm:p-7"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Gift size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Gift Card & Coupon
            </h2>

            <p className="mt-0.5 text-xs text-gray-400">
              Unlock extra savings on your order
            </p>
          </div>
        </div>

        {/* Coupon input */}
        <div className="space-y-2">
          <label
            htmlFor="voucher"
            className="flex items-center gap-2 text-sm font-medium text-gray-300"
          >
            <TicketPercent size={16} className="text-emerald-400" />
            Have a promo code?
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Tag
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                id="voucher"
                value={userInputCode}
                onChange={(event) =>
                  setUserInputCode(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="ENTER CODE"
                autoComplete="off"
                disabled={isApplying || isRemoving}
                className="w-full rounded-xl border border-gray-700 bg-gray-800/80 py-3 pl-10 pr-3 text-sm font-medium uppercase tracking-wider text-white outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <motion.button
              type="button"
              onClick={handleApplyCoupon}
              disabled={!userInputCode.trim() || isApplying || isRemoving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-gray-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              {isApplying ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Applying
                </>
              ) : (
                "Apply"
              )}
            </motion.button>
          </div>
        </div>

        {/* Applied coupon */}
        {isCouponApplied && coupon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Coupon applied
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Code:{" "}
                    <span className="font-semibold uppercase text-emerald-400">
                      {coupon.code}
                    </span>
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                {coupon.discountPercentage}% OFF
              </span>
            </div>

            <motion.button
              type="button"
              onClick={handleRemoveCoupon}
              disabled={isRemoving || isApplying}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRemoving ? (
                <>
                  <LoaderCircle size={15} className="animate-spin" />
                  Removing
                </>
              ) : (
                <>
                  <X size={15} />
                  Remove Coupon
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Available coupon */}
        {coupon && !isCouponApplied && (
          <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-4">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-emerald-400" />

              <p className="text-sm font-semibold text-gray-200">
                Available Coupon
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="rounded-lg border border-dashed border-emerald-500/40 bg-emerald-500/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                {coupon.code}
              </span>

              <span className="text-sm font-semibold text-emerald-400">
                {coupon.discountPercentage}% OFF
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Tag size={13} />
          Save more with exclusive offers
        </div>
      </div>
    </motion.div>
  );
};

export default GiftCouponCard;