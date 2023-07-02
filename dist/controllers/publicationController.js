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
exports.createPublication = exports.listPublications = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const User_1 = __importDefault(require("../models/User"));
const listPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortedPublications = yield Publication_1.default.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
        return res.status(200).json(sortedPublications);
    }
    catch (error) {
        return res.status(500).json('Error al obtener las publicaciones: ' + error);
    }
});
exports.listPublications = listPublications;
const createPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new User_1.default(req.user);
    try {
        const newPublication = new Publication_1.default(req.body);
        newPublication.creator = user._id;
        yield newPublication.save().catch((function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('meow');
            }
        }));
        return res.send(newPublication);
    }
    catch (error) {
        return res.status(500).json('Error al guardar la publicación: ' + error);
    }
});
exports.createPublication = createPublication;
