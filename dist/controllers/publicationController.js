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
exports.searchPublications = exports.userPublications = exports.createPublication = exports.listPublications = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const User_1 = __importDefault(require("../models/User"));
const listPublications = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortedPublications = yield Publication_1.default.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
        return res.status(200).json(sortedPublications);
    }
    catch (error) {
        return res.status(500).json("Error al obtener las publicaciones: " + error);
    }
});
exports.listPublications = listPublications;
const createPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new User_1.default(req.user);
    try {
        const newPublication = new Publication_1.default(req.body);
        newPublication.creator = user._id;
        yield newPublication.save();
        return res.send(newPublication);
    }
    catch (error) {
        return res.status(500).json("Error al guardar la publicación: " + error);
    }
});
exports.createPublication = createPublication;
const userPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        console.log(req.params);
        const user = yield User_1.default.find({ email: req.params.email });
        if (!user)
            return res.status(404).json("Usuario no encontrado");
        const publications = yield Publication_1.default.find({ creator: user[0]._id });
        return res.status(200).json(publications);
    }
    catch (error) {
        return res.status(500).json("Error al obtener las publicaciones: " + error);
    }
});
exports.userPublications = userPublications;
const searchPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        if (req.body.title)
            filter.title = { $regex: req.body.title, $options: "i" };
        if (req.body.difficulty)
            filter.difficulty = req.body.difficulty;
        if (req.body.materials)
            filter.materials = req.body.materials;
        if (req.body.tools)
            filter.tools = req.body.tools;
        const publications = yield Publication_1.default.find(filter);
        return res.status(200).json(publications);
    }
    catch (error) {
        return res.status(500).json("Error al obtener las publicaciones: " + error);
    }
});
exports.searchPublications = searchPublications;
