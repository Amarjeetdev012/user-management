import { verifyPass } from "../middleware/validator.middleware";
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from "../config";
import { Request, Response } from "express";
import { findEmail } from "../model/allModel.model";

export const login = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string, password: string }
        const { email, password } = data
        const role = await findEmail(email)
        if (!role) {
            return res.status(404).send({ status: false, message: `you are not registered` })
        }
        if (role.active === false) {
            return res.status(403).send({ status: false, message: 'you have not access contact to super admin' })
        }
        const verifyPassword = verifyPass(password, role.password)
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' })
        }
        const token = jwt.sign({ _id: role._id, role: role.role }, jwtSecretKey!)
        return res.status(200).send({ status: true, message: `${role.role} login successfully`, token: token })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}
