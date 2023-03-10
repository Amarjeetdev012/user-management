import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { superAdminSecretKey } from "../config"
import { create, delSuperAdmin, findEmail } from "../model/superAdminModel.model"
import { superAdminKey } from "../config"

export const register = async (req: Request, res: Response) => {
    try {
        let data = req.body as { fname: string, lname: string, email: string, gender: string, password: string, active: boolean, role: string, key: string }
        const { fname, lname, email, gender, password, active, role, key } = data
        if (key !== superAdminKey) {
            return res.status(401).send({ status: false, message: 'wrong superAdminKey' })
        }
        const superAdmin = await findEmail(email)
        if (superAdmin) {
            return res.status(404).send({ status: false, message: `superAdmin already exists on this email ${email}` })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const saveData = await create(fname, lname, email, gender, hashPassword, active, role)
        res.status(201).send({ status: true, message: 'superAdmin created', data: saveData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string, password: string }
        const { email, password } = data
        const superAdmin = await findEmail(email)
        if (!superAdmin) {
            return res.status(404).send({ status: false, message: 'user not registered' })
        }
        const verifyPassword = await bcrypt.compare(password, superAdmin.password)
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' })
        }
        const token = jwt.sign({ _id: superAdmin._id }, superAdminSecretKey!)
        if (token) {
            return res.status(200).send({ status: true, message: 'login succesfully', token: token })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const deleteSuperAdmin = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string, key: string }
        const { email, key } = data
        if (key !== superAdminSecretKey) {
            return res.status(401).send({ status: false, message: 'wrong superAdminKey' })
        }
        const superAdmin = await findEmail(email)
        if (!superAdmin) {
            return res.status(404).send({ status: false, message: 'no super admin found' })
        }
        delSuperAdmin(email)
        res.status(204).send({ status: true, message: 'super admin deleted succesfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}