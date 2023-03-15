import express, { Request, Response } from 'express'
import { config } from 'dotenv'
config()
import morgan from 'morgan'
import colors from 'colors' //import colors from npm
import { port } from './config.js';
import router from './routes/index.js';
import { connectDatabase } from './services/mongoose.service.js';
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


app.listen(port, () => {
    console.log(`app is running on PORT ${port}`.yellow);
})

