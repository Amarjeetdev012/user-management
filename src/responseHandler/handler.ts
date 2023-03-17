import { Response } from "express";
import { MongoServerError } from "mongodb";
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

export const handleMongoError = (res: Express.Response, error: Error) => {
    if (error instanceof MongoServerError) {
        if (error.name === 'MongoError') {
            const mongoError = error as Error & { code?: number, keyValue?: Record<string, unknown> };
            switch (mongoError.code) {
                case 11000:
                    console.log('Duplicate key error:'.red, mongoError.keyValue);
                    break;
                default:
                    console.log('MongoError:'.red, mongoError.message);
            }
        } else if (error.name === 'ValidationError'.red) {
            console.log('Validation error:'.red, error.message);
        } else {
            console.log('Unexpected error:'.red, error);
        }
    } else {
        console.log('Unexpected error:'.red, error);
    }
}

export const somethingWentWrong = (res: Response) => {
    return res.status(ERROR_CODE.SERVER_ERROR).json({
        error: true,
        message: 'something went wrong',
    });
};

export const handleInvalidData = (res: Response, field: string) => {
    return res.status(ERROR_CODE.INVALID_REQUEST).json({ error: true, message: field })
}