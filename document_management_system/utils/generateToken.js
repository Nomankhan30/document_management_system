import jwt from "jsonwebtoken"
import userModel from "../models/user.js"
const generate_token = async (user) => {
    console.log("I AM INSIDE GENERATE TOKEN", user)
    //Header.Payload.Signature
    //payload, secret, privatekey
    const email = user.email
    // const role = await userModel.findOne({ email }, { role: 1, _id: 0 })
    // console.log("role is the real culprit", role)
    console.log("before token is returned")
    const accessToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
    const refreshToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
    return { accessToken, refreshToken }
}
export default generate_token