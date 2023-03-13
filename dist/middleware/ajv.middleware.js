"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateSchema(ajv) {
    return (req, res, next) => {
        const valid = ajv(req.body);
        if (!valid) {
            const error = ajv.errors;
            if (error[0].params.allowedValues) {
                return res.status(400).send(`${error[0].message} ${error[0].params.allowedValues} in gender`);
            }
            return res.status(400).send(error[0].message);
        }
        next();
    };
}
exports.default = validateSchema;
