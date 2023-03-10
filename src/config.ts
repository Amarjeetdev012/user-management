import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const mongoUrl = process.env.MONGO_URL
export const jwtSecretKey = process.env.JWT_SECRET_KEY
export const superAdminKey = process.env.SUPER_ADMIN_KEY