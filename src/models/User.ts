import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from "bcrypt";
export interface IUser extends Document {
  userName: string;
  name: string;
  password: string;
  numFollowers: number;
  valorationProm: number;
  notifications: Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  numFollowers: { type: Number, default: 0 },
  valorationProm: { type: Number, default: 0 },
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});

userSchema.pre('save',async function(next){
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password,this.password);
}

export default model<IUser>("User", userSchema);