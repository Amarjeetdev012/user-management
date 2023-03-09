"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const connectDatabase = () => {
    console.log('mongodb is connecting...');
    mongoose_1.default.connect(config_1.mongoUrl)
        .then(() => {
        console.log('mongodb is connected');
    }).catch((e) => {
        console.log(e);
    });
};
exports.connectDatabase = connectDatabase;
