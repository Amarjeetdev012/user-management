import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors, JwtPayload, Secret } from 'jsonwebtoken'
import { jwtSecretKey } from "../config";
import { findId } from "../model/superAdmin.model";
import { findUserId } from "../model/user.model";

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
            jwt.verify(auth[1], jwtSecretKey as Secret, function (err: VerifyErrors | null, decoded: JwtPayload | undefined) {
                if (err) {
                    throw new Error('error from jwt verify');
                }
                decode = decoded
            } as jwt.VerifyCallback);
        }
        if (decode?.role === "superadmin" || decode?.role === 'admin') {
            return next()
        }
        const checkId = await findUserId(decode?._id)
        console.log('checkId', !checkId);
        if (!checkId) {
            return res.status(401).send({ status: false, message: 'unauthorized person' })
        }
        console.log('checkId', !checkId);
        return next()
    } catch (err) {
        return res
            .status(403)
            .send({ status: false, message: (err as Error).message });
    }
};