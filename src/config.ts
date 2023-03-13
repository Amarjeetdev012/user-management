import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT || 3000
export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const jwtSecretKey = process.env.JWT_SECRET_KEY || 'secret'
export const superAdminKey = process.env.SUPER_ADMIN_KEY || 'secretkey'