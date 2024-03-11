import { Subscription } from '../models/subscription';
import { differenceInCalendarDays } from 'date-fns';
import { addNotification } from '../utils/notificationUtils';
import { CronJob } from 'cron';

async function checkSubscriptionsAndNotify() {
  const subscriptions = await Subscription.find();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  subscriptions.forEach(async (subscription) => {
    const billingDate = new Date(subscription.billingDate);

    if (differenceInCalendarDays(billingDate, tomorrow) === 0) {
      const message: string = `Your subscription for ${subscription.name} is due tomorrow.`;
      await addNotification(message);
    }
  });
}

// Run job every day at 07:00:
const job = new CronJob(
  '50 2 * * *',
  () => {
    console.log('Checking subscriptions and notifying...');
    checkSubscriptionsAndNotify();
  },
  null,
  true,
  'Europe/Berlin'
);

console.log(
  'Scheduled job started. It will check subscriptions daily at 07:00 CET.'
);

export { checkSubscriptionsAndNotify, job };
