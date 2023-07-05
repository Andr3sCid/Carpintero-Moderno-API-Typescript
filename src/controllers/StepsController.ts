import { Request, Response } from "express";
import Step from "../models/Step";
import ImageModel from "../models/ImageModel";
import Publication from "../models/Publication";

export const createSteps = async (req: Request, res: Response): Promise<Response> => {
    try {
      const imgId = req.file ? await imageSave(req.file) : '';
      const newStep = new Step(req.body);
      newStep.image = `${req.hostname}:${req.socket.localPort}/img/get/?id=${imgId}`;
      const publication = await Publication.findById(newStep.idPublication);
      if (publication) {
        await publication.updateOne({ $push: { steps: newStep } });
        return res.status(200).json({ msg: 'Publicación actualizada' });
      }
      return res.status(404).json({ error: 'Publicación no encontrada' });
    } catch (error) {
      return res.status(500).json({ error: `Error al guardar el paso: ${error}` });
    }
  };
  
  
  

export const getSteps = async (req: Request, res: Response) => {
    try {
        const steps = await Step.find({ idPublication: req.query.id });
        return res.status(200).json(steps);
    } catch (error) {
        return res.status(500).json("Error al obtener los pasos: " + error);
    }
}

async function imageSave(img: any) {
  const imageFile = img;
  const image = new ImageModel({
    image: imageFile.buffer,
    name: imageFile.originalname,
  });
  const imgId = (await image.save())._id;
  return imgId;
}
