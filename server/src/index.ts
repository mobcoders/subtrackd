import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './router';
import { job,checkSubscriptionsAndNotify } from './scheduledTasks/subscriptionChecker';
const app = express();

// Middleware set-up:
app.use(cors());
app.use(express.json());
app.use('/', router);

//MongoDB connection:
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.error('Could not connect to MongoDB...', err));

console.log('Checking subscriptions and notifying...');
//check for notification on server start
checkSubscriptionsAndNotify();

// Cron job start:
job.start();

// Server listening:
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
