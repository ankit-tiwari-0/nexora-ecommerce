import { Router } from "express";
import { createProduct, deleteProduct, getAllproduct,
getFeaturedProduct, getrecommendedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";

const productRoute = Router()

productRoute.get("/",protectRoute,adminRoute, getAllproduct)
productRoute.get("/featured", getFeaturedProduct)
productRoute.get("/recomment", getrecommendedProduct)
productRoute.post("/", protectRoute, adminRoute, createProduct)
productRoute.delete("/:id", protectRoute,adminRoute, deleteProduct)


export default productRoute