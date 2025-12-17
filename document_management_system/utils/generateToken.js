import jwt from "jsonwebtoken"
const generate_token = (user) => {
    //Header.Payload.Signature
    //payload, secret, privatekey
    return jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }


    )
}
export default generate_token