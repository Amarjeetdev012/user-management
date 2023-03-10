import mongoose from 'mongoose'

export interface IAdmin {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
    active: boolean;
}

const adminSchema = new mongoose.Schema<IAdmin>({
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

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export const findAdminId = async (id: string) => {
    return await Admin.findById(id)
}