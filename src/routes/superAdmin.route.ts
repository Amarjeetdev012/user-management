import express from 'express'
import { validSuperAdmin } from '../auth/index.auth'
import { activateAdmin, deactivateAdmin, deleteAdmin, getAdmins } from '../controller/admin.controller'

const superAdminRoute = express.Router()

superAdminRoute.get('/', validSuperAdmin, getAdmins)

superAdminRoute.patch('/active', validSuperAdmin, activateAdmin)
superAdminRoute.patch('/deactive', validSuperAdmin, deactivateAdmin)

superAdminRoute.delete('/:id', validSuperAdmin, deleteAdmin)

export default superAdminRoute