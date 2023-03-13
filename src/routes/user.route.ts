import express from 'express'
import { validUser } from '../auth/index.auth'
import { getUserbyId, updateUserId } from '../controller/user.controller'

const userRoute = express.Router()

userRoute.get('/:id', validUser, getUserbyId)

userRoute.patch('/:id', validUser, updateUserId)

export default userRoute
