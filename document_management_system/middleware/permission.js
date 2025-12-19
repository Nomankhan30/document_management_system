import User from "../models/user.js"
const permid = async (req, res, next) => {
    const roles = ["admin"]

    // const role=await User.findOne()
    console.log("req.user aya", req.user)
    if (!req.user) {
        return res.status(401).json("AUTHENTICATION REQUIRED! LOGIN FIRST")
    }
    if (!roles.includes(req.user.role)) {
        console.log("userrole", req.user.role)
        return res.status(400).json("ACCESS DENIED! PERMISSION NOT ALLOWED")
    }
    next()
}
export default permid