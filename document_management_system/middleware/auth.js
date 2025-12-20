import jwt from "jsonwebtoken"
const verifyJWT = (req, res, next) => {
    //JWT authentication
    let accessToken;
    const secret = process.env.ACCESS_TOKEN_SECRET
    console.log("EXPOSING SECRET", secret)
    console.log("value of req.headers", req.headers)
    //for mobile
    if (req.headers?.authorization) {
        // const bearerToken = req.cookies.token || req.headers.authorization
        const bearerToken = req.headers.authorization
        if (!bearerToken) {
            return res.status(401).json({
                message: "No Authorization Header Provided"
            })
        }
        console.log("bearer token", bearerToken)
        accessToken = bearerToken.split(" ")[1]
        console.log("MY TOKEN", token)

    }
    //for web
    else if (req.cookies?.accessToken) {
        console.log("inside cookies there is", req.cookies)
        accessToken = req.cookies.accessToken
    }

    if (!accessToken) {
        return res.status(401).json({
            message: "ACCESS DENIED! No Token Provided"
        })
    }
    const result = jwt.verify(accessToken, secret, (err, data) => {
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

const verifyRefreshToken = (req, res, next) => {
    //JWT authentication
    let RefreshToken;
    const secret = process.env.REFRESH_TOKEN_SECRET
    console.log("Refresh Token SECRET", secret)
    console.log("Refresh Token req.headers", req.headers)
    //for mobile
    if (req.headers?.authorization) {
        const bearerToken = req.headers.authorization
        if (!bearerToken) {
            return res.status(401).json({
                message: "No Authorization Header Provided"
            })
        }
        refreshToken = bearerToken.split(" ")[1]
        console.log("REFRESH TOKEN", token)

    }
    //for web
    else if (req.cookies?.refreshToken) {
        console.log("refresh token cookies", req.cookies)
        rerfreshToken = req.cookies.refreshToken
    }

    if (!refreshToken) {
        return res.status(401).json({
            message: "ACCESS DENIED! No Refresh Token Provided"
        })
    }
    const result = jwt.verify(refreshToken, secret, (err, data) => {
        if (err) {
            console.log("ERROR VERIFYING REFRESH TOKEN", err)
            return res.status(401).json({ message: "Invalid Refresh Token" })

        }
        console.log("REFRESH TOKEN RESULT", result)
        req.user = data
        console.log("REFRESH TOKEN REQ.USER", req.user)
        console.log("REFRESH TOKEN middleware before authentication", req.headers)
        next()


    })


}

export { verifyJWT, verifyRefreshToken } 