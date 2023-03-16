import express, { ErrorRequestHandler, Request, Response } from 'express'
import { MongoServerError } from 'mongodb';
import { config } from 'dotenv'
config()
import morgan from 'morgan'
import colors from 'colors'
import { logger } from './logger.js'
import { port } from './config.js';
import router from './routes/index.js';
import { connectDatabase } from './services/mongoose.service.js';
import { MongooseError } from 'mongoose';
import { responseHandler } from './responseHandler/index.js';

colors.enable();
connectDatabase()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => {
    res.render('index')
})
app.use('/', router)

// handle invalid URL paths
app.use(function (req, res) {
    return res.sendStatus(404);
  });

const errorHandler: ErrorRequestHandler = (error, req, res) => {
    if (error instanceof MongooseError) {
        return responseHandler.handleMongoError(res, error);
    }
    return responseHandler.somethingWentWrong(res);
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app is running on PORT ${port}`.yellow);
    logger.info(`app is started`.green)
})

