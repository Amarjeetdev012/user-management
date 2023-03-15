import { Request, Response } from "express"
import { findId, IModel, update } from "../model/index.model"
import { isValidObjectId } from "mongoose"


export const getUserbyId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id ID' })
        }
        const user = await findId(id)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' })
        }
        const userData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role
        }
        res.status(200).send({ status: true, message: 'user data', data: userData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const updateById = async (req: Request, res: Response) => {
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
        const token = req.token_data
        if (token.role === 'superadmin') {
            if (user.role === 'superadmin') { return res.status(401).send({ status: false, message: 'access denied' }) }
            await update(id, data)
        }
        if (token.role === 'admin') {
            if (user.role === 'superadmin') { return res.status(401).send({ status: false, message: 'access denied' }) }
            if (token._id !== user._id) { return res.status(401).send({ status: false, message: 'access denied' }) }
            await update(id, data)
        }
        if (token.role === 'user') {
            if (user.role === 'superadmin' || user.role === 'admin') { return res.status(401).send({ status: false, message: 'access denied' }) }
            await update(id, data)
        }
        res.status(200).send({ status: true, message: `${user.role} updated` })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}
