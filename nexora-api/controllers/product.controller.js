import PRODUCT from "../models/product.model.js"
import { redis } from "../lib/redis.js";
import imageKit from "../lib/imagekit.js";

export const getAllproduct = async (req, res) => {
  try {
    const products = await PRODUCT.find({});

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error.message);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const getFeaturedProduct = async (req, res) => {
  try {
    const CACHE_KEY = "featured_products";

    // Check Redis cache
    const cachedProducts = await redis.get(CACHE_KEY);

    if (cachedProducts) {
      return res.status(200).json(JSON.parse(cachedProducts));
    }

    // Fetch from MongoDB
    const featuredProducts = await PRODUCT.find({
      isFeatured: true,
    }).lean();

    // Save latest products in Redis
    await redis.set(
      CACHE_KEY,
      JSON.stringify(featuredProducts)
    );

    return res.status(200).json(featuredProducts);
  } catch (error) {
    console.error(
      "Get featured products error:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to fetch featured products",
    });
  }
};

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

export const getcategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await PRODUCT.find({
      category: {
        $regex: `^${category}$`,
        $options: "i",
      },
    });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.log("Get category products error:", error.message);

    return res.status(500).json({
      message: error.message,
    });
  }
};
export const toggelFeatureProduct = async(req,res)=>{

    try {
        const product = await PRODUCT.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updateProduct = await product.save();
            await updateFeaturedProduct();
            res.json(updateProduct)
        }else {
            res.status(404).json({ message: "Product not found"})
        }
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}

async function updateFeaturedProduct() {
    try {
        const featuredProducts = await PRODUCT.find({ isFeatured: true}).lean();
        await redis.set("featured_product", JSON.stringify(featuredProducts))
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}