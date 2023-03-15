import { Response } from "express";
import { ERROR_CODE, SUCCESS_CODE } from "./codes";

export const notFound = (res: Response, field: string) => {
    return res.status(ERROR_CODE.NOT_FOUND).json({ error: true, message: `${field}` });
}

export const createResponse = (res: Response, data: object) => {
    return res.status(SUCCESS_CODE.CREATE).json(data)
}

export const successResponse = (res: Response, data: object) => {
    return res.status(SUCCESS_CODE.SUCCESS).json(data)
}

export const successMessage = (res: Response, field: string) => {
    return res.status(SUCCESS_CODE.SUCCESS).send(field)
}

export const serverError = (res: Response, err: string) => {
    return res.status(ERROR_CODE.SERVER_ERROR).json({ error: true, message: `server error ${err}` })
}

export const unauthorize = (res: Response, field: string) => {
    return res.status(ERROR_CODE.UNAUTHORIZED).json({ error: true, message: `${field}` })
}

export const forbidden = (res: Response, field: string) => {
    return res.status(ERROR_CODE.FORBIDDEN).json({ error: true, message: `${field}` })
}
export const invalidRequest = (res: Response, field: string) => {
    return res.status(ERROR_CODE.INVALID_REQUEST).json({ error: true, message: `${field}` })
}

export const deleteSuccess = async (res: Response) => {
    return res.status(SUCCESS_CODE.NO_CONTENT) }
