import { Request, Response } from "express";
import Publication from "../models/Publication";
import User from "../models/User";

export const listPublications = async (_req: Request, res: Response) => {
  try {
    const sortedPublications = await Publication.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    return res.status(200).json(sortedPublications);
  } catch (error) {
    return res.status(500).json("Error al obtener las publicaciones: " + error);
  }
};



export const createPublication = async (req: Request, res: Response) => {
  let user = new User(req.user!);
  try {
    const newPublication = new Publication(req.body);
    newPublication.creator = user._id;
    await newPublication.save();
    return res.send(newPublication);
  } catch (error) {
    return res.status(500).json("Error al guardar la publicación: " + error);
  }
};

export const userPublications = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    console.log(req.params);
    const user = await User.find({ email: req.params.email });
    if (!user) return res.status(404).json("Usuario no encontrado");
    const publications = await Publication.find({ creator: user[0]._id });
    return res.status(200).json(publications);
  } catch (error) {
    return res.status(500).json("Error al obtener las publicaciones: " + error);
  }
};

export const searchPublications = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.body.title) filter.title = { $regex: req.body.title, $options: "i" };
    if (req.body.difficulty) filter.difficulty = req.body.difficulty;
    if (req.body.materials) filter.materials = req.body.materials ;
    if (req.body.tools) filter.tools =  req.body.tools ;
    const publications = await Publication.find(filter);
    return res.status(200).json(publications);
  } catch (error) {
    return res.status(500).json("Error al obtener las publicaciones: " + error);
  }
};


