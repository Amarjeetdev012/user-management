import { Request, Response } from "express"
import {findId, IModel, update } from "../model/index.model"
import { isValidObjectId } from "mongoose"


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
