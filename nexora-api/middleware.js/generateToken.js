import jwt from "jsonwebtoken"
import { redis } from "../lib/redis.js "

const generateToken = (USERiD)=>{
const accessToken = jwt.sign({USERiD}, process.env.ACCESSTOKEN,{
    expiresIn: "15m"
})

const refreshToken = jwt.sign({USERiD}, process.env.REFRESHTOKEN, {
    expiresIn: "7d"
})
return {accessToken, refreshToken}
}

export default generateToken

export const storeRefreshToken = async(USERiD,refreshToken)=>{
    await redis.set(`refresh_token:${USERiD}`, refreshToken, "EX",7*24*60*60)
}

export const setCookies = (res, accessToken, refreshToken)=> {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge:  15 * 60 * 1000
    })
    res.cookie("refToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}
