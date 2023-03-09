import userRoute from "./user.route";
import express from 'express'

const router = express.Router()

router.use('/user', userRoute)

export default router
