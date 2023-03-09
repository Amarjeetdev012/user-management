import mongoose from 'mongoose'

export interface IUser {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const User = mongoose.model<IUser>('User', userSchema);