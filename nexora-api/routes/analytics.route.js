
import { Router } from "express";

import {
  adminRoute,
  protectRoute,
} from "../middleware.js/auth.middleware.js";

import {
  getAnalyticData,
  getDailySalesData,
} from "../controllers/analutics.controller.js";

const analytic_route = Router();

analytic_route.get(
  "/",
  protectRoute,
  adminRoute,
  async (req, res) => {
    try {
      const analyticsData = await getAnalyticData();

      const endDate = new Date();

      const startDate = new Date(
        endDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );

      const dailySalesData = await getDailySalesData(
        startDate,
        endDate
      );

      res.status(200).json({
        analyticsData,
        dailySalesData,
      });
    } catch (error) {
      console.error(
        "Error in analytics:",
        error.message
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default analytic_route;