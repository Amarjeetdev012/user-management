"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const ajv_helper_1 = __importDefault(require("../helper/ajv.helper"));
const ajv_middleware_1 = __importDefault(require("../middleware/ajv.middleware"));
const userRoute = express_1.default.Router();
userRoute.post('/register', (0, ajv_middleware_1.default)(ajv_helper_1.default), user_controller_1.register);
exports.default = userRoute;
