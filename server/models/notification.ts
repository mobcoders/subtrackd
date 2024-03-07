import mongoose, {Schema, Document} from 'mongoose';

interface Inotification extends Document {
  message: string;
  date: Date;
  read: Boolean;
}

const notificationSchema: Schema = new mongoose.Schema({
  message: {type: String, required: true},
  date: { type: Date, default: Date.now, required: true },
  read: { type: Boolean, default: false, required: true },
});

const Notification = mongoose.model<Inotification>('Notification', notificationSchema);

module.exports = Notification;
