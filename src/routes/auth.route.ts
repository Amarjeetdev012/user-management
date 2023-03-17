import express from 'express'
import { login, register } from '../auth/index.auth'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import { limiter } from '../helper/limiter.helper'
import validateSchema from '../middleware/ajv.middleware'

const auth = express.Router()

auth.post('/register', limiter, validateSchema(registerSchema), register)
auth.post('/login', limiter, validateSchema(loginSchema), login)

export default auth