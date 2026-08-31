import { Router } from "express";
import { createProduct, deleteProduct, getAllproduct, getFeaturedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";

const productRoute = Router()

productRoute.get("/",protectRoute,adminRoute, getAllproduct)
productRoute.get("/featured", getFeaturedProduct)
productRoute.post("/", protectRoute, adminRoute, createProduct)
productRoute.delete("/:id", protectRoute,adminRoute, deleteProduct)


export default productRoute