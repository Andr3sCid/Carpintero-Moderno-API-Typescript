"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.singUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../config/config"));
const Publication_1 = __importDefault(require("../models/Publication"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, userName: user.email }, config_1.default.jwtSecret);
}
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Sin datos" });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: "Usuario ya existente" });
    }
    const newUser = new User_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.singUp = singUp;
const singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Sin datos" });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: "Usuario no existe" });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (isMatch) {
        let userJson = {};
        userJson = user.toJSON();
        userJson.posts = (yield Publication_1.default.find({ creator: user._id })).length;
        return res.status(200).json({ userJson, token: createToken(user) });
    }
    return res.status(400).json({ msg: "Contraseña Incorrecta" });
});
exports.singIn = singIn;
