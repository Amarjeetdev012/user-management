import express from 'express'
import userRoute from "./user.route";
import auth from './auth.route';

const router = express.Router()

router.use('/auth', auth)
router.use('/user', userRoute)

export default router
