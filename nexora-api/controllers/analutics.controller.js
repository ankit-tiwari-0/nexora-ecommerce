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