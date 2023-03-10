import mongoose from 'mongoose'

export interface IUser {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
    active: boolean;
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
    },
    active: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const User = mongoose.model<IUser>('User', userSchema);

export const findEmail = async (email: string) => {
    return await User.findOne({ email })
}

export const create = async (fname: string, lname: string, email: string, gender: string, password: string) => {
    return await User.create({ fname: fname, lname: lname, email: email, gender: gender, password: password })
}

export const activeUser = async (email: string) => {
    return await User.findOneAndUpdate({ email: email }, { active: true }, { new: true })
}

