import { Router } from "express";
import { protectRoute } from "../middleware.js/auth.middleware.js";

const PAYMENT = Router()

PAYMENT.post("/create-checkout-session", protectRoute, createCheckoutSession)

export default PAYMENT