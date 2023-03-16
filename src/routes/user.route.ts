import express from 'express'
import { validAdmin, validAdminOrSuperAdmin, validSuperAdmin, validUser } from '../auth/index.auth'
import { activateUser, deactivateUser, deleteUser, getadminbyId, getAdmins, getUserbyId, getUsers, updateById } from '../controller/user.controller'
import { updateSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.get('/', validAdminOrSuperAdmin, getUsers)
userRoute.get('/admin', validSuperAdmin, getAdmins)
userRoute.get('/admin/:id', validAdmin, getadminbyId)
userRoute.get('/:id', validUser, getUserbyId)

userRoute.patch('/active', validAdminOrSuperAdmin, activateUser)
userRoute.patch('/deactive', validAdminOrSuperAdmin, deactivateUser)
userRoute.patch('/:id', validUser, validateSchema(updateSchema), updateById)

userRoute.delete('/:id', validAdminOrSuperAdmin, deleteUser)

export default userRoute
