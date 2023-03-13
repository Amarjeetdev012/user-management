import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { allData, deleteId, findId, IModel, update } from "../model/index.model.js";

export const getAdmins = async (req: Request, res: Response) => {
    const admins = await allData('admin')
    console.log('admins', admins);
    let saveData
    const adminData = admins.map((admin: IModel) => {
        return saveData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role,
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
        res.status(204).send({ status: true, message: 'file deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}
