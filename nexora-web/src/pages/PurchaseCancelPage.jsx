
import { XCircle, ArrowLeft, ShoppingBag, RefreshCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen .bg-gradient-to-br from-gray-950 via-gray-900 to-red-950/30 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute .top-[-120px] .left-[-120px] w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute .bottom-[-120px] .right-[-120px] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="rounded-3xl border border-white/10 .bg-white/[0.06] backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden">

          {/* Top Accent */}
          <div className="h-1.5 w-full .bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

          <div className="px-6 py-10 sm:px-10 sm:py-12">

            {/* Animated Cancel Icon */}
            <div className="flex justify-center mb-7">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150,
                }}
                className="relative flex items-center justify-center"
              >
                <div className="absolute w-28 h-28 rounded-full bg-red-500/10 animate-pulse" />

                <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <XCircle
                    size={62}
                    strokeWidth={1.5}
                    className="text-red-400"
                  />
                </div>
              </motion.div>
            </div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-red-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                Checkout Cancelled
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Your Purchase Was Cancelled
              </h1>

              <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                No worries! Your checkout was cancelled and no payment
                was completed. Your cart is still waiting for you.
              </p>
            </motion.div>

            {/* Information Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex items-start gap-3">
                <ShoppingBag
                  size={22}
                  className="text-orange-400 mt-0.5 shrink-0"
                />

                <div>
                  <h2 className="text-white font-semibold mb-1">
                    Your items are still available
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    You can return to your cart and complete your purchase
                    whenever you are ready.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="mt-7 space-y-3"
            >
              <Link
                to="/cart"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold py-3.5 px-5 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5"
              >
                <RefreshCcw size={18} />
                Return to Cart
              </Link>

              <Link
                to="/"
                className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-200 font-semibold py-3.5 px-5 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </motion.div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Headphones size={16} />
                <span>
                  Need help? Contact our support team.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Branding */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Nexora. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;