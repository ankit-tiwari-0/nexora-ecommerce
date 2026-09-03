import { getCoupon } from "../controllers/coupon.controller.js";
import { protectRoute } from "../middleware.js/auth.middleware.js";
import { coupon } from "../models/coupon.model.js";
import { Router } from "express";

const coupon_router = Router()

coupon_router.get('/',protectRoute, getCoupon)

export default coupon_router