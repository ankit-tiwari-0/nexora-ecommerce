
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 .bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950/20 p-4 shadow-xl shadow-black/10 transition-all duration-300 hover:border-emerald-500/20 sm:p-5"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Product image */}
        <div className="relative shrink-0 self-center sm:self-start">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gray-800 sm:h-36 sm:w-36">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <ShoppingBag
                size={32}
                className="text-gray-600"
              />
            )}
          </div>

          {/* Quantity badge */}
          <span className="absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-gray-900 bg-emerald-500 px-2 text-xs font-bold text-gray-950">
            {item.quantity}
          </span>
        </div>

        {/* Product details */}
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h3 className="line-clamp-2 text-base font-bold text-white transition-colors group-hover:text-emerald-400 sm:text-lg">
              {item.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-400">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-emerald-400">
              ${Number(item.price).toFixed(2)}
            </span>

            <span className="text-xs text-gray-500">
              / item
            </span>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeFromCart(item._id)}
            className="inline-flex items-center gap-2 rounded-lg py-1 text-xs font-medium text-red-400 transition-colors hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={15} />
            Remove
          </button>
        </div>

        {/* Quantity and total */}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
          {/* Quantity selector */}
          <div className="flex items-center rounded-xl border border-gray-700 bg-gray-800/80 p-1">
            <button
              type="button"
              disabled={item.quantity <= 1}
              onClick={() =>
                updateQuantity(item._id, item.quantity - 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>

            <span
              className="min-w-8 text-center text-sm font-semibold text-white"
              aria-label={`Quantity ${item.quantity}`}
            >
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(item._id, item.quantity + 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Total price */}
          <div className="text-right">
            <p className="text-xs text-gray-500">
              Item total
            </p>

            <p className="mt-1 text-xl font-extrabold tracking-tight text-white">
              ${itemTotal}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;