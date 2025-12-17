import User from "../models/user.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
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
            password: hashPassword
        })
        await newUser.save()
        const token = generateToken(newUser)
        console.log("name USER", newUser)
        return res.status(201).json({
            message: "SIGN UP COMPLETED SUCCESSFULLY",
            token
        })

    }
    catch (e) {
        return res.status(400).json("Try Again")
    }


}

const loginController = (req, res) => {
    const { email, password } = req.body
    console.log("email", email)
    console.log("password", password)
    if (!email || !password) {
        return res.status(400).json({ message: "Invalid Credentials" })

    }
    return res.status(200).json("LOGIN SUCCESSFUL")

}

export { signupController, loginController }
