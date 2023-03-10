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
exports.findId = exports.delSuperAdmin = exports.create = exports.findEmail = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const superAdminSchema = new mongoose_1.default.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'superadmin'
    },
    key: {
        type: String,
    }
}, { timestamps: true });
const SuperAdmin = mongoose_1.default.model('superAdmin', superAdminSchema);
const findEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SuperAdmin.findOne({ email });
});
exports.findEmail = findEmail;
const create = (fname, lname, email, gender, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SuperAdmin.create({ fname: fname, lname: lname, email: email, gender: gender, password: password });
});
exports.create = create;
const delSuperAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SuperAdmin.findOneAndDelete({ email: email });
});
exports.delSuperAdmin = delSuperAdmin;
const findId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SuperAdmin.findById(id);
});
exports.findId = findId;
