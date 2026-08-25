import jwt from "jsonwebtoken"

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