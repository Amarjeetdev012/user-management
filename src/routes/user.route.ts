import express from 'express'
import { login, register, validAdminOrSuperAdmin, validUser } from '../auth/index.auth'
import { activateUser, deactivateUser, deleteUser, getUserbyId, getUsers, updateUserId } from '../controller/user.controller'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()


userRoute.get('/', validAdminOrSuperAdmin, getUsers)
userRoute.get('/:id', validUser, getUserbyId)

userRoute.post('/', validateSchema(registerSchema), register)
userRoute.post('/login', validateSchema(loginSchema), login)

userRoute.patch('/active', validAdminOrSuperAdmin, activateUser)
userRoute.patch('/deactive', validAdminOrSuperAdmin, deactivateUser)
userRoute.patch('/:id', validUser, updateUserId)

userRoute.delete('/:id', validAdminOrSuperAdmin, deleteUser)

export default userRoute
