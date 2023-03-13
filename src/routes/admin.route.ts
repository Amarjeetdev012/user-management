import express from 'express'
import validateSchema from '../middleware/ajv.middleware'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import { login, register, validAdmin, validAdminOrSuperAdmin, validSuperAdmin } from '../auth/index.auth'
import { deleteAdmin, getadminbyId, getAdmins, updateAdminId } from '../controller/admin.controller'
import { activateUser, deactivateUser, deleteUser, getUsers } from '../controller/user.controller'

const adminRoute = express.Router()

adminRoute.get('/', validSuperAdmin, getAdmins)
adminRoute.get('/users', validAdminOrSuperAdmin, getUsers)
adminRoute.get('/:id', validAdmin, getadminbyId)

adminRoute.patch('/active', validAdminOrSuperAdmin, activateUser)
adminRoute.patch('/deactive', validAdminOrSuperAdmin, deactivateUser)
adminRoute.patch('/:id', validAdmin, updateAdminId)

adminRoute.delete('/:id', validAdminOrSuperAdmin, deleteUser)
adminRoute.delete('/:id', validSuperAdmin, deleteAdmin)

export default adminRoute