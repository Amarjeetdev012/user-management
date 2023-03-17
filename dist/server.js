"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const colors_1 = __importDefault(require("colors"));
const logger_js_1 = require("./logger.js");
const config_js_1 = require("./config.js");
const mongoose_service_js_1 = require("./services/mongoose.service.js");
const app_1 = __importDefault(require("./app"));
colors_1.default.enable();
(0, mongoose_service_js_1.connectDatabase)();
app_1.default.listen(config_js_1.port, () => {
    console.log(`app is running on PORT ${config_js_1.port}`.yellow);
    logger_js_1.logger.info(`app is started`.green);
});
