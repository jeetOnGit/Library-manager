import express from 'express'
import { registerUser, loginUser, getAllUsers, addFavBooks, getFavBooks, removeFavBook, borrowBook, returnBook, getMyProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.post('/:userId/add-favourites/:bookId', addFavBooks)
userRouter.post('/:userId/remove-favourites/:bookId', removeFavBook)

userRouter.post('/:userId/borrow-book/:bookId', borrowBook)
userRouter.post('/:userId/return-book/:bookId', returnBook)

userRouter.get('/all-users', getAllUsers)
userRouter.get('/me', authUser, getMyProfile)
userRouter.get('/:userId/favourites', getFavBooks)

export default userRouter