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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserId = exports.getUserbyId = exports.getUsers = exports.activateUser = exports.login = exports.register = void 0;
const user_model_1 = require("../model/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_middleware_1 = require("../middleware/validator.middleware");
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    const { fname, lname, email, gender, password } = data;
    const user = yield (0, user_model_1.findEmail)(email);
    if (user) {
        return res.status(404).send({ status: false, message: `user already exists on this email ${email}` });
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const saveData = yield (0, user_model_1.create)(fname, lname, email, gender, hashPassword);
    const userData = {
        fname: saveData.fname,
        lname: saveData.lname,
        email: saveData.email,
        gender: saveData.gender,
    };
    res.status(201).send({ status: true, message: 'user created', data: userData });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        const { email, password } = data;
        const user = yield (0, user_model_1.findEmail)(email);
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not registered' });
        }
        if (user.active === false) {
            return res.status(403).send({ status: false, message: 'you have not access contact to admin' });
        }
        const verifyPassword = (0, validator_middleware_1.verifyPass)(password, user.password);
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.jwtSecretKey);
        if (token) {
            return res.status(200).send({ status: true, message: 'login succesfully', token: token });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.login = login;
const activateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        const { email } = data;
        const user = yield (0, user_model_1.findEmail)(email);
        if (!user) {
            return res.status(404).send({ status: false, message: 'no user found' });
        }
        const updateUser = yield (0, user_model_1.activeUser)(email);
        const userData = {
            fname: updateUser === null || updateUser === void 0 ? void 0 : updateUser.fname,
            lname: updateUser === null || updateUser === void 0 ? void 0 : updateUser.lname,
            email: updateUser === null || updateUser === void 0 ? void 0 : updateUser.email,
            gender: updateUser === null || updateUser === void 0 ? void 0 : updateUser.gender
        };
        return res.status(200).send({ status: true, message: 'user activated', data: userData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.activateUser = activateUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_model_1.allUser)();
    let saveData;
    const userData = users.map((user) => {
        return saveData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender
        };
    });
    res.status(200).send({ status: true, message: 'all user data', data: userData });
});
exports.getUsers = getUsers;
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' });
        }
        const user = yield (0, user_model_1.findUserId)(id);
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' });
        }
        const userData = {
            fname: user === null || user === void 0 ? void 0 : user.fname,
            lname: user === null || user === void 0 ? void 0 : user.lname,
            email: user === null || user === void 0 ? void 0 : user.email,
            gender: user === null || user === void 0 ? void 0 : user.gender
        };
        res.status(200).send({ status: true, message: 'user data', data: userData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.getUserbyId = getUserbyId;
const updateUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' });
        }
        const user = yield (0, user_model_1.findUserId)(id);
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' });
        }
        const updateUser = yield (0, user_model_1.update)(id, data);
        const userData = {
            fname: updateUser === null || updateUser === void 0 ? void 0 : updateUser.fname,
            lname: updateUser === null || updateUser === void 0 ? void 0 : updateUser.lname,
            email: updateUser === null || updateUser === void 0 ? void 0 : updateUser.email,
            gender: updateUser === null || updateUser === void 0 ? void 0 : updateUser.gender
        };
        res.status(200).send({ status: true, message: 'user updated', data: userData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.updateUserId = updateUserId;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' });
        }
        const user = yield (0, user_model_1.findUserId)(id);
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found or already deleted' });
        }
        const deleteUser = (0, user_model_1.deleteUserId)(id);
        console.log('deleteUser', deleteUser);
        res.status(204).send({ status: true, message: 'file deleted successfully' });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.deleteUser = deleteUser;
