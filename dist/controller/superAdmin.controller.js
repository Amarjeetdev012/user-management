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
exports.deleteSuperAdmin = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const superAdmin_model_1 = require("../model/superAdmin.model");
const config_1 = require("../config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        const { fname, lname, email, gender, password, key } = data;
        if (key !== config_1.superAdminKey) {
            return res.status(401).send({ status: false, message: 'wrong superAdminKey' });
        }
        const superAdmin = yield (0, superAdmin_model_1.findEmail)(email);
        if (superAdmin) {
            return res.status(404).send({ status: false, message: `superAdmin already exists on this email ${email}` });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const saveData = yield (0, superAdmin_model_1.create)(fname, lname, email, gender, hashPassword);
        res.status(201).send({ status: true, message: 'superAdmin created', data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        const { email, password } = data;
        const superAdmin = yield (0, superAdmin_model_1.findEmail)(email);
        if (!superAdmin) {
            return res.status(404).send({ status: false, message: 'user not registered' });
        }
        const verifyPassword = yield bcrypt_1.default.compare(password, superAdmin.password);
        if (!verifyPassword) {
            return res.status(401).send({ status: false, message: 'wrong password' });
        }
        console.log('superAdmin', superAdmin.role);
        const token = jsonwebtoken_1.default.sign({ _id: superAdmin._id, role: superAdmin.role }, config_1.jwtSecretKey);
        if (token) {
            return res.status(200).send({ status: true, message: 'login successfully', token: token });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.login = login;
const deleteSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { email, key } = data;
        if (key !== config_1.jwtSecretKey) {
            return res.status(401).send({ status: false, message: 'wrong superAdminKey' });
        }
        const superAdmin = yield (0, superAdmin_model_1.findEmail)(email);
        if (!superAdmin) {
            return res.status(404).send({ status: false, message: 'no super admin found' });
        }
        (0, superAdmin_model_1.delSuperAdmin)(email);
        res.status(204).send({ status: true, message: 'super admin deleted successfully' });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.deleteSuperAdmin = deleteSuperAdmin;
