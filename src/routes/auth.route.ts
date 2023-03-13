import express from 'express'
import { login, register } from '../auth/index.auth'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const auth = express.Router()

auth.post('/register', validateSchema(registerSchema), register)
auth.post('/login', validateSchema(loginSchema), login)

export default auth