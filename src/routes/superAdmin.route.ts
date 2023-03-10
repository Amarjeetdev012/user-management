import express from 'express'
import { login, register } from '../controller/superAdmin.controller'
import { loginSchema, registerSchema } from '../helper/superAdminAjv.helper'
import validateSchema from '../middleware/ajv.middleware'
const superAdminRoute = express.Router()

superAdminRoute.post('/register', validateSchema(registerSchema), register)
superAdminRoute.post('/login', validateSchema(loginSchema), login)

export default superAdminRoute