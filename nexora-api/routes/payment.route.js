import { Router } from "express";
import { protectRoute } from "../middleware.js/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const PAYMENT = Router()

PAYMENT.post("/create-checkout-session", protectRoute, createCheckoutSession)
PAYMENT.post("/create-checkout-session", protectRoute, checkoutSuccess)

export default PAYMENT