import Coupon from "../models/coupon.model.js";

export const getCoupon = async(req,res)=>{
    try {
        const coupon = await Coupon.findOne({USERiD:req.user._id,isActive:true})
        res.json(Coupon || null);
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}

export const validation = async (req,res) => {
    try {
        const {code}= req.body;
        const Coupon = await Coupon.findOne({code:code,USERiD:req.user._id, isActive:true});

        if (!Coupon) {
            return res.status(404).json({message: "coupon not found"})
        }

        if (Coupon.expirationDate < new Date()) {
            Coupon.isActive = false;
            await Coupon.save();
            return res.status(404).json({message:"Coupon expired"})
        }

        res.json({
            message: "Coupon is valid",
            code: Coupon.code,
            discountPercentage: Coupon.discountPercentage
        })
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}