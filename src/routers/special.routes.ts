import { Router } from "express";
import passport from "passport";

const router = Router();



router.get('/inAll', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.send('success');
});

export default router;