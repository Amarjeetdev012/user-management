import rateLimit from 'express-rate-limit' 

export const limiter = rateLimit({max:5,windowMs:10000})