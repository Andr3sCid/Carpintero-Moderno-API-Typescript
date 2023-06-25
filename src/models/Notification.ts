import { Schema, model, Document, Types } from 'mongoose';

interface Notification extends Document {
  viewedStatus: boolean;
  userOrigin: Types.ObjectId;
  userDest: Types.ObjectId;
  content: string;
}

const notificationSchema = new Schema<Notification>({
  viewedStatus: { type: Boolean, default: false },
  userOrigin: { type: Schema.Types.ObjectId, ref: 'User' },
  userDest: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
});

export const NotificationModel = model<Notification>('Notification', notificationSchema);
