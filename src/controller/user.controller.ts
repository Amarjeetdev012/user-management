import { Request, Response } from "express"
import { activeUser, create, findEmail } from "../model/user.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userSecretKey } from "../config"
import { verifyPass } from "../middleware/validator.middleware"

export const register = async (req: Request, res: Response) => {
    let data = req.body
    const { fname, lname, email, gender, password } = data
    const user = await findEmail(email)
    if (user) {
        return res.status(404).send({ status: false, message: `user already exists on this email ${email}` })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const saveData = await create(fname, lname, email, gender, hashPassword)
    res.status(201).send({ status: true, message: 'user created', data: saveData })
}

export const login = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string, password: string }
        const { email, password } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not registered' })
        }
        if (user.active === false) {
            return res.status(403).send({ status: false, message: 'you have not access contact to admin' })
        }
        const verifyPassword = verifyPass(password, user.password)
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' })
        }
        const token = await jwt.sign({ _id: user._id }, userSecretKey!)
        if (token) {
            return res.status(200).send({ status: true, message: 'login succesfully', token: token })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const activateUser = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string }
        console.log('data', data);

        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        const updateUser = await activeUser(email)
        return res.status(200).send({ status: true, message: 'user activated', data: updateUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}