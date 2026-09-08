import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";
import { getAnalyticData } from "../controllers/analutics.controller.js";

const analytic_route = Router()

get.analytic_route("/",protectRoute,adminRoute, async(req, res) =>{
    try {
        const analyticData = await getAnalyticData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 1000);

        const dailySaleDate = await getDailySaleDate(startDate, endDate);

        res.json({
            analyticData,
            dailySaleDate,
        });
    } catch (error) {
        console.log("error in analytic", error.message);
            res.status(500).json({message: error.message})
        
    }
})
 


export default analytic_route