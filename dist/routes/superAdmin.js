"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superAdmin_controller_1 = require("../controller/superAdmin.controller");
const superAdminRoute = express_1.default.Router();
superAdminRoute.post('/register', superAdmin_controller_1.register);
superAdminRoute.post('/login', superAdmin_controller_1.login);
exports.default = superAdminRoute;
