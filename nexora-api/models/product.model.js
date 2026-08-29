import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        min:0,
        required: true
    },
    image:{
        type: String,
        required: [true, 'IMAGE IS REQ']
    },
     category:{
        type: String,
        required: true
     },
     isFeatured:{
        type: Boolean,
        default: false
     }

},{timestamps: true})

const PRODUCT = mongoose.model("Product", ProductSchema)

export default PRODUCT; 