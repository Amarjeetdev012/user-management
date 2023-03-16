import express, { Request, Response } from 'express'
import { config } from 'dotenv'
config()
import morgan from 'morgan'
import colors from 'colors'
import { logger } from './logger.js'
import { port } from './config.js';
import router from './routes/index.js';
import { connectDatabase } from './services/mongoose.service.js';

colors.enable();

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

// handle invalid URL paths
app.use(function (req, res) {
    return res.sendStatus(404);
});

connectDatabase()

app.listen(port, () => {
    console.log(`app is running on PORT ${port}`.yellow);
    logger.info(`app is started`.green)
})

