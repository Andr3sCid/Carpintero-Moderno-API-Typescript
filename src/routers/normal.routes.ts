import { Router } from "express";
import {listPublications} from "../controllers/publicationController";
import passport from "passport";

const router = Router();

router.get('/publication/listHomePage', listPublications);

export default router;