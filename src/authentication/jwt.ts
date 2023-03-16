import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../config';

export const getToken = (data: object): string => {
    return jwt.sign(data, jwtSecretKey);
};