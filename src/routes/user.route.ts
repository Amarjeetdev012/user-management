import express from 'express'
import { validAdminOrSuperAdmin } from '../auth/validAdminOrSuperAdmin.auth'
import { validUser } from '../auth/validUser.auth'
import { activateUser, deleteUser, getUserbyId, getUsers, login, register, updateUserId } from '../controller/user.controller'
import { loginSchema, registerSchema } from '../helper/userAjv.helper'
import validateSchema from '../middleware/ajv.middleware'

const userRoute = express.Router()

userRoute.post('/register', validateSchema(registerSchema), register)
userRoute.post('/activate', validAdminOrSuperAdmin, activateUser)
userRoute.post('/login', validateSchema(loginSchema), login)
userRoute.get('/users', validAdminOrSuperAdmin, getUsers)
userRoute.get('/users/:id', validUser, getUserbyId)
userRoute.patch('/update/:id', validUser, updateUserId)
userRoute.delete('/delete/:id', validAdminOrSuperAdmin, deleteUser)

export default userRoute
