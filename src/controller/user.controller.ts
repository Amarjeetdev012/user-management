import { Request, Response } from "express"
import { activeUser, allUser, create, deleteUserId, findEmail, findUserId, IUser, update } from "../model/user.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyPass } from "../middleware/validator.middleware"
import { isValidObjectId } from "mongoose"
import { jwtSecretKey } from "../config"


export const register = async (req: Request, res: Response) => {
    let data = req.body
    const { fname, lname, email, gender, password } = data
    const user = await findEmail(email)
    if (user) {
        return res.status(404).send({ status: false, message: `user already exists on this email ${email}` })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const saveData = await create(fname, lname, email, gender, hashPassword)
    const userData = {
        fname: saveData.fname,
        lname: saveData.lname,
        email: saveData.email,
        gender: saveData.gender,
    }
    res.status(201).send({ status: true, message: 'user created', data: userData })
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
        const token = jwt.sign({ _id: user._id, role: user.role }, jwtSecretKey!)
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
        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' })
        }
        const updateUser = await activeUser(email)
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

export const getUsers = async (req: Request, res: Response) => {
    const users = await allUser()
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
        const user = await findUserId(id)
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
        const data = req.body as IUser
        const validId = isValidObjectId(id)
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' })
        }
        const user = await findUserId(id)
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
        const user = await findUserId(id)
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found or already deleted' })
        }
        const deleteUser = deleteUserId(id)
        console.log('deleteUser', deleteUser);
        res.status(204).send({ status: true, message: 'file deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}