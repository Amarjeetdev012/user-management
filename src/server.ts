import express, { Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'

import { port } from './config.js';
import router from './routes/index.js';
import { connectDatabase } from './services/mongoose.service.js';

connectDatabase()

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => {
    res.render('index')
})
app.use('/', router)


app.listen(port, () => {
    console.log(`app is running on PORT ${port}`);
})

