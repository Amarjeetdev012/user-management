"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superAdmin_controller_1 = require("../controller/superAdmin.controller");
const superAdminAjv_helper_1 = require("../helper/superAdminAjv.helper");
const ajv_middleware_1 = __importDefault(require("../middleware/ajv.middleware"));
const superAdminRoute = express_1.default.Router();
superAdminRoute.post('/register', (0, ajv_middleware_1.default)(superAdminAjv_helper_1.registerSchema), superAdmin_controller_1.register);
superAdminRoute.post('/login', (0, ajv_middleware_1.default)(superAdminAjv_helper_1.loginSchema), superAdmin_controller_1.login);
exports.default = superAdminRoute;
