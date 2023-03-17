import { config } from 'dotenv'
config()
import colors from 'colors'
import { logger } from './logger.js'
import { port } from './config.js';
import { connectDatabase } from './services/mongoose.service.js';
import app from './app'

colors.enable();

connectDatabase()

app.listen(port, () => {
    console.log(`app is running on PORT ${port}`.yellow);
    logger.info(`app is started`.green)
})

