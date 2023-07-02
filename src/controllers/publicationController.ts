import {Request, Response} from 'express';
import Publication from '../models/Publication';
import jwt from 'jsonwebtoken';
import User from "../models/User";

export const listPublications = async (req: Request, res: Response) => {
  try {
    const sortedPublications = await Publication.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();

    return res.status(200).json(sortedPublications);
  } catch (error) {
    return res.status(500).json('Error al obtener las publicaciones: ' + error);
  }
};

export const  createPublication = async (req: Request, res: Response)=>{
  let user = new User(req.user!);
  try {
    const newPublication = new Publication(req.body);
    newPublication.creator = user._id;
    await newPublication.save().catch((function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('meow');
      }
    }));
    return res.send(newPublication);
  } catch (error) {
    return res.status(500).json('Error al guardar la publicación: '+error);
  }
}
