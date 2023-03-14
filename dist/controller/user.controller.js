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
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validId = (0, mongoose_1.isValidObjectId)(id);
        if (!validId) {
            return res.status(400).send({ status: false, message: 'invalid object id ID' });
        }
        const user = yield (0, index_model_1.findId)(id);
        if (!user) {
            return res.status(404).send({ status: false, message: 'user not found' });
        }
        const userData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            gender: user.gender,
            role: user.role
        };
        res.status(200).send({ status: true, message: 'user data', data: userData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.getUserbyId = getUserbyId;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const decode = req.token_data;
        if (user.role === 'superadmin') {
            return res.status(400).send({ status: false, message: 'access denied' });
        }
        if (user.role === 'admin') {
            if (decode._id !== user._id) {
                return res.status(401).send({ status: false, message: 'access denied' });
            }
            yield (0, index_model_1.update)(id, data);
        }
        if (user.role === 'user') {
            yield (0, index_model_1.update)(id, data);
        }
        res.status(200).send({ status: true, message: 'user updated' });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.updateById = updateById;
