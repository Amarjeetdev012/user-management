import express from 'express'
import { validAdmin, validAdminOrSuperAdmin, validSuperAdmin, validUser } from '../auth/index.auth'
import { activateUser, deactivateUser, deleteUser, getadminbyId, getAdmins, getUserbyId, getUsers, updateById } from '../controller/user.controller'
import { updateSchema } from '../helper/ajv.helper'
import { limiter } from '../helper/limiter.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.get('/', limiter, validAdminOrSuperAdmin, getUsers)
userRoute.get('/admin', limiter, validSuperAdmin, getAdmins)
userRoute.get('/admin/:id', limiter, validAdmin, getadminbyId)
userRoute.get('/:id', limiter, validUser, getUserbyId)

userRoute.patch('/active', validAdminOrSuperAdmin, activateUser)
userRoute.patch('/deactive', validAdminOrSuperAdmin, deactivateUser)
userRoute.patch('/:id', validUser, validateSchema(updateSchema), updateById)

userRoute.delete('/:id', validAdminOrSuperAdmin, deleteUser)

export default userRoute
