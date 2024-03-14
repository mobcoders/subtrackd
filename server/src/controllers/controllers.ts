import { Request, Response } from 'express';
import { ISubscription, Subscription } from '../models/subscription';
import { INotification, Notification } from '../models/notification';

async function getSubs(req: Request, res: Response): Promise<void> {
  try {
    const user = req.params.userid;
    const subscriptions = await Subscription.find({userid:user});
    res.send(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).send('An error occurred while fetching the subscriptions.');
  }
}

async function addSub(req: Request, res: Response): Promise<void> {
  try {
    const subscription = new Subscription(req.body);
    const user = req.params.userid;
    subscription.userid = user
    await subscription.save();
    res.send(await Subscription.find({userid:user}));
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(500).send('An error occurred while adding the subscription.');
  }
}

async function editSub(req: Request, res: Response): Promise<void> {
  const { id,userid } = req.params;
  console.log(`Updating subscription with ID: ${id}`); // Debugging log
  try {
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!subscription) {
      res.status(404).send('Subscription not found');
    } else {
      res.send(await Subscription.find({userid:userid}));
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).send('Error updating subscription');
  }
}

async function deleteSub(req: Request, res: Response): Promise<void> {
  const { id, userid } = req.params;

  try {
    const deletedSubscription = await Subscription.findByIdAndDelete({_id:id});
    if (!deletedSubscription) {
      res.status(404).send('Subscription not found');
    } else {
      // const remainingSubscriptions = await Subscription.find({});
      res.send(await Subscription.find({userid:userid}));
    }
  } catch (error) {
    res.status(500).send('Error deleting subscription');
  }
}

async function getNotification(req: Request, res: Response): Promise<void> {
  try {
    const user = req.params.userid;
    const notifications: INotification[] = await Notification.find({
      read: false, userid: user,
    }).sort({
      date: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).send('Error fetching notifications.');
  }
}

export { getSubs, addSub, editSub, deleteSub, getNotification };
