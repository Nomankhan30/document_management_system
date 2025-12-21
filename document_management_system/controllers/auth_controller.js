import User from "../models/user.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import { getClearCookieAccessTokenOptions, getCookieAccessTokenOptions, getClearCookieRefreshTokenOptions, getCookieRefreshTokenOptions } from "../utils/cookieOption.js"
const signupController = async (req, res) => {
    try {
        console.log("REQUEST==", req)
        console.log("MY BODY:", JSON.stringify(req.body))
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json("User Already Exists!")
        }
        const hashPassword = await bcrypt.hash(password, 11)
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role: "admin"
        })
        const { accessToken, refreshToken } = await generateToken(newUser)
        newUser.refreshToken = refreshToken
        await newUser.save()
        console.log("name USER", newUser)
        console.log("generated accessToken from gT", accessToken)
        console.log("generated refreshToken from gT", refreshToken)
        //mobile ignores cookie
        res.cookie("accessToken", accessToken, getCookieAccessTokenOptions())
        res.cookie("refreshToken", refreshToken, getCookieRefreshTokenOptions())

        return res.status(201).json({
            message: "SIGN UP COMPLETED SUCCESSFULLY",
            accessToken,
            refreshToken
        })

    }
    catch (e) {
        console.log("error", e)
        return res.status(400).json("Try Again")
    }


}

const loginController = async (req, res) => {
    const { email, password } = req.body
    console.log("***************")
    console.log("req.body bro", req.body)
    console.log("***************")
    console.log("email", email)
    console.log("password", password)
    if (!email || !password) {
        return res.status(400).json({ message: "Invalid Credentials" })

    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json("Invalid Login Credentials")
    }
    const match = await user.comparePassword(password)
    // const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json("WRONG PASSWORD")
    }
    const { accessToken, refreshToken } = await generateToken(user)
    const resu = await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true })
    console.log("user after refresh token updated", resu)
    return res.cookie("accessToken", accessToken, getCookieAccessTokenOptions()).cookie("refreshToken", refreshToken, getCookieRefreshTokenOptions()).status(201).json({
        message: "LOGIN SUCCESSFUL",
        accessToken,
        refreshToken
    })

}

const logoutController = async (req, res) => {
    //const user = await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: null } })
    console.log("logut out controller working")
    const result = await User.updateOne({ _id: req.user.userId }, { refreshToken: null })
    return res.clearCookie("accessToken", getClearCookieAccessTokenOptions()).clearCookie("refreshToken", getClearCookieRefreshTokenOptions()).status(200).json("LOGOUT SUCCESSFUL")

}

export { signupController, loginController, logoutController }
