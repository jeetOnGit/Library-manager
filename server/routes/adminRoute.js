import express from 'express'
import authUser from '../middlewares/authUser.js'
import { approveManually, rejectRequest, getAllPendingRequests } from '../controllers/AdminController.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.patch('/approve/:borrowId', authUser, authAdmin, approveManually)
adminRouter.patch('/reject/:borrowId', authUser, authAdmin, rejectRequest);
// adminRouter.patch('/approve-qr/:borrowId', authUser, authAdmin, approveRequest);

adminRouter.get('/pending-requests',authUser, authAdmin, getAllPendingRequests)

export default adminRouter

