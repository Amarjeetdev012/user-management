import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { active, allData, deactive, deleteId, findEmail, findId, IModel, } from "../model/index.model.js";

export const getAdmins = async (req: Request, res: Response) => {
    console.log('all admins');
    const admins = await allData('admin')
    const adminData = admins.map((admin: IModel) => {
        const saveData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role,
        }
        return saveData
    })
    res.status(200).send({ status: true, message: 'all admin data', data: adminData })
}

export const getUsers = async (req: Request, res: Response) => {
    const users = await allData('user')
    const userData = users.map((user) => {
        const saveData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role,
        }
        return saveData
    })
    res.status(200).send({ status: true, message: 'all user data', data: userData })
}

export const getadminbyId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object ID id' })
        }
        const admin = await findId(id)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'admin not found' })
        }
        const adminData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role
        }
        res.status(200).send({ status: true, message: 'admin data', data: adminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}


export const activateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        const decode = req.token_data
        if (decode.role === 'superadmin') {
            if (user.role === 'superadmin') { return res.status(400).send({ status: false, message: 'access denied' }) }
            if (user.role === 'admin' || user.role === 'user') { await active(email) }
        }
        if (decode.role === 'admin') {
            if (user.role === 'superadmin' || user.role === 'admin') { return res.status(400).send({ status: false, message: 'access denied' }) } else {
                await active(email)
            }
        }
        if (decode.role === 'user') { return res.status(400).send({ status: false, message: 'access denied' }) }
        return res.status(200).send({ status: true, message: `${user.role} activated` })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        const decode = req.token_data
        if (decode.role === 'superadmin') {
            if (user.role === 'superadmin') { return res.status(400).send({ status: false, message: 'access denied' }) }
            if (user.role === 'admin' || user.role === 'user') { await deactive(email) }
        }
        if (decode.role === 'admin') {
            if (user.role === 'superadmin' || user.role === 'admin') { return res.status(400).send({ status: false, message: 'access denied' }) } else {
                await deactive(email)
            }
        }
        if (decode.role === 'user') { return res.status(400).send({ status: false, message: 'access denied' }) }
        return res.status(200).send({ status: true, message: `${user.role} activated` })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const user = await findId(id)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found or already deleted' })
        }
        deleteId(id)
        res.status(204)
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
        const admin = await findId(id)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'admin not found or already deleted' })
        }
        await deleteId(id)
        res.status(204).send({ status: true, message: 'admin deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}
