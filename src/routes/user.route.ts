import express from 'express'
import { register } from '../controller/user.controller'
import registerSchema from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.post('/register',validateSchema(registerSchema), register)

export default userRoute
