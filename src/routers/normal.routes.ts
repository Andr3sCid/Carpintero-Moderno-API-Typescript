import { Router } from "express";
import multer from 'multer';
import {
    listPublications, 
    userPublications,
    searchPublications,
    uploadImg,
    getImageById,
    getPublication} from "../controllers/publicationController";
import { createSteps, getSteps } from "../controllers/StepsController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get('/publication/listHomePage/', listPublications);
router.get('/publication/listUser/', userPublications);
router.get('/publication/search/', searchPublications);
router.get('/publication/get/', getPublication);
router.get('/img/upload/', upload.single('imagen'), uploadImg);
router.get('/img/get/', getImageById);

router.post('/step/create/', upload.single('image'), createSteps);
router.get('/step/get/', getSteps);

export default router;