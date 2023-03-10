import userRoute from "./user.route";
import superAdminRoute from "./superAdmin.route";
import express from 'express'
import adminRoute from "./admin.route";

const router = express.Router()

router.use('/user', userRoute)
router.use('/superadmin', superAdminRoute)
router.use('/admin', adminRoute)

export default router
