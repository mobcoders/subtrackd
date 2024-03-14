import mongoose, { Schema } from 'mongoose';

interface ISubscription {
  userid: string;
  name: string;
  cost: number;
  billingDate: string;
  active: boolean;
  monthly: boolean;
}

const subscriptionSchema = new Schema<ISubscription>({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  billingDate: { type: String, required: true },
  active: { type: Boolean, required: true },
  monthly: { type: Boolean, required: true },
});

const Subscription = mongoose.model<ISubscription>(
  'Subscription',
  subscriptionSchema
);

export { ISubscription, Subscription };
