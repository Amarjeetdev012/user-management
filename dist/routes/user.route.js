"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validAdmin_auth_1 = require("../auth/validAdmin.auth");
const user_controller_1 = require("../controller/user.controller");
const userAjv_helper_1 = require("../helper/userAjv.helper");
const ajv_middleware_1 = __importDefault(require("../middleware/ajv.middleware"));
const userRoute = express_1.default.Router();
userRoute.post('/register', (0, ajv_middleware_1.default)(userAjv_helper_1.registerSchema), user_controller_1.register);
userRoute.post('/login', (0, ajv_middleware_1.default)(userAjv_helper_1.loginSchema), user_controller_1.login);
userRoute.post('/activate', validAdmin_auth_1.validAdminOrSuperAdmin, user_controller_1.activateUser);
exports.default = userRoute;
