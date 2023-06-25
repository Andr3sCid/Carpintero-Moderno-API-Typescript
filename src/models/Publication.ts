import { Schema, model, Document, Types } from 'mongoose';

interface Publication extends Document {
  name: string;
  valoration: number;
  materials: string[];
  tools: string[];
  difficulty: string;
  imgPreviewed: string;
  description: string;
  steps: any;
  creator: Types.ObjectId;
  createdAt: Date;
}

const publicationSchema = new Schema<Publication>({
  name: { type: String, required: true },
  valoration: { type: Number, default: 0 },
  materials: [{ type: String }],
  tools: [{ type: String }],
  difficulty: { type: String },
  imgPreviewed: { type: String },
  description: { type: String },
  steps: { type: Schema.Types.Mixed },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PublicationModel = model<Publication>('Publication', publicationSchema);
