import PRODUCT from "../models/product.model.js"

export const getAllproduct = async(req, res)=>{
    try {
        const products = await PRODUCT.find({}); 
        res.json()
    } catch (error) {
        
    }
}