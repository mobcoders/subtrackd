import {ISubscription, Subscription} from "../models/subscription";
import {Notification} from '../models/notification';
import {Request, Response} from "express";



const getSubs = async (req: Request, res: Response): Promise<void> =>{
 try {
  const subscriptions: ISubscription[] = await Subscription.find();
  res.send(subscriptions);
 } catch (error) {
  res.status(500).send("An error occurred while fetching the subscriptions.");
  console.error("Error fetching subscriptions:", error);
 }

}

const addSub = async (req: Request, res: Response): Promise<void> => {
 try {
  const subscription = new Subscription(req.body);
  await subscription.save();
  res.send(subscription);
  
 } catch (error) {
  res.status(500).send("An error occurred while adding the subscription.");
  console.error("Error adding subscription:", error);
 }
}

const editSub = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log(`Updating subscription with ID: ${id}`); // Debugging log
  try {
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
    if (!subscription) {
      res.status(404).send('Subscription not found');
    } else {
      res.send(subscription);
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).send('Error updating subscription');
  }
};

const deleteSub = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) {
      res.status(404).send('Subscription not found');
    } else {
      res.send(deletedSubscription);
    }
  } catch (error) {
    res.status(500).send('Error deleting subscription');
  }
};

const getNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find({ read: false }).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).send("Error fetching notifications.");
  }
};

export default {
  getSubs,
  addSub,
  editSub,
  deleteSub,
  getNotification
}