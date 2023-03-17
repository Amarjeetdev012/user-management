"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyPass = async (password, hash) => {
    const data = await bcrypt_1.default.compare(password, hash);
    return data;
};
exports.verifyPass = verifyPass;
