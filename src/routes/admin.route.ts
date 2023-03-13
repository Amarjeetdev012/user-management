import express from 'express'
import { validAdmin } from '../auth/validAdmin.auth'
import { validSuperAdmin } from '../auth/validSuperAdmin.auth'
import { getadminbyId, getAdmins, login, register, updateAdminId } from '../controller/admin.controller'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const adminRoute = express.Router()

adminRoute.post('/register', validateSchema(registerSchema), validSuperAdmin, register)
adminRoute.post('/login', validateSchema(loginSchema), login)
adminRoute.get('/admins', validSuperAdmin, getAdmins)
adminRoute.get('/:id', validAdmin, getadminbyId)
adminRoute.patch('/:id',validAdmin,updateAdminId)
adminRoute.delete('/:id',validSuperAdmin,)

export default adminRoute