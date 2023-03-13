import { Request, Response } from "express"
import { active, allData, deactive, deleteId, findEmail, findId, IModel, update } from "../model/index.model"
import { isValidObjectId } from "mongoose"

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
        const updateUser = await deactive(email)
        const userData = {
            fname: updateUser?.fname,
            lname: updateUser?.lname,
            email: updateUser?.email,
            gender: updateUser?.gender
        }
        return res.status(200).send({ status: true, message: 'user deactivated successfully', data: userData })
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
            gender: user.gender,
            role: user.role,
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