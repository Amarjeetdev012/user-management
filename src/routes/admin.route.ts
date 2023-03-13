import express from 'express'
import { login, register, validAdmin, validSuperAdmin } from '../auth/index.auth'
import { deleteAdmin, getadminbyId, getAdmins, updateAdminId } from '../controller/admin.controller'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const adminRoute = express.Router()

adminRoute.post('/register', validateSchema(registerSchema), validSuperAdmin, register)
adminRoute.post('/login', validateSchema(loginSchema), login)
adminRoute.get('/admins', validSuperAdmin, getAdmins)
adminRoute.get('/:id', validAdmin, getadminbyId)
adminRoute.patch('/:id', validAdmin, updateAdminId)
adminRoute.delete('/:id', validSuperAdmin, deleteAdmin)

export default adminRoute