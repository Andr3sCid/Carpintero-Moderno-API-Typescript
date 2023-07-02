import { Router } from "express";
import {
    listPublications, 
    userPublications,
    searchPublications} from "../controllers/publicationController";

const router = Router();

router.get('/publication/listHomePage', listPublications);
router.get('/publication/listUser/:email', userPublications);
router.get('/publication/search', searchPublications);

export default router;