import PRODUCT from "../models/product.model.js"
import { redis } from "../lib/redis.js";
import imageKit from "../lib/imagekit.js";

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
     
    try {
        const {name, description, price, image, category} = req.body;
        let imageresponse = null;

        if (image) {
            imageresponse =  await imageKit.files.upload({
                file: image,
                fileName: "product.jpg",
                folder: "/products"
            })
        }

        const product = await PRODUCT.create({
            name,
            description,
            price,
            category,
            image:  imageresponse?.url || "",
        })
         return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.log(error);
        
            res.status(500).json({message: error.message})
    }
}