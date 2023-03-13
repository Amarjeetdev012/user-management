"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_auth_1 = require("../auth/index.auth");
const user_controller_1 = require("../controller/user.controller");
const userRoute = express_1.default.Router();
userRoute.get('/:id', index_auth_1.validUser, user_controller_1.getUserbyId);
userRoute.patch('/:id', index_auth_1.validUser, user_controller_1.updateUserId);
exports.default = userRoute;
