import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlenght:[6]
    },
    cardItem:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    role:{
        type:String,
        enum: ["customer", "admin"],
        default: "customer"
    },
},{
    timestamps: true
})

 export const user = mongoose.model("user", userSchema)