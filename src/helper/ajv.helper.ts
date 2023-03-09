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
            enum: ["male", "female"],
        },
        password: { type: 'string' },
    },
    required: ['fname', 'lname', 'email', 'gender', 'password'],
    additionalProperties: false,
};


const registerSchema = ajv.compile(schemaRegister);

export default registerSchema;