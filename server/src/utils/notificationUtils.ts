import { Notification } from '../models/notification';

async function addNotification(message: string, userid:string) {
  try {
    const notification = new Notification({ message, userid });
    await notification.save();
  } catch (error) {
    console.error('Failed to add notification:', error);
  }
}

export { addNotification };
