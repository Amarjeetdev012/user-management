"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            enum: ["male", "female"],
        },
        password: { type: 'string' },
    },
    required: ['fname', 'lname', 'email', 'gender', 'password'],
    additionalProperties: false,
};
const registerSchema = ajv.compile(schemaRegister);
exports.default = registerSchema;
