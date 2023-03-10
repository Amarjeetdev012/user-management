import express from 'express'
import { validAdminOrSuperAdmin } from '../auth/validAdmin.auth'
import { activateUser, login, register } from '../controller/user.controller'
import  { loginSchema, registerSchema } from '../helper/userAjv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.post('/register',validateSchema(registerSchema), register)
userRoute.post('/login',validateSchema(loginSchema), login)
userRoute.post('/activate',validAdminOrSuperAdmin,activateUser)

export default userRoute
