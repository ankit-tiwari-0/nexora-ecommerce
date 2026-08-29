import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized - No access token provided"
            });
        }

        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESSTOKEN
            );

            const currentUser = await user
                .findById(decoded.USERiD)
                .select("-password");

            if (!currentUser) {
                return res.status(401).json({
                    message: "User not found"
                });
            }

            req.user = currentUser;

            next();

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Access token expired"
                });
            }

            throw error;
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};