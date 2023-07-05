import { Router } from "express";
//Métodos del controlador para los usuarios 
import { singIn as signIn,singUp as signUp } from "../controllers/userController";

//Métodos del controlador para las publicaciones
import { createPublication } from "../controllers/publicationController";
import passport from "passport";
import multer from "multer";

const router= Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/signup/', signUp);
router.post('/signin/', signIn);

//Método para crear una publicacion
router.post('/publication/create/',upload.single('previewImage'), passport.authenticate('jwt', {session: false}),createPublication);

export default router;