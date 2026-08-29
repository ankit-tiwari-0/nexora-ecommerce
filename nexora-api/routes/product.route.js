import { Router } from "express";
import { getAllproduct } from "../controllers/product.controller.js";

const productRoute = Router()

productRoute.get("/", getAllproduct)


export default productRoute