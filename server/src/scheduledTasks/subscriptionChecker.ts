import { CronJob } from 'cron';
import { differenceInCalendarDays } from 'date-fns';
import {Subscription} from '../models/subscription'; 
import { addNotification } from '../utils/notificationUtils'; 

export const checkSubscriptionsAndNotify = async () => {
  const subscriptions = await Subscription.find(); 
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  subscriptions.forEach(async (subscription) => {
        const billingDate = new Date(subscription.billingDate);

        if (differenceInCalendarDays(billingDate, tomorrow) === 0) {
            const message: string = `Your subscription for ${subscription.name} is due tomorrow.`;
            await addNotification(message); 
        }
    });
};

// run every day at 7 AM 
export const job = new CronJob('50 2 * * *', () => {
    console.log('Checking subscriptions and notifying...');
    checkSubscriptionsAndNotify();
}, null, true, 'Europe/Berlin');



console.log('Scheduled job started. It will check subscriptions daily at 7 AM Berlin time.');


