import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { active, allData, deactive, deleteId, findEmail, findId, IModel, update } from "../model/index.model.js";

export const getAdmins = async (req: Request, res: Response) => {
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
      const saveData  = {
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
            return res.status(400).send({ status: false, message: 'invalid object id' })
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

export const updateAdminId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body as IModel
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'update data should not empty' })
        }
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const admin = await findId(id)
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



export const activateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (user?.role !== 'user') {
            return res.status(404).send({ status: false, message: 'no user found on given email id' })
        }
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        const updateUser = await active(email)
        const userData = {
            fname: updateUser?.fname,
            lname: updateUser?.lname,
            email: updateUser?.email,
            gender: updateUser?.gender
        }
        return res.status(200).send({ status: true, message: 'user activated', data: userData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const activateAdmin = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        if (!email) {
            return res.status(400).send({ status: false, message: 'please provide email id' })
        }
        const admin = await findEmail(email)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'no admin found' })
        }
        const updateAdmin = await active(email)
        const adminData = {
            fname: updateAdmin?.fname,
            lname: updateAdmin?.lname,
            email: updateAdmin?.email,
            gender: updateAdmin?.gender
        }
        return res.status(200).send({ status: true, message: 'admin activated', data: adminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}


export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (user?.role !== 'user') {
            return res.status(404).send({ status: false, message: 'no user found on given email id' })
        }
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        const updateUser = await deactive(email)
        const userData = {
            fname: updateUser?.fname,
            lname: updateUser?.lname,
            email: updateUser?.email,
            gender: updateUser?.gender,
            role: updateUser?.role,
        }
        return res.status(200).send({ status: true, message: 'user deactivated successfully', data: userData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const deactivateAdmin = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        if (!email) {
            return res.status(400).send({ status: false, message: 'please provide email id' })
        }
        const admin = await findEmail(email)
        if (!admin) {
            return res.status(404).send({ status: false, message: 'no admin found' })
        }
        const updateAdmin = await deactive(email)
        const adminData = {
            fname: updateAdmin?.fname,
            lname: updateAdmin?.lname,
            email: updateAdmin?.email,
            gender: updateAdmin?.gender
        }
        return res.status(200).send({ status: true, message: 'admin deactivated successfully', data: adminData })
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
