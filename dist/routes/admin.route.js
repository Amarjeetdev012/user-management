"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_auth_1 = require("../auth/index.auth");
const admin_controller_1 = require("../controller/admin.controller");
const ajv_helper_1 = require("../helper/ajv.helper");
const ajv_middleware_1 = __importDefault(require("../middleware/ajv.middleware"));
const adminRoute = express_1.default.Router();
adminRoute.post('/register', (0, ajv_middleware_1.default)(ajv_helper_1.registerSchema), index_auth_1.validSuperAdmin, index_auth_1.register);
adminRoute.post('/login', (0, ajv_middleware_1.default)(ajv_helper_1.loginSchema), index_auth_1.login);
adminRoute.get('/admins', index_auth_1.validSuperAdmin, admin_controller_1.getAdmins);
adminRoute.get('/:id', index_auth_1.validAdmin, admin_controller_1.getadminbyId);
adminRoute.patch('/:id', index_auth_1.validAdmin, admin_controller_1.updateAdminId);
adminRoute.delete('/:id', index_auth_1.validSuperAdmin, admin_controller_1.deleteAdmin);
exports.default = adminRoute;
