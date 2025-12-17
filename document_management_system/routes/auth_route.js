import express from "express"
import { signupController, loginController } from "../controllers/auth_controller.js"
import { verifyJWT } from "../middleware/auth.js"
const authRouter = express.Router()
console.log("AUTH ROUTE MAI AYA")
authRouter.post("/login", verifyJWT, loginController)

authRouter.post("/signup", signupController)
export default authRouter
