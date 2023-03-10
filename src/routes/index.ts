import express from 'express'
import userRoute from "./user.route";
import adminRoute from "./admin.route";
import auth from './auth.route';

const router = express.Router()

router.use('/user', userRoute)
router.use('/admin', adminRoute)
router.use('/auth', auth)

export default router
