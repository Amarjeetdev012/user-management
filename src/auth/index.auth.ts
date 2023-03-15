import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { jwtSecretKey, superAdminKey } from "../config";
import { verifyPass } from "../middleware/validator.middleware";
import { create, findEmail, IModel } from "../model/index.model";
import { findId } from "../model/index.model";

export const login = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string, password: string }
        const { email, password } = data
        const user = await findEmail(email)
        if (!user) {
            return res.status(404).send({ status: false, message: `you are not registered` })
        }
        if (user.active === false) {
            return res.status(403).send({ status: false, message: 'you have not access contact to super admin' })
        }
        const verifyPassword = verifyPass(password, user.password)
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' })
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, jwtSecretKey)
        return res.status(200).send({ status: true, message: `${user.role} login successfully`, token: token })
    } catch (error) {
        return res.status(500).send({ status: false, message: (error as Error).message })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body as IModel
        if (data.role == 'superadmin') {
            data.active = true
            if (data.key !== superAdminKey) {
                return res.status(401).send({ status: false, message: 'unauthorize access provide valid key' })
            }
        } else {
            data.active = false
        }
        const { fname, lname, email, gender, password, role, active } = data
        const roleType = await findEmail(email)
        if (roleType) {
            return res.status(404).send({ status: false, message: `${roleType.role} already exists on this email ${email}` })
        }
        const saveData = await create(fname, lname, email, gender, password, role, active)
        const roleData = {
            fname: saveData.fname,
            lname: saveData.lname,
            email: saveData.email,
            gender: saveData.gender,
        }
        res.status(201).send({ status: true, message: `${saveData.role} created`, data: roleData })
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
                req.token_data = decode
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
                    throw new Error('token expired or verify error');
                }
                decode = decoded
                req.token_data = decode
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
                req.token_data = decode
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
                req.token_data = decode
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
