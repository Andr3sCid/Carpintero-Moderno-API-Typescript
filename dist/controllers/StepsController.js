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
exports.getSteps = exports.createSteps = void 0;
const Step_1 = __importDefault(require("../models/Step"));
const ImageModel_1 = __importDefault(require("../models/ImageModel"));
const Publication_1 = __importDefault(require("../models/Publication"));
const createSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imgId = req.file ? yield imageSave(req.file) : '';
        const newStep = new Step_1.default(req.body);
        newStep.image = `${req.hostname}:${req.socket.localPort}/img/get/?id=${imgId}`;
        const publication = yield Publication_1.default.findById(newStep.idPublication);
        if (publication) {
            yield publication.updateOne({ $push: { steps: newStep } });
            return res.status(200).json({ msg: 'Publicación actualizada' });
        }
        return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    catch (error) {
        return res.status(500).json({ error: `Error al guardar el paso: ${error}` });
    }
});
exports.createSteps = createSteps;
const getSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const steps = yield Step_1.default.find({ idPublication: req.query.id });
        return res.status(200).json(steps);
    }
    catch (error) {
        return res.status(500).json("Error al obtener los pasos: " + error);
    }
});
exports.getSteps = getSteps;
function imageSave(img) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageFile = img;
        const image = new ImageModel_1.default({
            image: imageFile.buffer,
            name: imageFile.originalname,
        });
        const imgId = (yield image.save())._id;
        return imgId;
    });
}
