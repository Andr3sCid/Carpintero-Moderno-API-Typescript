import {Document, model, Schema, Types} from 'mongoose';
import bcrypt from "bcrypt";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  followers: number;
  valorationProm: number;
  notifications: Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  followers: { type: Number, default: 0 },
  valorationProm: { type: Number, default: 0 },
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
});

userSchema.pre('save',async function(next){
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password,this.password);
}

export default model<IUser>("User", userSchema);