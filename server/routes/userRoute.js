import express from 'express'
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js'
// import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/all-users', getAllUsers)

export default userRouter