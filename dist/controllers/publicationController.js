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
exports.getImageById = exports.uploadImg = exports.searchPublications = exports.userPublications = exports.getPublication = exports.createPublication = exports.listPublications = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const User_1 = __importDefault(require("../models/User"));
const ImageModel_1 = __importDefault(require("../models/ImageModel"));
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
        let imgId = "";
        if (req.file) {
            imgId = yield imageSave(req.file);
        }
        const newPublication = new Publication_1.default(req.body);
        newPublication.creator = user._id;
        newPublication.previewImage = req.hostname + ':' + req.socket.localPort + "/img/get/?id=" + imgId;
        yield newPublication.save();
        return res.send(newPublication._id);
    }
    catch (error) {
        return res.status(500).json("Error al guardar la publicación: " + error);
    }
});
exports.createPublication = createPublication;
const getPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publication = yield Publication_1.default.findById(req.query.id);
        return res.status(200).json(publication);
    }
    catch (error) {
        return res.status(500).json("Error al obtener la publicación: " + error);
    }
});
exports.getPublication = getPublication;
const userPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.email);
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
        if (req.query.title)
            filter.title = { $regex: req.query.title, $options: "i" };
        if (req.query.difficulty)
            filter.difficulty = req.query.difficulty;
        if (req.query.materials)
            filter.materials = req.query.materials;
        if (req.query.tools)
            filter.tools = req.query.tools;
        const publications = yield Publication_1.default.find(filter);
        return res.status(200).json(publications);
    }
    catch (error) {
        return res.status(500).json("Error al obtener las publicaciones: " + error);
    }
});
exports.searchPublications = searchPublications;
const uploadImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const imageFile = req.file;
            const image = new ImageModel_1.default({
                image: imageFile.buffer,
                name: imageFile.originalname
            });
            yield image.save();
            res.status(200).json({ message: 'Imagen guardada exitosamente' });
        }
        else {
            throw new Error('No se encontró ninguna imagen en la solicitud');
        }
    }
    catch (error) {
        console.error('Error al guardar la imagen:', error);
        res.status(500).json({ imagen: req.file });
    }
});
exports.uploadImg = uploadImg;
const getImageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield ImageModel_1.default.findById(req.query.id);
        if (!image) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'inline',
        });
        res.send(image.image);
    }
    catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la imagen' });
    }
});
exports.getImageById = getImageById;
function imageSave(img) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageFile = img;
        const image = new ImageModel_1.default({
            image: imageFile.buffer,
            name: imageFile.originalname
        });
        const imgId = (yield image.save())._id;
        return imgId;
    });
}
