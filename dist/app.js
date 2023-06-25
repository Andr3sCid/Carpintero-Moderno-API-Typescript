"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./routers/auth.routes"));
const special_routes_1 = __importDefault(require("./routers/special.routes"));
const normal_routes_1 = __importDefault(require("./routers/normal.routes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middleware/passport"));
const app = (0, express_1.default)();
//configurations
app.set('port', process.env.PORT || 8080);
// middleware
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//routes
app.get('/', (req, res) => {
    res.send('Stas dentro');
});
app.use(auth_routes_1.default);
app.use(special_routes_1.default);
app.use(normal_routes_1.default);
exports.default = app;
