import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors, JwtPayload, Secret } from 'jsonwebtoken'
import { jwtSecretKey } from "../config";
import { findAdminId } from "../model/admin.model";
import { findId } from "../model/superAdmin.model";

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
        const checkSuperAdmin = await findId(decode?._id)
        if (!checkSuperAdmin) {
            const checkAdmin = await findAdminId(decode?._id)
            if (!checkAdmin) {
                return res.status(401).send({ status: false, message: 'unauthorized person' })
            }
        }
        return next();
    } catch (err) {
        return res
            .status(403)
            .send({ status: false, message: (err as Error).message });
    }
};
