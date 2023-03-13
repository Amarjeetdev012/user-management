"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const admin_route_1 = __importDefault(require("./admin.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const router = express_1.default.Router();
router.use('/user', user_route_1.default);
router.use('/admin', admin_route_1.default);
router.use('/auth', auth_route_1.default);
exports.default = router;
