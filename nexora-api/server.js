
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

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

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middlewares
app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", Authroute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", coupon_router);
app.use("/api/payments", PAYMENT);
app.use("/api/analytics", analytic_route);

// Start server
const startServer = async () => {
  try {
    await ConnectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();