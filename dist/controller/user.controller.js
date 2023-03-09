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
exports.register = void 0;
const user_model_1 = require("../model/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    const { fname, lname, email, gender, password } = data;
    const user = yield user_model_1.User.findOne({ email });
    if (user) {
        return res.status(404).send({ status: false, message: `user already exists on this email ${email}` });
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const saveData = yield user_model_1.User.create({ fname: fname, lname: lname, email: email, gender: gender, password: hashPassword });
    res.status(201).send({ status: true, message: 'user created', data: saveData });
});
exports.register = register;