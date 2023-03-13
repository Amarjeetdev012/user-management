import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import { jwtSecretKey } from "../config";
import { verifyPass } from "../middleware/validator.middleware";
import { create, findEmail, IModel } from "../model/index.model";
import { findId } from "../model/index.model";


export const login = async (req: Request, res: Response) => {
    try {
        let data = req.body as { email: string, password: string }
        const { email, password } = data
        const role = await findEmail(email)
        console.log('role', role);
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

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body as IModel
        data.role = 'admin'
        data.active = true
        const { fname, lname, email, gender, password, role, active } = data
        const admin = await findEmail(email)
        if (admin) {
            return res.status(404).send({ status: false, message: `admin already exists on this email ${email}` })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const saveData = await create(fname, lname, email, gender, hashPassword, role, active)
        const adminData = {
            fname: saveData.fname,
            lname: saveData.lname,
            email: saveData.email,
            gender: saveData.gender,
        }
        res.status(201).send({ status: true, message: 'admin created', data: adminData })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const validAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return res
                    .status(401)
                    .send({ status: false, message: 'invalid validation method' });
            }
            jwt.verify(auth[1], jwtSecretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    throw new Error('error from jwt verify');
                }
                decode = decoded
            } as jwt.VerifyCallback);
        }
        if (decode?.role === "superadmin") {
            return next()
        }
        const checkId = await findId(decode?._id)
        if (!checkId) {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
        if (req.params.id === decode?._id) {
            return next()
        } else {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
    } catch (err) {
        return res
            .status(403)
            .send({ status: false, message: (err as Error).message });
    }
};


export const validAdminOrSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return res
                    .status(401)
                    .send({ status: false, message: 'invalid validation method' });
            }
            const secretKey = jwtSecretKey
            if (!secretKey) {
                throw new Error('Missing secret key');
            }
            jwt.verify(auth[1], secretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    throw new Error('error from jwt verify');
                }
                decode = decoded
            } as jwt.VerifyCallback);
        }
        if (decode?.role === 'superadmin' || decode?.role === 'admin') {
            return next();
        } else {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
    } catch (err) {
        return res
            .status(403)
            .send({ status: false, message: (err as Error).message });
    }
};


export const validSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return res
                    .status(401)
                    .send({ status: false, message: 'invalid validation method' });
            }
            const secretKey = jwtSecretKey
            if (!secretKey) {
                throw new Error('Missing secret key');
            }
            jwt.verify(auth[1], secretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    throw new Error('error from jwt verify');
                }
                decode = decoded
            } as jwt.VerifyCallback);
        }
        if (decode?.role === 'superadmin') {
            return next();
        } else {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
    } catch (err) {
        return res
            .status(403)
            .send({ status: false, message: (err as Error).message });
    }
};


export const validUser = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return res
                    .status(401)
                    .send({ status: false, message: 'invalid validation method' });
            }
            const secretKey = jwtSecretKey
            if (!secretKey) {
                throw new Error('Missing secret key');
            }
            jwt.verify(auth[1], secretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    throw new Error('error from jwt verify');
                }
                decode = decoded
            } as jwt.VerifyCallback);
        }
        if (decode?.role === "superadmin" || decode?.role === 'admin') {
            return next()
        }
        const checkId = await findId(decode?._id)
        if (!checkId) {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
        if (req.params.id === decode?._id) {
            return next()
        } else {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
    } catch (err) {
        return res
            .status(403)
            .send({ status: false, message: (err as Error).message });
    }
};
