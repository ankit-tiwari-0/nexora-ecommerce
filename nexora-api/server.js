import express, { json } from "express"
import dotenv from "dotenv"
import Authroute from "./routes/auth.route.js"
import { ConnectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import productRoute from "./routes/product.route.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT|| 5000

app.use(json())
app.use(cookieParser())

app.use("/api/auth", Authroute)
app.use("/api/product", productRoute)









app.listen(PORT, ()=>{
    console.log(`server is running on  ${PORT}`);
    ConnectDB()
})