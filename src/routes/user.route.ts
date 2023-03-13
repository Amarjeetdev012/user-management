import express from 'express'
import { login, validAdminOrSuperAdmin, validUser } from '../auth/index.auth'
import { activateUser, deactivateUser, deleteUser, getUserbyId, getUsers, register, updateUserId } from '../controller/user.controller'
import { loginSchema, registerSchema } from '../helper/ajv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.post('/register', validateSchema(registerSchema), register)
userRoute.post('/active', validAdminOrSuperAdmin, activateUser)
userRoute.post('/login', validateSchema(loginSchema), login)
userRoute.get('/users', validAdminOrSuperAdmin, getUsers)
userRoute.get('/:id', validUser, getUserbyId)
userRoute.patch('/user/:id', validUser, updateUserId)
userRoute.patch('/deactive', validAdminOrSuperAdmin, deactivateUser)
userRoute.delete('/:id', validAdminOrSuperAdmin, deleteUser)

export default userRoute
