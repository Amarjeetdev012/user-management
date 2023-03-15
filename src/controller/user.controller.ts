import { Request, Response } from "express"
import { findId, IModel, update } from "../model/index.model"
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
        const token = req.token_data
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
