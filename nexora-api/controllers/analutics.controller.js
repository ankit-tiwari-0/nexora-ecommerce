import Order from "../models/order.model";
import PRODUCT from "../models/product.model";
import { user } from "../models/user.model"

export const getAnalyticData = async() => {
    const totalUser = await user.countDocuments();
    const totalProduct = await PRODUCT.countDocuments()

    const saleDate = await Order.aggregate([
        {
            $group: {
                _id:null,
                totalSale: {$sum:1},
                totalRevenue: {$sum:"$totalAmount"}
            }
        }
    ])

    const {totalSale, totalRevenue} = saleDate[0] || {totalSale:0, totalRevenue};

    return {
        users:totalUser,
        products:totalProduct,
        totalSale,
        totalRevenue
    }
}

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
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					sales: { $sum: 1 },
					revenue: { $sum: "$totalAmount" },
				},
			},
			{ $sort: { _id: 1 } },
		]);

		// example of dailySalesData
		// [
		// 	{
		// 		_id: "2024-08-18",
		// 		sales: 12,
		// 		revenue: 1450.75
		// 	},
		// ]

		const dateArray = getDatesInRange(startDate, endDate);
		// console.log(dateArray) // ['2024-08-18', '2024-08-19', ... ]

		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);

			return {
				date,
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
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}
