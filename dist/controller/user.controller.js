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
exports.deleteUser = exports.deactivateUser = exports.activateUser = exports.getadminbyId = exports.getUsers = exports.getAdmins = exports.updateById = exports.getUserbyId = void 0;
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
        const token = res.locals.tokenData;
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
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield (0, index_model_1.allData)('admin');
    const adminData = admins.map((admin) => {
        const saveData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role,
        };
        return saveData;
    });
    return responseHandler_1.responseHandler.successResponse(res, adminData);
});
exports.getAdmins = getAdmins;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, index_model_1.allData)('user');
    const userData = users.map((user) => {
        const saveData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role,
        };
        return saveData;
    });
    return responseHandler_1.responseHandler.successResponse(res, userData);
});
exports.getUsers = getUsers;
const getadminbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return responseHandler_1.responseHandler.notFound(res, `not valid id: ${id}`);
        }
        const admin = yield (0, index_model_1.findId)(id);
        if (!admin) {
            return responseHandler_1.responseHandler.notFound(res, `admin not found`);
        }
        const adminData = {
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            gender: admin.gender,
            role: admin.role
        };
        return responseHandler_1.responseHandler.successResponse(res, adminData);
    }
    catch (error) {
        return responseHandler_1.responseHandler.serverError(res, `${error.message}`);
    }
});
exports.getadminbyId = getadminbyId;
const activateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { email } = data;
        const user = yield (0, index_model_1.findEmail)(email);
        if (!user) {
            return responseHandler_1.responseHandler.notFound(res, `user not found`);
        }
        const token = res.locals.tokenData;
        if (token.role === 'superadmin') {
            if (user.role === 'superadmin') {
                return responseHandler_1.responseHandler.unauthorize(res, `unauthorized access ${user.role}`);
            }
            if (user.role === 'admin' || user.role === 'user') {
                yield (0, index_model_1.active)(email);
            }
        }
        if (token.role === 'admin') {
            if (user.role === 'superadmin' || user.role === 'admin') {
                return responseHandler_1.responseHandler.unauthorize(res, `unauthorized access ${user.role}`);
            }
            else {
                yield (0, index_model_1.active)(email);
            }
        }
        if (token.role === 'user') {
            return responseHandler_1.responseHandler.unauthorize(res, `unauthorized access ${token.role}`);
        }
        return responseHandler_1.responseHandler.successMessage(res, `${user.role} activated`);
    }
    catch (error) {
        return responseHandler_1.responseHandler.serverError(res, `${error.message}`);
    }
});
exports.activateUser = activateUser;
const deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { email } = data;
        const user = yield (0, index_model_1.findEmail)(email);
        if (!user) {
            return responseHandler_1.responseHandler.notFound(res, `user not found`);
        }
        const decode = res.locals.tokenData;
        if (decode.role === 'superadmin') {
            if (user.role === 'superadmin') {
                return responseHandler_1.responseHandler.unauthorize(res, `${user.role} is not authorized`);
            }
            if (user.role === 'admin' || user.role === 'user') {
                yield (0, index_model_1.deactive)(email);
            }
        }
        if (decode.role === 'admin') {
            if (user.role === 'superadmin' || user.role === 'admin') {
                return responseHandler_1.responseHandler.unauthorize(res, `${user.role} is not authorized`);
            }
            else {
                yield (0, index_model_1.deactive)(email);
            }
        }
        if (decode.role === 'user') {
            return responseHandler_1.responseHandler.unauthorize(res, `${decode.role} is not authorized`);
        }
        return responseHandler_1.responseHandler.successMessage(res, `${user.role} is deactivated`);
    }
    catch (error) {
        return responseHandler_1.responseHandler.serverError(res, `${error.message}`);
    }
});
exports.deactivateUser = deactivateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return responseHandler_1.responseHandler.invalidRequest(res, `${validId}`);
        }
        const user = yield (0, index_model_1.findId)(id);
        if (!user) {
            return responseHandler_1.responseHandler.notFound(res, `user not found or already deleted`);
        }
        const token = res.locals.tokenData;
        if (user.role === 'superadmin') {
            return responseHandler_1.responseHandler.forbidden(res, `access denied`);
        }
        if (user.role === 'admin' && token.role === 'admin') {
            return responseHandler_1.responseHandler.forbidden(res, `access denied admin`);
        }
        (0, index_model_1.deleteId)(id);
        return responseHandler_1.responseHandler.successMessage(res, `${user.role} deleted successfully`);
    }
    catch (error) {
        return responseHandler_1.responseHandler.serverError(res, `${error.message}`);
    }
});
exports.deleteUser = deleteUser;
