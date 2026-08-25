import mongoose from "mongoose"

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE)

        console.log("mongoose is connected");
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
        
    }
}