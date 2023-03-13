import express from 'express'
import { login } from '../auth/index.auth'
import { register } from '../controller/superAdmin.controller'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const superAdminRoute = express.Router()

superAdminRoute.post('/register', validateSchema(registerSchema), register)
superAdminRoute.post('/login', validateSchema(loginSchema), login)

export default superAdminRoute