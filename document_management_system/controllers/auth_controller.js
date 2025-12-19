import User from "../models/user.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import { getClearCookieOptions, getCookieOptions } from "../utils/cookieOption.js"
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
        await newUser.save()
        const token = await generateToken(newUser)
        console.log("name USER", newUser)
        console.log("generated token from gT", token)
        res.cookie("token", token, getCookieOptions()) //mobile ignores it
        return res.status(201).json({
            message: "SIGN UP COMPLETED SUCCESSFULLY"
        })

    }
    catch (e) {
        console.log("error", e)
        return res.status(400).json("Try Again")
    }


}

const loginController = async (req, res) => {
    const { email, password } = req.body
    console.log("email", email)
    console.log("password", password)
    if (!email || !password) {
        return res.status(400).json({ message: "Invalid Credentials" })

    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json("Invalid Login Credentials")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json("WRONG PASSWORD")
    }
    const token = await generateToken(user)
    return res.cookie("token", token).status(201).json("LOGIN SUCCESSFUL")

}

const logoutController = (req, res) => {
    //const user = await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: null } })
    console.log("logut out controller working")
    return res.clearCookie("token", getClearCookieOptions()).status(200).json("LOGOUT SUCCESSFUL")

}

export { signupController, loginController, logoutController }
