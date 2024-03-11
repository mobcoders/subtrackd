import { Request, Response } from 'express';
import { ISubscription, Subscription } from '../models/subscription';
import { INotification, Notification } from '../models/notification';

async function getSubs(req: Request, res: Response): Promise<void> {
  try {
    const subscriptions = await Subscription.find({});
    res.send(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).send('An error occurred while fetching the subscriptions.');
  }
}

async function addSub(req: Request, res: Response): Promise<void> {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.send(subscription);
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(500).send('An error occurred while adding the subscription.');
  }
}

async function editSub(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  console.log(`Updating subscription with ID: ${id}`); // Debugging log
  try {
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!subscription) {
      res.status(404).send('Subscription not found');
    } else {
      res.send(subscription);
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).send('Error updating subscription');
  }
}

async function deleteSub(req: Request, res: Response): Promise<void> {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSubscription) {
      res.status(404).send('Subscription not found');
    } else {
      res.send(deletedSubscription);
    }
  } catch (error) {
    res.status(500).send('Error deleting subscription');
  }
}

async function getNotification(req: Request, res: Response): Promise<void> {
  try {
    const notifications: INotification[] = await Notification.find({
      read: false,
    }).sort({
      date: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).send('Error fetching notifications.');
  }
}

export { getSubs, addSub, editSub, deleteSub, getNotification };
