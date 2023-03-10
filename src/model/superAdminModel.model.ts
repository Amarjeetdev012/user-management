import mongoose from 'mongoose'

export interface ISuperAdmin {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
    active: boolean;
    role: string;
    key: string;
}

const superAdminSchema = new mongoose.Schema<ISuperAdmin>({
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
        default: true
    },
    role: {
        type: String,
        required: true,
        enum: ['superAdmin', 'admin', 'user']
    },
    key: {
        type: String,
    }
}, { timestamps: true })

const SuperAdmin = mongoose.model<ISuperAdmin>('superAdmin', superAdminSchema);

export const findEmail = async (email: string) => {
    return await SuperAdmin.findOne({ email })
}

export const create = async (fname: string, lname: string, email: string, gender: string, password: string, active: boolean, role: string) => {
    return await SuperAdmin.create({ fname: fname, lname: lname, email: email, gender: gender, password: password, active, role })
}

export const delSuperAdmin = async (email: string) => {
    return await SuperAdmin.findOneAndDelete({ email: email })
}