"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const morgan_1 = __importDefault(require("morgan"));
const colors_1 = __importDefault(require("colors"));
const logger_js_1 = require("./logger.js");
const config_js_1 = require("./config.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const mongoose_service_js_1 = require("./services/mongoose.service.js");
const mongoose_1 = require("mongoose");
const index_js_2 = require("./responseHandler/index.js");
colors_1.default.enable();
(0, mongoose_service_js_1.connectDatabase)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/', index_js_1.default);
// handle invalid URL paths
app.use(function (req, res) {
    return res.sendStatus(404);
});
const errorHandler = (error, req, res) => {
    if (error instanceof mongoose_1.MongooseError) {
        return index_js_2.responseHandler.handleMongoError(res, error);
    }
    return index_js_2.responseHandler.somethingWentWrong(res);
};
app.use(errorHandler);
app.listen(config_js_1.port, () => {
    console.log(`app is running on PORT ${config_js_1.port}`.yellow);
    logger_js_1.logger.info(`app is started`.green);
});
