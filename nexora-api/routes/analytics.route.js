import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";

const analytic_route = Router()

get.analytic_route("/",protectRoute,adminRoute)


export default analytic_route