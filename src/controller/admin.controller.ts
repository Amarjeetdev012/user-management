import { Request, Response } from "express";
import { allAdmins, create, deleteAdminId, findAdminId, findEmail, IAdmin, update } from "../model/admin.model";
import bcrypt from 'bcrypt'
import { verifyPass } from "../middleware/validator.middleware";
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from "../config";
import { isValidObjectId } from "mongoose";


export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body as IAdmin
        const { fname, lname, email, gender, password } = data
        const admin = await findEmail(email)
        if (admin) {
            return res.status(404).send({ status: false, message: `admin already exists on this email ${email}` })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const saveData = await create(fname, lname, email, gender, hashPassword)
        const adminData = {
            fname: saveData.fname,
            lname: saveData.lname,
            email: saveData.email,
            gender: saveData.gender,
        }
        res.status(201).send({ status: true, message: 'admin created', data: adminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string, password: string }
        const { email, password } = data
        const admin = await findEmail(email)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'admin not registered' })
        }
        if (admin.active === false) {
            return res.status(403).send({ status: false, message: 'you have not access contact to super admin' })
        }
        const verifyPassword = verifyPass(password, admin.password)
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' })
        }
        const token = jwt.sign({ _id: admin._id, role: admin.role }, jwtSecretKey!)
        if (token) {
            return res.status(200).send({ status: true, message: 'login successfully', token: token })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}


export const getAdmins = async (req: Request, res: Response) => {
    const admins = await allAdmins()
    let saveData
    const adminData = admins.map((admin) => {
        return saveData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender
        }
    })
    res.status(200).send({ status: true, message: 'all admin data', data: adminData })
}


export const getadminbyId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const admin = await findAdminId(id)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'admin not found' })
        }
        const adminData = {
            fname: admin?.fname,
            lname: admin?.lname,
            email: admin?.email,
            gender: admin?.gender
        }
        res.status(200).send({ status: true, message: 'admin data', data: adminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const updateAdminId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body as IAdmin
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const admin = await findAdminId(id)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'admin not found' })
        }
        const updateAdmin = await update(id, data)
        const adminData = {
            fname: updateAdmin?.fname,
            lname: updateAdmin?.lname,
            email: updateAdmin?.email,
            gender: updateAdmin?.gender
        }
        res.status(200).send({ status: true, message: 'admin updated', data: adminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const admin = await findAdminId(id)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'admin not found or already deleted' })
        }
        deleteAdminId(id)
        res.status(204).send({ status: true, message: 'file deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}
