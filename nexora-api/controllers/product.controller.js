import PRODUCT from "../models/product.model.js"

export const getAllproduct = async(req, res)=>{
    try {
        const products = await PRODUCT.find({}); 
        res.json()
    } catch (error) {
        
    }
}

export const  getFeaturedProduct = async (req, res) => {
    
    try {
        let featuredProducts = await redis.get("feature_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }

       featuredProducts = await PRODUCT.find({isFeatured:true}).lean() 

       if (!featuredProducts) {
        return res.status(400).json({message: "NO featured products found "})
       }

       await redis.set("feature_products",  JSON.stringify(featuredProducts));

       res.json(featuredProducts)
    } catch (error) {
            console.log(error.message);
            res.status(500).json({message:"server error", ero:error.message})

    }
}

export const  createProduct = async(req, res) =>{
    
}