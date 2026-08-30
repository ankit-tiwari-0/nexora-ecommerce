import { Router } from "express";
import { getAllproduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";

const productRoute = Router()

productRoute.get("/",protectRoute,adminRoute, getAllproduct)


export default productRoute