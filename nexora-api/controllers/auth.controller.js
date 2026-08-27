import generateToken, { setCookies, storeRefreshToken } from "../middleware.js/generateToken.js"
import { user } from "../models/user.model.js"

export const singup = async (req, res) => {
    const {email, password, name} = req.body

   try {
        const userextish = await user.findOne({email})

    if(userextish){
        res.status(400).json({
            message:"user already exist"
        })
    }

    const newuser = await user.create({name,email,password});
//authentication
    const { accessToken, refreshToken}= generateToken(user._id);
    await storeRefreshToken(user._id,refreshToken)

    setCookies(res, accessToken, refreshToken)

    return res.status(200).json({
        newuser: {
            _id: newuser._id,
            name:newuser.name,
            email: newuser.email
        }, message:"user created successfully"
    }) 
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}

export const login = async (req, res) => {
    res.send("ok")
}

export const logout = async (req, res) => {
    res.send("ok")
}