import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
addFormats(ajv);

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
    required: ['fname', 'lname', 'email', 'gender', 'password','role'],
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

export const registerSchema = ajv.compile(schemaRegister);
export const loginSchema = ajv.compile(schemaLogin);