import { Router } from "express"
import { signIn, signUp, update } from "../controllers/authController.js"
import { validateEmployee } from "../middlewares/authMiddleware.js"

const authRoute = Router()

authRoute.post(
    '/sign-up',
    validateEmployee, 
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