import { Router } from "express";
//Métodos del controlador para los usuarios 
import { singIn as signIn,singUp as signUp } from "../controllers/userController";

//Métodos del controlador para las publicaciones
import { createPublication } from "../controllers/publicationController";

import passport from "passport";
const router= Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

//Método para crear una publicacion
router.post('/publication/create', passport.authenticate('jwt', {session: false}),createPublication);

export default router;