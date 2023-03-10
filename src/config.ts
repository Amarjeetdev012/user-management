import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const mongoUrl = process.env.MONGO_URL
export const userSecretKey = process.env.JWT_SECRET_KEY_USER
export const adminSecretKey = process.env.JWT_SECRET_KEY_ADMIN
export const superAdminSecretKey = process.env.JWT_SECRET_KEY_SUPER_ADMIN
export const superAdminKey = process.env.SUPER_ADMIN_KEY