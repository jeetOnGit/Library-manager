import express from 'express'
import { registerUser, loginUser, getAllUsers, addFavBooks, getFavBooks, removeFavBook, getMyProfile, getMyRequests } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import { borrowBook, returnBook, withdrawRequest } from '../controllers/BookBorrow.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.post('/:userId/add-favourites/:bookId', authUser, addFavBooks)
userRouter.delete('/:userId/remove-favourites/:bookId', authUser, removeFavBook)

userRouter.post('/borrow-book/:bookId', authUser, borrowBook)
userRouter.get('/my-requests', authUser, getMyRequests);
userRouter.delete('/withdraw-request/:bookId', authUser, withdrawRequest);
userRouter.patch('/return/:borrowId', authUser, returnBook);

userRouter.get('/all-users', getAllUsers)
userRouter.get('/me', authUser, getMyProfile)
userRouter.get('/:userId/favourites', getFavBooks)

export default userRouter