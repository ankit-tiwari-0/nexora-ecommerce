import { Router } from "express";
import { addcart, getcartproduct, removeAllFromcart, updatequantity } from "../controllers/cart.container.js";
import { protectRoute } from "../middleware.js/auth.middleware.js";

const cartRoute = Router()

cartRoute.post("/",protectRoute, addcart)
cartRoute.delete("/",protectRoute, removeAllFromcart)
cartRoute.put("/:id",protectRoute, updatequantity)
cartRoute.get("/",protectRoute, getcartproduct)

export default cartRoute