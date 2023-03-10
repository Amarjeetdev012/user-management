"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminKey = exports.jwtSecretKey = exports.mongoUrl = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT || 3000;
exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
exports.jwtSecretKey = process.env.JWT_SECRET_KEY || 'secret';
exports.superAdminKey = process.env.SUPER_ADMIN_KEY || 'secretkey';
