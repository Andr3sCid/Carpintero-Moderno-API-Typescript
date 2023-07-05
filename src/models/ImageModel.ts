import mongoose, { Schema, Document } from 'mongoose';

export interface Image {
  image: Buffer;
  name: string;
}

export interface ImageDocument extends Image, Document {}

const imageSchema = new Schema<Image>({
  image: { type: Buffer, required: true },
  name: { type: String, required: true },
});

const ImageModel = mongoose.model<ImageDocument>('images', imageSchema);

export default ImageModel;