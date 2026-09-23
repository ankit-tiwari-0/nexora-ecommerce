
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
  Activity,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const initialAnalyticsData = {
  users: 0,
  products: 0,
  totalSales: 0,
  totalRevenue: 0,
};

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState(
    initialAnalyticsData
  );

  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.get("/analytics");

      setAnalyticsData(
        response.data.analyticsData || initialAnalyticsData
      );

      setDailySalesData(response.data.dailySalesData || []);
    } catch (error) {
      console.error("Error fetching analytics data:", error);

      setError("Unable to load analytics data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (error) {
    return (
      <motion.div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <Activity className="mx-auto mb-4 h-10 w-10 text-red-400" />

          <h2 className="text-lg font-semibold text-red-300">
            Analytics Unavailable
          </h2>

          <p className="mt-2 text-sm text-gray-400">{error}</p>

          <button
            onClick={fetchAnalyticsData}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <motion.div
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 p-2 text-emerald-400">
              <Activity className="h-5 w-5" />
            </span>

            <span className="text-sm font-medium text-emerald-400">
              Store Overview
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Analytics Dashboard
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Monitor your store performance and sales activity.
          </p>
        </div>

        <button
          onClick={fetchAnalyticsData}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800/80 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-emerald-500/50 hover:bg-gray-700 hover:text-emerald-400"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          description="Registered customers"
          color="emerald"
          delay={0}
        />

        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          description="Products in store"
          color="blue"
          delay={0.1}
        />

        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          description="Completed orders"
          color="violet"
          delay={0.2}
        />

        <AnalyticsCard
          title="Total Revenue"
          value={`$${Number(
            analyticsData.totalRevenue || 0
          ).toLocaleString()}`}
          icon={DollarSign}
          description="Total earnings"
          color="amber"
          delay={0.3}
        />
      </div>

      {/* Chart Section */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-gray-700/70 bg-gray-800/50 p-4 shadow-xl backdrop-blur-xl sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {/* Chart Header */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Sales Overview
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Daily sales and revenue performance
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live data
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full sm:h-[380px]">
          {dailySalesData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailySalesData}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#10b981"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#374151"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  yAxisId="left"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#ffffff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                  labelStyle={{
                    color: "#d1d5db",
                    marginBottom: "6px",
                  }}
                  itemStyle={{
                    color: "#ffffff",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "13px",
                  }}
                />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#ffffff",
                  }}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#ffffff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Activity className="mb-3 h-10 w-10 text-gray-600" />

              <p className="font-medium text-gray-400">
                No sales data available
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Sales information will appear here.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

/* -------------------------------- */
/* Analytics Card */
/* -------------------------------- */

const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
  description,
  color,
  delay,
}) => {
  const colorStyles = {
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400",
      glow: "bg-emerald-500/10",
      accent: "from-emerald-500 to-teal-500",
    },

    blue: {
      icon: "bg-blue-500/10 text-blue-400",
      glow: "bg-blue-500/10",
      accent: "from-blue-500 to-cyan-500",
    },

    violet: {
      icon: "bg-violet-500/10 text-violet-400",
      glow: "bg-violet-500/10",
      accent: "from-violet-500 to-purple-500",
    },

    amber: {
      icon: "bg-amber-500/10 text-amber-400",
      glow: "bg-amber-500/10",
      accent: "from-amber-500 to-orange-500",
    },
  };

  const styles = colorStyles[color] || colorStyles.emerald;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gray-700/70 bg-gray-800/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gray-600 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Background Glow */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${styles.glow}`}
      />

      {/* Top Accent */}
      <div
        className={`absolute left-0 top-0 h-1 w-full .bg-gradient-to-r ${styles.accent}`}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>

          <h3 className="mt-3 break-all text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {value}
          </h3>

          <p className="mt-2 text-xs text-gray-500">{description}</p>
        </div>

        <div
          className={`rounded-xl p-3 ${styles.icon} transition duration-300 group-hover:scale-110`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-1 text-xs font-medium text-emerald-400">
        <ArrowUpRight className="h-4 w-4" />
        Store metrics
      </div>
    </motion.div>
  );
};

/* -------------------------------- */
/* Loading Skeleton */
/* -------------------------------- */

const AnalyticsSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-8 px-4 pb-10 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-gray-700" />
        <div className="h-8 w-64 rounded bg-gray-700" />
        <div className="h-4 w-80 max-w-full rounded bg-gray-700" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-2xl border border-gray-700 bg-gray-800/70 p-5"
          >
            <div className="h-4 w-24 rounded bg-gray-700" />
            <div className="mt-5 h-8 w-32 rounded bg-gray-700" />
            <div className="mt-4 h-3 w-40 rounded bg-gray-700" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="h-\[420px\] rounded-2xl border border-gray-700 bg-gray-800/70 p-6">
        <div className="h-5 w-48 rounded bg-gray-700" />
        <div className="mt-2 h-3 w-64 rounded bg-gray-700" />

        <div className="mt-10 h-64 rounded-xl bg-gray-700/50" />
      </div>
    </div>
  );
};