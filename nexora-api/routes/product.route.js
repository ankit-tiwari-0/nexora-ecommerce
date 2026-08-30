import { Router } from "express";
import { getAllproduct, getFeaturedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";

const productRoute = Router()

productRoute.get("/",protectRoute,adminRoute, getAllproduct)
productRoute.get("/featured", getFeaturedProduct)


export default productRoute