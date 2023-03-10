import express from 'express'
import { login, register } from '../controller/user.controller'
import  { loginSchema, registerSchema } from '../helper/userAjv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.post('/register',validateSchema(registerSchema), register)
userRoute.post('/login',validateSchema(loginSchema), login)

export default userRoute
