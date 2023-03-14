import express from 'express'
import { validAdmin, validAdminOrSuperAdmin, validSuperAdmin } from '../auth/index.auth'
import { activateUser, deactivateUser, deleteUser, getadminbyId, getAdmins, getUsers, updateAdminId } from '../controller/admin.controller'

const adminRoute = express.Router()

adminRoute.get('/', validSuperAdmin, getAdmins)
adminRoute.get('/users', validAdminOrSuperAdmin, getUsers)
adminRoute.get('/:id', validAdmin, getadminbyId)

adminRoute.patch('/active', validAdminOrSuperAdmin, activateUser)
adminRoute.patch('/deactive', validAdminOrSuperAdmin, deactivateUser)
adminRoute.patch('/:id', validAdmin, updateAdminId)

adminRoute.delete('/:id', validAdminOrSuperAdmin, deleteUser)
// adminRoute.delete('/:id', validSuperAdmin, deleteAdmin)

export default adminRoute