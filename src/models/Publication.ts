import { Schema, model, Document, Types } from 'mongoose';

interface IPublication extends Document {
  title: string;
  rating: number;
  materials: string[];
  tools: string[];
  difficulty: number;
  previewImage: string;
  description: string;
  steps: any;
  creator: Types.ObjectId;
  createdAt: Date;
}

const publicationSchema = new Schema<IPublication>({
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
  materials: [{ type: String }],
  tools: [{ type: String }],
  difficulty: { type: Number },
  previewImage: { type: String },
  description: { type: String },
  steps: { type: Schema.Types.Mixed },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IPublication>('Publication', publicationSchema);
