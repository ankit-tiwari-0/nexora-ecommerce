import { getCoupon, validation } from "../controllers/coupon.controller.js";
import { protectRoute } from "../middleware.js/auth.middleware.js";
import { Router } from "express";

const coupon_router = Router()

coupon_router.get('/',protectRoute, getCoupon)
coupon_router.get('/valid',protectRoute, validation)

export default coupon_router