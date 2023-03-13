import mongoose from 'mongoose'

export interface IAdmin {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
    active: boolean;
    role: string;
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
        default: true
    },
    role: {
        type: String,
        default: 'admin'
    }
}, { timestamps: true })

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export const findAdminId = async (id: string) => {
    return await Admin.findById(id)
}

export const findEmail = async (email: string) => {
    return await Admin.findOne({ email })
}

export const create = async (fname: string, lname: string, email: string, gender: string, password: string) => {
    return await Admin.create({ fname: fname, lname: lname, email: email, gender: gender, password: password })
}

export const allAdmins = async() =>{
    return await Admin.find()
}

export const update = async (id: string, data: object) => {
    return await Admin.findByIdAndUpdate({ _id: id }, data, { new: true })
}

export const deleteAdminId = async(id:string)=>{
    return await Admin.findByIdAndDelete({_id:id})
}