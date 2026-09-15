import { Router } from "express";
import { getProfile, login, logout, refreshtoken, singup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware.js/auth.middleware.js";

const route = Router()

route.post("/signup", singup)

route.post("/login", login)

route.get("/logout", logout)

route.post("/refresh", refreshtoken)

route.get("/profile", protectRoute, getProfile)


export default route;