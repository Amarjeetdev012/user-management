"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminKey = exports.superAdminSecretKey = exports.adminSecretKey = exports.userSecretKey = exports.mongoUrl = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT;
exports.mongoUrl = process.env.MONGO_URL;
exports.userSecretKey = process.env.JWT_SECRET_KEY_USER;
exports.adminSecretKey = process.env.JWT_SECRET_KEY_ADMIN;
exports.superAdminSecretKey = process.env.JWT_SECRET_KEY_SUPER_ADMIN;
exports.superAdminKey = process.env.SUPER_ADMIN_KEY;
