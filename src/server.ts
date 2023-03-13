import express from 'express'
import { port } from './config.js';
import router from './routes/index.js';
import morgan from 'morgan'
import { connectDatabase } from './services/mongoose.service.js';

connectDatabase()
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

app.listen(port, () => {
    console.log(`app is running on PORT ${port}`);
})

