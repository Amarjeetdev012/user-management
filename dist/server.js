"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./config.js");
const path_1 = __importDefault(require("path"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_service_js_1 = require("./services/mongoose.service.js");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', index_js_1.default);
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/addUser', (req, res) => {
    res.render('addUser');
});
(0, mongoose_service_js_1.connectDatabase)();
app.listen(config_js_1.port, () => {
    console.log(`app is running on PORT ${config_js_1.port}`);
});
