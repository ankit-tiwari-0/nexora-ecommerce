import { Router } from "express";
import { getAllproduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middleware.js/auth.middleware.js";

const productRoute = Router()

productRoute.get("/",protectRoute, getAllproduct)


export default productRoute