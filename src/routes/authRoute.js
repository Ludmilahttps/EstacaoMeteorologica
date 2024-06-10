import { Router } from "express"
import { signIn, signUp, update } from "../controllers/authController.js"
import { validateUser } from "../middlewares/authMiddleware.js"

const authRoute = Router()

authRoute.post(
    '/sign-up',
    validateUser, 
    signUp
)

authRoute.post(
    '/sign-in', 
    signIn
)

authRoute.put(
    '/update', 
    update
)

export { authRoute }