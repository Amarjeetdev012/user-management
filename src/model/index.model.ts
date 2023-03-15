import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IModel {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
    active: boolean;
    role: string;
    key?: string
}

const userSchema = new mongoose.Schema<IModel>({
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
    role: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Model = mongoose.model<IModel>('Role', userSchema);

export const findEmail = async (email: string) => {
    return await Model.findOne({ email: email })
}

export const create = async (fname: string, lname: string, email: string, gender: string, password: string, role: string, active?: boolean) => {
    return await Model.create({ fname: fname, lname: lname, email: email, gender: gender, password: password, role, active })
}

export const active = async (email: string) => {
    return await Model.findOneAndUpdate({ email: email }, { active: true }, { new: true })
}

export const deactive = async (email: string) => {
    return await Model.findOneAndUpdate({ email: email }, { active: false }, { new: true })
}

export const allData = async (role: string) => {
    return await Model.find({ role: role })
}

export const findId = async (id: string) => {
    return await Model.findById(id)
}

export const update = async (id: string, data: object) => {
    return await Model.findByIdAndUpdate({ _id: id }, data, { new: true })
}

export const deleteId = async (id: string) => {
    return await Model.findByIdAndDelete({ _id: id })
}