import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { jwtSecretKey, superAdminKey } from "../config"
import { create, deleteId, findEmail, IModel } from "../model/index.model"

export const register = async (req: Request, res: Response) => {
    try {
        let data = req.body as IModel
        data.role = 'superadmin'
        data.active = true
        const { fname, lname, email, gender, password, key, role, active } = data
        if (key !== superAdminKey) {
            return res.status(401).send({ status: false, message: 'wrong superAdminKey' })
        }
        const superAdmin = await findEmail(email)
        if (superAdmin) {
            return res.status(404).send({ status: false, message: `superAdmin already exists on this email ${email}` })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const saveData = await create(fname, lname, email, gender, hashPassword, role, active)
        const superAdminData = {
            fname: saveData.fname,
            lname: saveData.lname,
            email: saveData.email,
            gender: saveData.gender,
        }
        res.status(201).send({ status: true, message: 'superAdmin created', data: superAdminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const deleteSuperAdmin = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string, key: string }
        const { email, key } = data
        if (key !== jwtSecretKey) {
            return res.status(401).send({ status: false, message: 'wrong superAdminKey' })
        }
        const superAdmin = await findEmail(email)
        if (!superAdmin) {
            return res.status(404).send({ status: false, message: 'no super admin found' })
        }
        deleteId(email)
        res.status(204).send({ status: true, message: 'super admin deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}