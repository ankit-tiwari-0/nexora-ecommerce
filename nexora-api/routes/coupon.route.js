import {
  getCoupon,
  validation,
} from "../controllers/coupon.controller.js";

import { protectRoute } from "../middleware.js/auth.middleware.js";
import { Router } from "express";

const coupon_router = Router();

// Get the user's active coupon
coupon_router.get("/", protectRoute, getCoupon);

// Validate entered coupon code
coupon_router.post("/validate", protectRoute, validation);

export default coupon_router;