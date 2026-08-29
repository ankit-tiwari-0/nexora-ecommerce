import { Router } from "express";
import { login, logout, refreshtoken, singup } from "../controllers/auth.controller.js";

const route = Router()

route.post("/signup", singup)

route.post("/login", login)

route.get("/logout", logout)

route.post("/refresh", refreshtoken)


export default route;