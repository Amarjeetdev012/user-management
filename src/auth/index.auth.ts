import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { jwtSecretKey, superAdminKey } from "../config";
import { verifyPass } from "../middleware/validator.middleware";
import { create, findEmail, IModel } from "../model/index.model";
import { findId } from "../model/index.model";
import { responseHandler } from '../responseHandler';

export const login = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string, password: string }
        const { email, password } = data
        const user = await findEmail(email)
        if (!user) {
            return responseHandler.notFound(res, `user not found`)
        }
        if (user.active === false) {
            return responseHandler.forbidden(res, `not authorize user contact to super admin`)
        }
        const verifyPassword = await verifyPass(password, user.password)
        if (!verifyPassword) {
            return responseHandler.forbidden(res, `wrong password`)
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, jwtSecretKey)
        return responseHandler.successMessage(res, `login successfully token: ${token} `)
    } catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body as IModel
        if (data.role == 'superadmin') {
            data.active = true
            if (data.key !== superAdminKey) {
                return responseHandler.unauthorize(res, `not authorize wrong key`)
            }
        } else {
            data.active = false
        }
        const { fname, lname, email, gender, password, role, active } = data
        const user = await findEmail(email)
        if (user) {
            return responseHandler.invalidRequest(res, `already exist on this email id`)
        }
        const saveData = await create(fname, lname, email, gender, password, role, active)
        const roleData = {
            fname: saveData.fname,
            lname: saveData.lname,
            email: saveData.email,
            gender: saveData.gender,
        }
        return responseHandler.createResponse(res, roleData)
    } catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}

export const validAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return responseHandler.unauthorize(res, `invalid validation method`)
            }
            jwt.verify(auth[1], jwtSecretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    return responseHandler.forbidden(res, `token expired or verify error`)
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
            return responseHandler.forbidden(res, `access denied`)
        }
    } catch (err) {
        return responseHandler.serverError(res, `${(err as Error).message}`)
    }
};


export const validAdminOrSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return responseHandler.unauthorize(res, `invalid validation method`)
            }
            const secretKey = jwtSecretKey
            if (!secretKey) {
                return responseHandler.invalidRequest(res, `missing secret key`)
            }
            jwt.verify(auth[1], secretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    return responseHandler.forbidden(res, `token expired or verify error`)
                }
                decode = decoded
                req.token_data = decode
            } as jwt.VerifyCallback);
        }
        if (decode?.role === 'superadmin' || decode?.role === 'admin') {
            return next();
        } else {
            return responseHandler.forbidden(res, `access denied`)
        }
    } catch (err) {
        return responseHandler.serverError(res, `${(err as Error).message}`)
    }
};


export const validSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return responseHandler.unauthorize(res, `invalid validation method`)
            }
            const secretKey = jwtSecretKey
            if (!secretKey) {
                return responseHandler.invalidRequest(res, `missing secret key`)
            }
            jwt.verify(auth[1], secretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    return responseHandler.forbidden(res, `token expired or verify error`)
                }
                decode = decoded
                req.token_data = decode
            } as jwt.VerifyCallback);
        }
        if (decode?.role === 'superadmin') {
            return next();
        } else {
            return responseHandler.forbidden(res, `access denied`)
        }
    } catch (err) {
        return responseHandler.serverError(res, `${(err as Error).message}`)
    }
};


export const validUser = async (req: Request, res: Response, next: NextFunction) => {
    let decode: JwtPayload | undefined;
    try {
        const data = req.get('authorization')
        if (data) {
            const auth = data.split(' ')
            if (auth[0] !== 'Bearer') {
                return responseHandler.unauthorize(res, `invalid validation method`)
            }
            const secretKey = jwtSecretKey
            if (!secretKey) {
                return responseHandler.invalidRequest(res, `missing secret key`)
            }
            jwt.verify(auth[1], secretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    return responseHandler.forbidden(res, `token expired or verify error`)
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
            return responseHandler.forbidden(res, `access denied`)
        }
    } catch (err) {
        return responseHandler.serverError(res, `${(err as Error).message}`)
    }
};
