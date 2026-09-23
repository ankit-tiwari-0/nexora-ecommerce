import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserstore";
// import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();

  // const { addToCart, loading } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", {
        id: "login",
      });
      return;
    }

    // addToCart(product);

    toast.success("Cart functionality coming soon!");
  };

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      {/* Product Image */}
      <div className="relative mx-3 mt-3 flex h-50 overflow-hidden rounded-xl bg-gray-950">
        <img
          className="h-full w-full object-cover"
          src={product.image}
          alt={product.name}
          onError={(e) => {
            console.log("Image failed:", product.image);

            e.currentTarget.src =
              "https://placehold.co/600x600/111827/10b981?text=Image+Not+Found";
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-black/20" />
      </div>

      {/* Product Details */}
      <div className="mt-4 px-5 pb-5">
        {/* Product Name */}
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>

        {/* Product Description */}
        <p className="mt-2 min-h-12 text-sm leading-relaxed text-gray-400">
          {product.description || "No description available"}
        </p>

        {/* Product Price */}
        <div className="mt-4 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ${Number(product.price || 0).toFixed(2)}
            </span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;