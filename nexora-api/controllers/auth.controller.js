import { redis } from "../lib/redis.js"
import jwt from "jsonwebtoken"
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
    const { accessToken, refreshToken}= generateToken(newuser._id);
    await storeRefreshToken(newuser._id,refreshToken)

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
  try {
    const {email, password} = req.body;
    const newuser = await user.findOne({email})

    if(newuser && (await newuser.comparePassword(password))){
        const {accessToken, refreshToken} = generateToken(newuser._id)

        await storeRefreshToken(newuser._id, refreshToken);
        setCookies(res, accessToken, refreshToken)

        return res.json({
        _id: newuser._id,
        Nme: newuser.name,
        email: newuser.email,
        role: newuser.role,
        message:"login"
    })
    }

    return res.status(401).json({
        message: "Invalid credencial"
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refToken;
        if(refreshToken){
            const decode = jwt.verify(refreshToken, process.env.REFRESHTOKEN);
            await redis.del(`refresh_token:${decode.USERiD}`)
        }

        res.clearCookie("accessToken")
        res.clearCookie("refToken")
        res.json({message: "Logged out successfully"})
    } catch (error) {
        res.status(500).json({message: "sever error", error: error.message})
    }
}

export const refreshtoken = async (req, res) => {
    
    try {
        const refreshToken = req.cookies.refToken;
        if (!refreshToken) {
            return res.status(401).json({message:"No refresh token provided"})
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESHTOKEN);
        const storeRefreshToken = await redis.get(`refresh_token:${decode.USERiD}`)

        if (storeRefreshToken !== refreshToken) {
            return res.status(401).json({message: "Invalid refresh token"})
        }

        const accessToken = jwt.sign({userID: decode.USERiD}, process.env.ACCESSTOKEN, {expiresIn: "15m"})

        res.cookie("accessToken", accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15*60*1000,
        });
        res.json({message: "Successfully"})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
}