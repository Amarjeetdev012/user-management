import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { MongoServerError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression'

import routes from './routes';
import { responseHandler } from './responseHandler';
import { logger } from './logger';

const app = express();

app.use(helmet());
app.use(compression())
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);
    next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (
        error.constructor.name == MongoServerError.name ||
        error.constructor.name == MongooseError.name
    ) {
        return responseHandler.handleMongoError(res, error);
    }
    return responseHandler.somethingWentWrong(res);
});

// handle invalid URL paths
app.use(function (req, res) {
    return res.sendStatus(404);
});

export default app;
