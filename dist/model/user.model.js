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
exports.deleteUserId = exports.update = exports.findUserId = exports.allUser = exports.activeUser = exports.create = exports.findEmail = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
const findEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findOne({ email });
});
exports.findEmail = findEmail;
const create = (fname, lname, email, gender, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.create({ fname: fname, lname: lname, email: email, gender: gender, password: password });
});
exports.create = create;
const activeUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findOneAndUpdate({ email: email }, { active: true }, { new: true });
});
exports.activeUser = activeUser;
const allUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.find();
});
exports.allUser = allUser;
const findUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findById(id);
});
exports.findUserId = findUserId;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findByIdAndUpdate({ _id: id }, data, { new: true });
});
exports.update = update;
const deleteUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findByIdAndDelete({ _id: id });
});
exports.deleteUserId = deleteUserId;
