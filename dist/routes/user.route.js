"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_auth_1 = require("../auth/index.auth");
const admin_controller_1 = require("../controller/admin.controller");
const user_controller_1 = require("../controller/user.controller");
const ajv_helper_1 = require("../helper/ajv.helper");
const ajv_middleware_1 = __importDefault(require("../middleware/ajv.middleware"));
const userRoute = express_1.default.Router();
userRoute.get('/', index_auth_1.validAdminOrSuperAdmin, admin_controller_1.getUsers);
userRoute.get('/admin', index_auth_1.validSuperAdmin, admin_controller_1.getAdmins);
userRoute.get('/admin/:id', index_auth_1.validAdmin, admin_controller_1.getadminbyId);
userRoute.get('/:id', index_auth_1.validUser, user_controller_1.getUserbyId);
userRoute.patch('/active', index_auth_1.validAdminOrSuperAdmin, admin_controller_1.activateUser);
userRoute.patch('/deactive', index_auth_1.validAdminOrSuperAdmin, admin_controller_1.deactivateUser);
userRoute.patch('/:id', index_auth_1.validUser, (0, ajv_middleware_1.default)(ajv_helper_1.updateSchema), user_controller_1.updateById);
userRoute.delete('/:id', index_auth_1.validAdminOrSuperAdmin, admin_controller_1.deleteUser);
exports.default = userRoute;
