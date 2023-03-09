import userRoute from "./user.route";
import { Request,Response } from "express";
import express from 'express'

const router = express.Router()


router.use('/user', userRoute)

export default router
