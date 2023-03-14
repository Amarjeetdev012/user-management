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
exports.updateUserId = exports.getUserbyId = void 0;
const index_model_1 = require("../model/index.model");
const mongoose_1 = require("mongoose");
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id' });
        }
        const user = yield (0, index_model_1.findId)(id);
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
        const user = yield (0, index_model_1.findId)(id);
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' });
        }
        const updateUser = yield (0, index_model_1.update)(id, data);
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
