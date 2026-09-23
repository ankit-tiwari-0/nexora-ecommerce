
import Order from "../models/order.model.js";
import PRODUCT from "../models/product.model.js";
import { user } from "../models/user.model.js";

export const getAnalyticData = async () => {
  const totalUser = await user.countDocuments();

  const totalProduct = await PRODUCT.countDocuments();

  const saleData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: 1,
        },
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const {
    totalSales = 0,
    totalRevenue = 0,
  } = saleData[0] || {};

  return {
    users: totalUser,
    products: totalProduct,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          sales: {
            $sum: 1,
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const dateArray = getDatesInRange(
      startDate,
      endDate
    );

    return dateArray.map((date) => {
      const foundData = dailySalesData.find(
        (item) => item._id === date
      );

      return {
        name: date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(
      currentDate.toISOString().split("T")[0]
    );

    currentDate.setDate(
      currentDate.getDate() + 1
    );
  }

  return dates;
}