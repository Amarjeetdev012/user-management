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
exports.deleteAdminId = exports.update = exports.allAdmins = exports.create = exports.findAdminEmail = exports.findAdminId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
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
        default: 'admin'
    }
}, { timestamps: true });
const Admin = mongoose_1.default.model('Admin', adminSchema);
const findAdminId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admin.findById(id);
});
exports.findAdminId = findAdminId;
const findAdminEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admin.findOne({ email });
});
exports.findAdminEmail = findAdminEmail;
const create = (fname, lname, email, gender, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admin.create({ fname: fname, lname: lname, email: email, gender: gender, password: password });
});
exports.create = create;
const allAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admin.find();
});
exports.allAdmins = allAdmins;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admin.findByIdAndUpdate({ _id: id }, data, { new: true });
});
exports.update = update;
const deleteAdminId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Admin.findByIdAndDelete({ _id: id });
});
exports.deleteAdminId = deleteAdminId;
