import {Request,Response} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';
import config from "./../config/config";
import Publication from '../models/Publication';


function createToken(user: IUser){
    return jwt.sign({id:user.id, userName: user.email}, config.jwtSecret);
}

export const singUp = async (req: Request, res: Response)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg:"Sin datos"});
    }

    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({msg:"Usuario ya existente"});
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}

export const singIn = async (req: Request, res: Response)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg:"Sin datos"});
    }
    const foundedUser = await User.findOne({email: req.body.email});
    if(!foundedUser){
        return res.status(400).json({msg:"Usuario no existe"});
    }

    const isMatch = await foundedUser.comparePassword(req.body.password);
    if(isMatch){
        let user:any = {};
        user = foundedUser.toJSON();
        user.posts = (await Publication.find({ creator: foundedUser._id })).length;
        return res.status(200).json({user, token: createToken(foundedUser)})
    }
    return res.status(400).json({msg: "Contraseña Incorrecta"})
}