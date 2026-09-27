import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { ConnectDB } from "./lib/db.js";

import Authroute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import coupon_router from "./routes/coupon.route.js";
import PAYMENT from "./routes/payment.route.js";
import analytic_route from "./routes/analytics.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==============================
// CORS
// ==============================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ==============================
// Middlewares
// ==============================

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(cookieParser());

// ==============================
// API Routes
// ==============================

app.use("/api/auth", Authroute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", coupon_router);
app.use("/api/payments", PAYMENT);
app.use("/api/analytics", analytic_route);

// ==============================
// Serve React Frontend
// ==============================

const frontendPath = path.join(__dirname, "public");

app.use(express.static(frontendPath));

// React Router fallback
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

// ==============================
// Start Server
// ==============================

const startServer = async () => {
  try {
    await ConnectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();