import express from "express"
import { signupController, loginController, logoutController } from "../controllers/auth_controller.js"
import { verifyJWT } from "../middleware/auth.js"
import authController from "../controllers/protectedController.js"
import permid from "../middleware/permission.js"
const authRouter = express.Router()
console.log("AUTH ROUTE MAI AYA")
authRouter.post("/login", loginController)
authRouter.post("/logout", verifyJWT, logoutController)
authRouter.post("/signup", signupController)
authRouter.get("/protected", verifyJWT, permid, authController)
export default authRouter
