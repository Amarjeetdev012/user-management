"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
(0, ajv_formats_1.default)(ajv);
const schemaRegister = {
    type: 'object',
    properties: {
        fname: { type: 'string' },
        lname: { type: 'string' },
        email: { type: 'string', format: 'email' },
        gender: {
            enum: ['male', 'female'],
        },
        password: { type: 'string' },
        key: { type: 'string' },
        role: { enum: ['user', 'admin', 'superadmin'], }
    },
    required: ['fname', 'lname', 'email', 'gender', 'password', 'role'],
    additionalProperties: false,
};
const schemaLogin = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
    additionalProperties: false,
};
exports.registerSchema = ajv.compile(schemaRegister);
exports.loginSchema = ajv.compile(schemaLogin);
