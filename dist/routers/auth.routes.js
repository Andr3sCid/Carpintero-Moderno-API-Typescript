"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Métodos del controlador para los usuarios 
const userController_1 = require("../controllers/userController");
//Métodos del controlador para las publicaciones
const publicationController_1 = require("../controllers/publicationController");
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post('/signup/', userController_1.singUp);
router.post('/signin/', userController_1.singIn);
//Método para crear una publicacion
router.post('/publication/create/', upload.single('previewImage'), passport_1.default.authenticate('jwt', { session: false }), publicationController_1.createPublication);
exports.default = router;
