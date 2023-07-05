import { Request, Response } from "express";
import Publication from "../models/Publication";
import User from "../models/User";
import ImageModel from "../models/ImageModel";

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
    let imgId = "";
    if(req.file){
      imgId = await imageSave(req.file);  
    }
    const newPublication = new Publication(req.body);
    newPublication.creator = user._id;
    newPublication.previewImage = req.hostname+':'+req.socket.localPort+"/img/get/?id="+imgId;
    await newPublication.save();
    return res.send(newPublication._id);
  } catch (error) {
    return res.status(500).json("Error al guardar la publicación: " + error);
  }
};

export const getPublication = async (req: Request, res: Response) => {
  try {
    const publication = await Publication.findById(req.query.id);
    return res.status(200).json(publication);
  } catch (error) {
    return res.status(500).json("Error al obtener la publicación: " + error);
  }
} 

export const userPublications = async (req: Request, res: Response) => {
  console.log(req.params.email);
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
    if (req.query.title) filter.title = { $regex: req.query.title, $options: "i" };
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.materials) filter.materials = req.query.materials ;
    if (req.query.tools) filter.tools =  req.query.tools ;
    const publications = await Publication.find(filter);
    return res.status(200).json(publications);
  } catch (error) {
    return res.status(500).json("Error al obtener las publicaciones: " + error);
  }
};


export const uploadImg = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const imageFile = req.file;
      const image = new ImageModel({
        image: imageFile.buffer,
        name: imageFile.originalname
      });
      await image.save();
      res.status(200).json({ message: 'Imagen guardada exitosamente' });
    } else { 
      throw new Error('No se encontró ninguna imagen en la solicitud');
    }
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
    res.status(500).json({ imagen: req.file });
  }
};


export const getImageById = async (req: Request, res: Response) => {
  try {
    const image = await ImageModel.findById(req.query.id);

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline',
    });

    res.send(image.image);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la imagen' });
  }
};


async function imageSave(img:any){
  const imageFile = img;
      const image = new ImageModel({
        image: imageFile.buffer,
        name: imageFile.originalname
      });
  const imgId = (await image.save())._id;
  return imgId;
}


