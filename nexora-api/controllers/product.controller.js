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

export const deleteProduct = async (req, res) => {
    try {
        const product = await PRODUCT.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Delete image from ImageKit
        if (product.image) {
            const fileName = product.image.split("/").pop();

            const files = await imageKit.assets.list({
                searchQuery: `name="${fileName}"`
            });

            if (files.length > 0) {
                await imageKit.files.delete(files[0].fileId);
            }
        }

        // Delete product from MongoDB
        await PRODUCT.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Product and image deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const getrecommendedProduct = async(req,res)=>{
    try {
        const product = await PRODUCT.aggregate([
           {
             $sample: {size:3}
           },
           {
            $project:{
                _id:1,
                name:1,
                description:1,
                image:1,
                price:1
            }
           }
        ])

        res.json(product)
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}
