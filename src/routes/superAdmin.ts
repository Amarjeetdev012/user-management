import express from 'express'
import { login, register } from '../controller/superAdmin.controller'
const superAdminRoute = express.Router()

superAdminRoute.post('/register', register)
superAdminRoute.post('/login', login)


export default superAdminRoute