import mongoose, { Schema, Document } from "mongoose";

export interface Step {
  idPublication: String;
  body: String;
  image: string;
}

export interface StepsDocument extends Step, Document {}

const StepsSchema = new Schema<Step>({
  idPublication: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
});

const Steps = mongoose.model<StepsDocument>("steps", StepsSchema);

export default Steps;
