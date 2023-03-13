"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_auth_1 = require("../auth/index.auth");
const admin_controller_1 = require("../controller/admin.controller");
const user_controller_1 = require("../controller/user.controller");
const adminRoute = express_1.default.Router();
adminRoute.get('/', index_auth_1.validSuperAdmin, admin_controller_1.getAdmins);
adminRoute.get('/users', index_auth_1.validAdminOrSuperAdmin, user_controller_1.getUsers);
adminRoute.get('/:id', index_auth_1.validAdmin, admin_controller_1.getadminbyId);
adminRoute.patch('/active', index_auth_1.validAdminOrSuperAdmin, user_controller_1.activateUser);
adminRoute.patch('/deactive', index_auth_1.validAdminOrSuperAdmin, user_controller_1.deactivateUser);
adminRoute.patch('/:id', index_auth_1.validAdmin, admin_controller_1.updateAdminId);
adminRoute.delete('/:id', index_auth_1.validAdminOrSuperAdmin, user_controller_1.deleteUser);
adminRoute.delete('/:id', index_auth_1.validSuperAdmin, admin_controller_1.deleteAdmin);
exports.default = adminRoute;
