import { Router } from "express";
//Métodos del controlador para los usuarios 
import { singIn,singUp } from "../controllers/userController";

//Métodos del controlador para las publicaciones
import { createPublication } from "../controllers/publicationController";

import passport from "passport";
const router= Router();

router.post('/singup', singUp);
router.post('/singin', singIn);

//Método para crear una publicacion
router.post('/publication/create', passport.authenticate('jwt', {session: false}),createPublication);

export default router;