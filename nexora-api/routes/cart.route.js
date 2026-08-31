import { Router } from "express";
import { addcart } from "../controllers/cart.container.js";

const cartRoute = Router()

cartRoute.post("/add", addcart)

export default cartRoute