import jwt from "jsonwebtoken"
const verifyJWT = (req, res, next) => {
    const secret = process.env.JWT_SECRET
    console.log("EXPOSING SECRET", secret)
    const bearerToken = req.headers.authorization
    if (!bearerToken) {
        return res.status(401).json({
            message: "No Authorization Header Provided"
        })
    }
    console.log("bearer token", bearerToken)
    const token = bearerToken.split(" ")[1]
    console.log("MY TOKEN", token)
    if (!token) {
        return res.status(401).json({
            message: "ACCESS DENIED! No Token Provided"
        })
    }
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            console.log("mierr", err)
            return res.status(401).json({ message: "Invalidy Token" })

        }


    })
    console.log("I am middleware before authentication", req.headers)
    next()

}

export { verifyJWT }