import { coupon } from "../models/coupon.model.js"

export const getCoupon = async(req,res)=>{
    try {
        const Coupon = await coupon.findOne({userId:req.user._id,isActive:true})
        res.json(Coupon || null);
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}