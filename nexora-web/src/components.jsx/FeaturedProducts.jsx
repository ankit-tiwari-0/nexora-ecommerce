
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { addToCart } = useCartStore();

  // Make sure featuredProducts is always an array
  const products = Array.isArray(featuredProducts)
    ? featuredProducts
    : [];

  // Responsive number of products per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile: 1 product
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        // Tablet: 2 products
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        // Small desktop: 3 products
        setItemsPerPage(3);
      } else {
        // Large desktop: 5 products
        setItemsPerPage(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate the maximum slider index
  const maxIndex = Math.max(
    0,
    products.length - itemsPerPage
  );

  // Prevent the slider from exceeding the available products
  useEffect(() => {
    setCurrentIndex((previousIndex) =>
      Math.min(previousIndex, maxIndex)
    );
  }, [maxIndex]);

  // Go to the next group of products
  const nextSlide = () => {
    setCurrentIndex((previousIndex) =>
      Math.min(previousIndex + itemsPerPage, maxIndex)
    );
  };

  // Go to the previous group of products
  const prevSlide = () => {
    setCurrentIndex((previousIndex) =>
      Math.max(previousIndex - itemsPerPage, 0)
    );
  };

  // Navigation button states
  const isStartDisabled = currentIndex === 0;

  const isEndDisabled =
    products.length <= itemsPerPage ||
    currentIndex >= maxIndex;

  // Display range
  const startNumber =
    products.length === 0
      ? 0
      : Math.min(currentIndex + 1, products.length);

  const endNumber = Math.min(
    currentIndex + itemsPerPage,
    products.length
  );

  // Hide section when there are no featured products
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            {/* Small Label */}
            <div className="mb-3 flex items-center gap-2">
              <Sparkles
                size={17}
                className="text-emerald-400"
              />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                Handpicked for you
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Featured
              <span className="text-emerald-400">
                {" "}Products
              </span>
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
              Discover our most popular products, selected
              to make your shopping experience better.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">

            {/* Product Counter */}
            <span className="mr-2 hidden text-xs text-gray-500 sm:block">
              {startNumber}-{endNumber} of {products.length}
            </span>

            {/* Previous Button */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={isStartDisabled}
              aria-label="Previous featured products"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isStartDisabled
                  ? "cursor-not-allowed border-gray-800 bg-gray-900 text-gray-600"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500 hover:text-gray-950"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextSlide}
              disabled={isEndDisabled}
              aria-label="Next featured products"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isEndDisabled
                  ? "cursor-not-allowed border-gray-800 bg-gray-900 text-gray-600"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500 hover:text-gray-950"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerPage)
              }%)`,
            }}
          >
            {products.map((product) => {
              const price = Number(product.price) || 0;

              return (
                <div
                  key={product._id}
                  className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3 xl:w-1/5"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/40 hover:bg-white/[0.07]">

                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-900">

                      {/* Featured Badge */}
                      <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-white/10 bg-gray-950/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                        <Sparkles size={11} />
                        Featured
                      </div>

                      {/* Product Link Icon */}
                      <div className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight size={17} />
                      </div>

                      {/* Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-60 w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Image Gradient */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-950/70 to-transparent" />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-h-[205px] flex-1 flex-col p-5">

                      {/* Product Name */}
                      <h3 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-white transition-colors duration-300 group-hover:text-emerald-400">
                        {product.name}
                      </h3>

                      {/* Product Price */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-black tracking-tight text-emerald-400">
                          ${price.toFixed(2)}
                        </span>

                        <span className="text-xs text-gray-500">
                          USD
                        </span>
                      </div>

                      {/* Add To Cart Button */}
                      <div className="mt-auto pt-5">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-gray-950 transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
                        >
                          <ShoppingCart size={17} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({
            length: Math.ceil(products.length / itemsPerPage),
          }).map((_, index) => {
            const isActive =
              Math.floor(currentIndex / itemsPerPage) === index;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to product group ${index + 1}`}
                onClick={() =>
                  setCurrentIndex(
                    Math.min(index * itemsPerPage, maxIndex)
                  )
                }
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-emerald-400"
                    : "w-2 bg-gray-700 hover:bg-gray-500"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;