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
        const { fname, lname, email, gender, password } = data
        if (lname || fname || email || gender || password) {
            const validId = isValidObjectId(id)
            if (!validId) {
                return res.status(400).send({ status: false, message: 'invalid object id' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'provide valid fields' })
        }
        const user = await findId(id)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' })
        }
        if (user.role === 'superadmin') {
            return res.status(400).send({ status: false, message: 'no data found' })
        }
        if (user.role === 'user') {
            await update(id, data)
        }
        res.status(200).send({ status: true, message: 'user updated' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}
