"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminKey = exports.jwtSecretKey = exports.mongoUrl = exports.redisPort = exports.port = void 0;
exports.port = process.env.PORT || 3000;
exports.redisPort = 5000;
exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
exports.jwtSecretKey = process.env.JWT_SECRET_KEY || 'secret';
exports.superAdminKey = process.env.SUPER_ADMIN_KEY || 'secretkey';
