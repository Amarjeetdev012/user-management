import { Request, Response } from "express"
import { active, allData, deactive, deleteId, findEmail, findId, IModel, update } from "../model/index.model"
import { isValidObjectId } from "mongoose"
import { responseHandler } from "../responseHandler"

export const getUserbyId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return responseHandler.notFound(res, `invalid id:${id}`)
        }
        const user = await findId(id)
        if (!user) {
            return responseHandler.notFound(res, `user not found`)
        }
        const userData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role
        }
        return responseHandler.successResponse(res, userData)
    } catch (err) {
        return responseHandler.serverError(res, `${(err as Error).message}`)
    }
}

export const updateById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body as IModel
        const validId = isValidObjectId(id)
        if (!validId) {
            return responseHandler.notFound(res, `invalid id : ${id}`)
        }
        const user = await findId(id)
        if (!user) {
            return responseHandler.notFound(res, `not found user: ${id}`)
        }
        const token = res.locals.tokenData
        let updateUserData
        if (token.role === 'superadmin') {
            if (user.role === 'superadmin') { return responseHandler.unauthorize(res, `${user.role} is unauthorized`) }
            updateUserData = await update(id, data)
        }
        if (token.role === 'admin') {
            if (user.role === 'superadmin') { return responseHandler.unauthorize(res, user.role) }
            if (user.role === 'admin' && token._id !== user._id.toString()) { return responseHandler.unauthorize(res, `${user.role} is unauthorized`) }
            updateUserData = await update(id, data)
        }
        if (token.role === 'user') {
            if (user.role === 'superadmin' || user.role === 'admin') { return responseHandler.unauthorize(res, `${user.role} is unauthorized`) }
            updateUserData = await update(id, data)
        }
        let saveData = {}
        if (updateUserData) {
            saveData = {
                fname: updateUserData.fname,
                lname: updateUserData.lname,
                email: updateUserData.lname,
                gender: updateUserData.gender,
                role: updateUserData.role
            }
        }
        return responseHandler.successResponse(res, saveData)
    } catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}


export const getAdmins = async (req: Request, res: Response) => {
    const admins = await allData('admin')
    const adminData = admins.map((admin: IModel) => {
        const saveData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role,
        }
        return saveData
    })
    return responseHandler.successResponse(res, adminData)
}

export const getUsers = async (req: Request, res: Response) => {
    const users = await allData('user')
    const userData = users.map((user) => {
        const saveData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role,
        }
        return saveData
    })
    return responseHandler.successResponse(res, userData)
}

export const getadminbyId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return responseHandler.notFound(res, `not valid id: ${id}`)
        }
        const admin = await findId(id)
        if (!admin) {
            return responseHandler.notFound(res, `admin not found`)
        }
        const adminData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role
        }
        return responseHandler.successResponse(res, adminData)
    } catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}


export const activateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return responseHandler.notFound(res, `user not found`)
        }
        const token = res.locals.tokenData
        if (token.role === 'superadmin') {
            if (user.role === 'superadmin') { return responseHandler.unauthorize(res, `unauthorized access ${user.role}`) }
            if (user.role === 'admin' || user.role === 'user') { await active(email) }
        }
        if (token.role === 'admin') {
            if (user.role === 'superadmin' || user.role === 'admin') { return responseHandler.unauthorize(res, `unauthorized access ${user.role}`) } else {
                await active(email)
            }
        }
        if (token.role === 'user') { return responseHandler.unauthorize(res, `unauthorized access ${token.role}`) }
        return responseHandler.successMessage(res, `${user.role} activated`)
    }
    catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}

export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as { email: string }
        const { email } = data
        const user = await findEmail(email)
        if (!user) {
            return responseHandler.notFound(res, `user not found`)
        }
        const decode = res.locals.tokenData
        if (decode.role === 'superadmin') {
            if (user.role === 'superadmin') { return responseHandler.unauthorize(res, `${user.role} is not authorized`) }
            if (user.role === 'admin' || user.role === 'user') { await deactive(email) }
        }
        if (decode.role === 'admin') {
            if (user.role === 'superadmin' || user.role === 'admin') { return responseHandler.unauthorize(res, `${user.role} is not authorized`) } else {
                await deactive(email)
            }
        }
        if (decode.role === 'user') { return responseHandler.unauthorize(res, `${decode.role} is not authorized`) }
        return responseHandler.successMessage(res, `${user.role} is deactivated`)
    } catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const validId = isValidObjectId(id)
        if (!validId) {
            return responseHandler.invalidRequest(res, `${validId}`)
        }
        const user = await findId(id)
        if (!user) {
            return responseHandler.notFound(res, `user not found or already deleted`)
        }
        const token = res.locals.tokenData
        if (user.role === 'superadmin') { return responseHandler.forbidden(res, `access denied`) }
        if (user.role === 'admin' && token.role === 'admin') {
            return responseHandler.forbidden(res, `access denied admin`)
        }
        deleteId(id)
        return responseHandler.successMessage(res, `${user.role} deleted successfully`)
    } catch (error) {
        return responseHandler.serverError(res, `${(error as Error).message}`)
    }
}

