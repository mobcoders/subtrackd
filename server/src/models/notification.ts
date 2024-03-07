import {Schema, model} from 'mongoose';

export interface INotification  {
  message: string;
  date: Date;
  read: boolean;
}

const notificationSchema = new Schema<INotification>({
  message: {type: String, required: true},
  date: { type: Date, default: Date.now, required: true },
  read: { type: Boolean, default: false, required: true },
});

export const Notification = model<INotification>('Notification', notificationSchema);

