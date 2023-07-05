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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentById = exports.saveImage = exports.savePublication = exports.saveUser = void 0;
const app_1 = require("firebase/app");
require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: "AIzaSyBuwtGdR05XkpurFf1jLA5NdpwqwFhnTWI",
    authDomain: "carpintero-moderno.firebaseapp.com",
    projectId: "carpintero-moderno",
    storageBucket: "carpintero-moderno.appspot.com",
    messagingSenderId: "149789382936",
    appId: "1:149789382936:web:d65f8c8b037de03dfe266d",
    measurementId: "G-V42G5P7PXB"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)();
const db = (0, firestore_1.getFirestore)(app);
const saveUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
});
exports.saveUser = saveUser;
const savePublication = (publicacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "publications"), {
            publication: {
                title: publicacion.title,
                steps: publicacion.steps,
            }
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
});
exports.savePublication = savePublication;
const saveImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crea una referencia única para la imagen en Firebase Storage
        const imageName = `${Date.now()}_${image.originalname}`;
        const storageRef = (0, storage_1.ref)(storage, imageName);
        // Sube la imagen a Firebase Storage
        yield (0, storage_1.uploadBytes)(storageRef, image.buffer);
        // Obtiene la URL de descarga de la imagen
        const downloadURL = yield (0, storage_1.getDownloadURL)(storageRef);
        // Guarda la URL en Firestore
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "images"), {
            imageUrl: downloadURL,
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
});
exports.saveImage = saveImage;
const getDocumentById = (collectionName, documentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentRef = (0, firestore_1.doc)(db, collectionName, documentId);
        const documentSnapshot = yield (0, firestore_1.getDoc)(documentRef);
        if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            console.log("Datos del documento:", documentData);
            return documentData;
        }
        else {
            console.log("El documento no existe");
            return null;
        }
    }
    catch (error) {
        console.error("Error al obtener el documento:", error);
        return null;
    }
});
exports.getDocumentById = getDocumentById;
