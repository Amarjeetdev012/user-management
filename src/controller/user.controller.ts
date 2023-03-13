import { Request, Response } from "express"
import { active, allData, create, deactive, deleteId, findEmail, findId, IModel, update } from "../model/index.model"
import bcrypt from 'bcrypt'
import { isValidObjectId } from "mongoose"

export const register = async (req: Request, res: Response) => {
    let data = req.body
    data.role = 'user'
    const { fname, lname, email, gender, password, role } = data
    const user = await findEmail(email)
    if (user) {
        return res.status(404).send({ status: false, message: `user already exists on this email ${email}` })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const saveData = await create(fname, lname, email, gender, hashPassword, role)
    const userData = {
        fname: saveData.fname,
        lname: saveData.lname,
        email: saveData.email,
        gender: saveData.gender,
        role: saveData.role,
    }
    res.status(201).send({ status: true, message: 'user created', data: userData })
}

export const activateUser = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
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

export const deactivateUser = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        await deactive(email)
        return res.status(200).send({ status: true, message: 'user deactivated successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    const users = await allData('user')
    let saveData
    const userData = users.map((user) => {
        return saveData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender
        }
    })
    res.status(200).send({ status: true, message: 'all user data', data: userData })
}

export const getUserbyId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const user = await findId(id)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' })
        }
        const userData = {
            fname: user?.fname,
            lname: user?.lname,
            email: user?.email,
            gender: user?.gender
        }
        res.status(200).send({ status: true, message: 'user data', data: userData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const updateUserId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body as IModel
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const user = await findId(id)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' })
        }
        const updateUser = await update(id, data)
        const userData = {
            fname: updateUser?.fname,
            lname: updateUser?.lname,
            email: updateUser?.email,
            gender: updateUser?.gender
        }
        res.status(200).send({ status: true, message: 'user updated', data: userData })
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
        const deleteUser = deleteId(id)
        res.status(204).send({ status: true, message: 'file deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}