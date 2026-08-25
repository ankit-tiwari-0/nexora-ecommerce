import { Router } from "express";
import { login, logout, singup } from "../controllers/auth.controller.js";

const route = Router()

route.post("/singup", singup)

route.post("/login", login)

route.get("/logout", logout)


export default route;