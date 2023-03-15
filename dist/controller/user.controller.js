"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.getUserbyId = void 0;
const index_model_1 = require("../model/index.model");
const mongoose_1 = require("mongoose");
const responseHandler_1 = require("../responseHandler");
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return responseHandler_1.responseHandler.notFound(res, `invalid id:${id}`);
        }
        const user = yield (0, index_model_1.findId)(id);
        if (!user) {
            return responseHandler_1.responseHandler.notFound(res, `user not found`);
        }
        const userData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role
        };
        return responseHandler_1.responseHandler.successResponse(res, userData);
    }
    catch (err) {
        return responseHandler_1.responseHandler.serverError(res, `${err.message}`);
    }
});
exports.getUserbyId = getUserbyId;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return responseHandler_1.responseHandler.notFound(res, `invalid id : ${id}`);
        }
        const user = yield (0, index_model_1.findId)(id);
        if (!user) {
            return responseHandler_1.responseHandler.notFound(res, `not found user: ${id}`);
        }
        const token = req.token_data;
        let updateUserData;
        if (token.role === 'superadmin') {
            if (user.role === 'superadmin') {
                return responseHandler_1.responseHandler.unauthorize(res, `${user.role} is unauthorized`);
            }
            updateUserData = yield (0, index_model_1.update)(id, data);
        }
        if (token.role === 'admin') {
            if (user.role === 'superadmin') {
                return responseHandler_1.responseHandler.unauthorize(res, user.role);
            }
            if (user.role === 'admin' && token._id !== user._id.toString()) {
                return responseHandler_1.responseHandler.unauthorize(res, `${user.role} is unauthorized`);
            }
            updateUserData = yield (0, index_model_1.update)(id, data);
        }
        if (token.role === 'user') {
            if (user.role === 'superadmin' || user.role === 'admin') {
                return responseHandler_1.responseHandler.unauthorize(res, `${user.role} is unauthorized`);
            }
            updateUserData = yield (0, index_model_1.update)(id, data);
        }
        let saveData = {};
        if (updateUserData) {
            saveData = {
                fname: updateUserData.fname,
                lname: updateUserData.lname,
                email: updateUserData.lname,
                gender: updateUserData.gender,
                role: updateUserData.role
            };
        }
        return responseHandler_1.responseHandler.successResponse(res, saveData);
    }
    catch (error) {
        return responseHandler_1.responseHandler.serverError(res, `${error.message}`);
    }
});
exports.updateById = updateById;
