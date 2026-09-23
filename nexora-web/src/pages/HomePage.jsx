import React from "react";
import { Link } from "react-router-dom";

import { useProductStore } from "../stores/useProductStore";

// import { useEffect } from "react";
// import CategoryItem from "../components/CategoryItem";
// import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  {
    href: "/category/accessories",
    name: "Accessories",
    imageUrl: "/Accessories.jpg",
  },
  {
    href: "/category/arts-crafts",
    name: "Arts & Crafts",
    imageUrl: "/Arts & Crafts.jpg",
  },
  {
    href: "/category/baby-products",
    name: "Baby Products",
    imageUrl: "/baby_products.jpg",
  },
  {
    href: "/category/beauty",
    name: "Beauty",
    imageUrl: "/Beauty.jpg",
  },
  {
    href: "/category/car-accessories",
    name: "Car Accessories",
    imageUrl: "/car_accessories.jpg",
  },
  {
    href: "/category/designer",
    name: "Designer",
    imageUrl: "/Designer.jpg",
  },
  {
    href: "/category/educational-supplies",
    name: "Educational Supplies",
    imageUrl: "/Educational%20Supplies.jpg",
  },
  {
    href: "/category/electronics",
    name: "Electronics",
    imageUrl: "/Electronics.jpg",
  },
  {
    href: "/category/fashion",
    name: "Fashion",
    imageUrl: "/Fashion.jpg",
  },
  {
    href: "/category/fragrances",
    name: "Fragrances",
    imageUrl: "/Fragrances.jpg",
  },
  {
    href: "/category/groceries",
    name: "Groceries",
    imageUrl: "/Groceries.jpg",
  },
  {
    href: "/category/hair-care",
    name: "Hair Care",
    imageUrl: "/hair_care.jpg",
  },
  {
    href: "/category/home-living",
    name: "Home & Living",
    imageUrl: "/Home & Living.jpg",
  },
  {
    href: "/category/jewelry",
    name: "Jewelry",
    imageUrl: "/Jewelry.jpg",
  },
  {
    href: "/category/makeup",
    name: "Makeup",
    imageUrl: "/makeup.jpg",
  },
  {
    href: "/category/personal-care-men",
    name: "Personal Care Men",
    imageUrl: "/personal_care_men.jpg",
  },
  {
    href: "/category/pet-supplies",
    name: "Pet Supplies",
    imageUrl: "/Pet%20Supplies.jpg",
  },
  {
    href: "/category/snacks",
    name: "Snacks",
    imageUrl: "/Snacks.jpg",
  },
  {
    href: "/category/sport",
    name: "Sport",
    imageUrl: "/Sport.jpg",
  },
  {
    href: "/category/travel",
    name: "Travel",
    imageUrl: "/Travel.jpg",
  },
];

const HomePage = () => {
  const {
    fetchFeaturedProducts,
    products,
    isLoading,
  } = useProductStore();

  // useEffect(() => {
  //   fetchFeaturedProducts();
  // }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-\[500px\] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.20),transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Explore Nexora
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Discover products designed to fit your lifestyle.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              to={category.href}
              key={category.name}
              className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 transition duration-300 hover:-translate-y-2 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              {/* Category Image */}
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Category Name */}
              <div className="px-4 py-4 text-center">
                <h2 className="text-lg font-semibold text-gray-200 transition duration-300 group-hover:text-emerald-400">
                  {category.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Explore now
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products: Add later */}
        {/*
        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
        */}
      </div>
      {/* Compact Responsive Footer */}
<footer className="mt-16 border-t border-gray-700 bg-[#111827] px-3 py-6 text-gray-400 sm:px-6 sm:py-8">
  <div className="mx-auto max-w-6xl">

    {/* Footer Main Content */}
    <div className="flex items-start justify-between gap-4 text-[10px] sm:gap-8 sm:text-xs md:text-sm">

      {/* Brand */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-emerald-400 sm:text-base md:text-lg">
          Nexora
        </h3>

        <p className="mt-1 whitespace-nowrap">
          Shop smart. Live better.
        </p>
      </div>

      {/* Explore */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-2 font-semibold text-white">
          Explore
        </h3>

        <div className="space-y-1">
          <Link to="/" className="block whitespace-nowrap hover:text-emerald-400">
            Categories
          </Link>

          <Link to="/" className="block whitespace-nowrap hover:text-emerald-400">
            New Arrivals
          </Link>

          <Link to="/" className="block whitespace-nowrap hover:text-emerald-400">
            Featured
          </Link>
        </div>
      </div>

      {/* Support */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-2 font-semibold text-white">
          Support
        </h3>

        <div className="space-y-1">
          <Link to="/" className="block whitespace-nowrap hover:text-emerald-400">
            Help Center
          </Link>

          <Link to="/" className="block whitespace-nowrap hover:text-emerald-400">
            Contact Us
          </Link>

          <Link to="/" className="block whitespace-nowrap hover:text-emerald-400">
            Privacy
          </Link>
        </div>
      </div>
    </div>

    {/* Centered Bottom Bar */}
    <div className="mt-6 border-t border-gray-700 pt-4 text-center text-[10px] sm:mt-8 sm:pt-5 sm:text-xs md:text-sm">
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        <span>
          © {new Date().getFullYear()} Nexora
        </span>

        <span className="text-gray-600">|</span>

        <span>
          Made for better shopping.
        </span>
      </div>
    </div>

  </div>
</footer>
    </div>
  );
};

export default HomePage;