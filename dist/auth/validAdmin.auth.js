"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAdminOrSuperAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const admin_model_1 = require("../model/admin.model");
const superAdmin_model_1 = require("../model/superAdmin.model");
const validAdminOrSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let decode;
    try {
        const data = req.get('authorization');
        if (data) {
            const auth = data.split(' ');
            if (auth[0] !== 'Bearer') {
                return res
                    .status(401)
                    .send({ status: false, message: 'invalid validation method' });
            }
            const secretKey = config_1.superAdminSecretKey || config_1.adminSecretKey;
            if (!secretKey) {
                throw new Error('Missing secret key');
            }
            jsonwebtoken_1.default.verify(auth[1], secretKey, function (err, decoded) {
                if (err) {
                    return res.status(401).send({ status: false, message: err.message });
                }
                decode = decoded;
            });
        }
        const checkId = yield (0, superAdmin_model_1.findId)(decode === null || decode === void 0 ? void 0 : decode._id);
        if (!checkId) {
            const verifyId = yield (0, admin_model_1.findAdminId)(decode === null || decode === void 0 ? void 0 : decode._id);
            if (!verifyId) {
                return res.status(401).send({ status: false, message: 'unauthorized person' });
            }
        }
        return next();
    }
    catch (err) {
        return res
            .status(403)
            .send({ status: false, message: 'error from valid admin or super admin' });
    }
});
exports.validAdminOrSuperAdmin = validAdminOrSuperAdmin;
