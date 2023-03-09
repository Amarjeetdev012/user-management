import express, { Request, Response } from 'express'
import { port } from './config.js';
import path from 'path'
import router from './routes/index.js';
import morgan from 'morgan'
import { connectDatabase } from './services/mongoose.service.js';
const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use('/', router)
app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
    res.render('index')
})
connectDatabase()
app.listen(port, () => {
    console.log(`app is running on PORT ${port}`);
})

