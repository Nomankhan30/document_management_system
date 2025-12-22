import User from "../models/user.js"
import generate_token from "../utils/generateToken.js"
import { getCookieAccessTokenOptions, getCookieRefreshTokenOptions } from "../utils/cookieOption.js"
import bcrypt from "bcryptjs"
const generateART = async function (req, res) {
    let incomingToken;
    const id = req.user.userId
    console.log("req.user==", req.user)
    const user = await User.findById(id).select("+refreshToken")
    if (!user) return res.status(401).json("User Not Found!")
    if (!id) {
        return res.status(401).json("Incorrect Token")
    }
    if (req.headers.authorization) {
        parts = req.headers.authorization.split("")
        if (parts[0] === "Bearer") {
            incomingToken = part[1]
        }

    }
    else {
        incomingToken = req.cookies.refreshToken
    }
    // /const currentRefreshToken = await User.findById(req.user.userId).select("+refreshToken -_id")
    const currentRefreshToken = user.refreshToken
    console.log("INCOMING TOKEN", incomingToken)
    console.log("Refresh TOKEN", currentRefreshToken)
    //token must be current as well as valid
    if (currentRefreshToken !== null && incomingToken !== currentRefreshToken) {
        user.refreshToken = null //login again
        user.save()
        return res.status(401).json("Old Token. Must login Again")
    }
    const { accessToken, refreshToken } = await generate_token(user)
    user.refreshToken = refreshToken
    user.save()
    console.log("user after refresh token updated", user)
    return res.cookie("accessToken", accessToken, getCookieAccessTokenOptions()).cookie("refreshToken", refreshToken, getCookieRefreshTokenOptions()).status(201).json({
        message: "Access Token is Regenerated Successfully",
        accessToken, refreshToken
    })
}
export default generateART