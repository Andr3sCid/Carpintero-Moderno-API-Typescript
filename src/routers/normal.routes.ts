import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/',(req, res)=>{
    res.send('success');
    console.log('Success');
});

export default router;