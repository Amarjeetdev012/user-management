import userRoute from "./user.route";
import superAdminRoute from "./superAdmin";
import express from 'express'

const router = express.Router()

router.use('/user', userRoute)
router.use('/superadmin', superAdminRoute)

export default router
