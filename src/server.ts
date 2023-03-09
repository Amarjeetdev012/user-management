import express, { urlencoded } from 'express'
import { port } from './config.js';
import router from './routes/index.js';
import { connectDatabase } from './services/mongoose.service.js';
const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.use('/', router)
connectDatabase()
app.listen(port, () => {
    console.log(`app is running on PORT ${port}`);
})

