"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validAdmin_auth_1 = require("../auth/validAdmin.auth");
const validSuperAdmin_auth_1 = require("../auth/validSuperAdmin.auth");
const admin_controller_1 = require("../controller/admin.controller");
const ajv_helper_1 = require("../helper/ajv.helper");
const ajv_middleware_1 = __importDefault(require("../middleware/ajv.middleware"));
const adminRoute = express_1.default.Router();
adminRoute.post('/register', (0, ajv_middleware_1.default)(ajv_helper_1.registerSchema), validSuperAdmin_auth_1.validSuperAdmin, admin_controller_1.register);
adminRoute.post('/login', (0, ajv_middleware_1.default)(ajv_helper_1.loginSchema), admin_controller_1.login);
adminRoute.get('/admins', validSuperAdmin_auth_1.validSuperAdmin, admin_controller_1.getAdmins);
adminRoute.get('/:id', validAdmin_auth_1.validAdmin, admin_controller_1.getadminbyId);
adminRoute.patch('/:id', validAdmin_auth_1.validAdmin, admin_controller_1.updateAdminId);
adminRoute.delete('/:id', validSuperAdmin_auth_1.validSuperAdmin, admin_controller_1.deleteAdmin);
exports.default = adminRoute;
