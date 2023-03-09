import { Request, Response } from "express"
import { IUser, User } from "../model/user.model"
import bcrypt from 'bcrypt'

export const register = async (req: Request, res: Response) => {
    let data = req.body
    const { fname, lname, email, gender, password } = data
    const user = await User.findOne({ email })
    console.log('user', user);
    if (user) {
        return res.status(404).send({ status: false, message: `user already exists on this email ${email}` })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    console.log('hashPassword', hashPassword);

    const saveData = await User.create({ fname: fname, lname: lname, email: email, gender: gender, password: hashPassword })
    res.status(201).send({ status: true, message: 'user created', data: saveData })
}