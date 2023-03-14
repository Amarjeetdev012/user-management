import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidateFunction } from 'ajv';

function validateSchema(ajv: ValidateFunction<AnySchema>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv(req.body);
    if (!valid) {
      const error = ajv.errors;
      if (error && error[0].params.allowedValues) {
        return res.status(400).send(`${error[0].message} ${error[0].params.allowedValues}`);
      }
      return res.status(400).send(error && error[0].message);
    }
    next();
  };
}

export default validateSchema;
