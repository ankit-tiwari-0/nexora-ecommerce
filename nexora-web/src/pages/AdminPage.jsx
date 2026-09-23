
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  PlusCircle,
  ShoppingBasket,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// Uncomment these imports when you create the components
import CreateProductForm from "../components.jsx/CreateProductForm";
import ProductsList from "../components.jsx/ProductsList";
import AnalyticsTab from "../components.jsx/AnalyticsTab";
const tabs = [
  {
    id: "create",
    label: "Create Product",
    shortLabel: "Create",
    icon: PlusCircle,
    description: "Add new products to your store",
  },
  {
    id: "products",
    label: "Products",
    shortLabel: "Products",
    icon: ShoppingBasket,
    description: "Manage your store inventory",
  },
  {
    id: "analytics",
    label: "Analytics",
    shortLabel: "Analytics",
    icon: BarChart3,
    description: "Track your store performance",
  },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        {/* Header */}
        <motion.div
          className="mb-8 text-center sm:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Small Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Nexora Admin Panel
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl lg:text-5xl">
            Admin Dashboard
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Manage your products, monitor your store, and grow your business.
          </p>
        </motion.div>

        {/* Dashboard Tabs */}
        <motion.div
          className="mx-auto mb-8 max-w-4xl rounded-2xl border border-white/10 bg-gray-900/60 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`group relative flex min-h-16 items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 sm:flex-col sm:justify-center sm:text-center ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6 ${
                      isActive ? "text-white" : "text-emerald-400"
                    }`}
                  />

                  <div className="min-w-0 flex-1 sm:flex-none">
                    <p className="text-sm font-semibold sm:text-base">
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </p>

                    <p
                      className={`mt-0.5 hidden text-xs sm:block ${
                        isActive ? "text-emerald-100" : "text-gray-500"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>

                  {isActive && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 sm:absolute sm:right-3 sm:top-3" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Tab Header */}
        <motion.div
          className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">
              Dashboard Section
            </p>

            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              {activeTabData?.label}
            </h2>
          </div>

          <div className="w-fit rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1 text-xs text-gray-400">
            {activeTabData?.description}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-gray-900/60 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6 lg:p-8"
          >
            {/* Create Product */}
            {activeTab === "create" && (
              <div className="flex min-h-48 flex-col items-center justify-center text-center sm:min-h-64">
                <div className="mb-4 rounded-2xl bg-emerald-500/10 p-4">
                  <PlusCircle className="h-8 w-8 text-emerald-400" />
                </div>

                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Create Product Form
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                  Your product creation form will be added here.
                </p>

                
                <CreateProductForm />
               
              </div>
            )}

            {/* Products */}
            {activeTab === "products" && (
              <div className="flex min-h-48 flex-col items-center justify-center text-center sm:min-h-64">
                <div className="mb-4 rounded-2xl bg-emerald-500/10 p-4">
                  <ShoppingBasket className="h-8 w-8 text-emerald-400" />
                </div>

                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Products List
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                  Your product management section will be added here.
                </p>

                
                <ProductsList />
               
              </div>
            )}

            {/* Analytics */}
            {activeTab === "analytics" && (
              <div className="flex min-h-48 flex-col items-center justify-center text-center sm:min-h-64">
                <div className="mb-4 rounded-2xl bg-emerald-500/10 p-4">
                  <BarChart3 className="h-8 w-8 text-emerald-400" />
                </div>

                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Analytics Dashboard
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                  Your store analytics and performance charts will be added here.
                </p>

                
                <AnalyticsTab />
               
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Nexora Admin • Manage your store efficiently
        </p>
      </div>
    </div>
  );
};

export default AdminPage;