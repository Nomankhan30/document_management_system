import jwt from "jsonwebtoken"
const verifyJWT = (req, res, next) => {
    //JWT authentication
    let token;
    const secret = process.env.JWT_SECRET
    console.log("EXPOSING SECRET", secret)
    console.log("value of req.headers", req.headers)
    //for mobile
    if (req.headers?.authorization) {
        const bearerToken = req.cookies.token || req.headers.authorization
        if (!bearerToken) {
            return res.status(401).json({
                message: "No Authorization Header Provided"
            })
        }
        console.log("bearer token", bearerToken)
        token = bearerToken.split(" ")[1]
        console.log("MY TOKEN", token)

    }
    else if (req.cookies?.token) {
        console.log("inside cookies there is", req.cookies)
        token = req.cookies.token
    }

    if (!token) {
        return res.status(401).json({
            message: "ACCESS DENIED! No Token Provided"
        })
    }
    const result = jwt.verify(token, secret, (err, data) => {
        if (err) {
            console.log("mierr", err)
            return res.status(401).json({ message: "Invalidy Token" })

        }
        console.log("resul==", result)
        req.user = data
        console.log("data is my role", req.user)
        console.log("I am middleware before authentication", req.headers)
        next()


    })


}

export { verifyJWT } 